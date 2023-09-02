import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../utils/prisma";

interface SiaListResponse {
  status: "success" | "failed";
  results: string;
  message?: string
}

export const GET = async (request: NextRequest) => {
  const round = request.nextUrl.searchParams.get("round");
  const json_response: SiaListResponse = {
    status: "failed",
    results: "url not found",
  };
  if (round) {

    const API = `https://home.sia.co.th/get_product/${round}`;

    try {
      const listing = await axios.get(API);
      const data = listing?.data

      if (data) {
        await ProcessData(data)
        json_response.status = "success";
        json_response.results = "api success";
      } else {
        json_response.status = "failed";
        json_response.results = "api no data";
      }
    } catch (error: any) {
      json_response.status = "failed";
      json_response.results = "api error";
      json_response.message = error?.message?.toString();
    }
  }

  return NextResponse.json(json_response);
}


type AuctionRound = {
  id: number;
  roundNumber: number;
  auctionDate: Date;
  auctionUpdateAt: Date | null;
  createdAt: Date;
} | null

type AuctionStage = {
  id: number;
  auctionRoundId: number;
  stageId: number;
  stageNumber: number;
  stageLocation: string | null;
  stageType: string | null;
  depositAmount: number | null;
  tagPerUser: number | null;
  eventType: string | null;
  invoiceType: string | null;
  status: string | null;
  createdAt: Date;
}

const ProcessData = async (data: any) => {
  const roundNumber = data?.auction_no
  let auctionRound: AuctionRound = await prisma.auctionRound.findUnique({ where: { roundNumber: roundNumber } })

  if (!auctionRound) {
    auctionRound = await prisma.auctionRound.create({
      data: {
        roundNumber: roundNumber,
        auctionDate: GetISODate(data?.auction_date),
        auctionUpdateAt: GetISODate(data?.update_time),
      },
    })
  }

  if (auctionRound) {
    const stageList = data?.stageList
    const stage: AuctionStage[] = stageList?.map(async (stage: any) => {
      const stageId = parseInt(stage?.id)
      const stageData: AuctionStage = await prisma.auctionStage.upsert({
        where: { stageId: stageId },
        update: {},
        create: {
          auctionRoundId: auctionRound!.id,
          stageId: stageId,
          stageNumber: parseInt(stage?.stage_no),
          stageLocation: stage?.stage_location,
          stageType: stage?.stage_type,
          depositAmount: stage?.deposit_amount,
          tagPerUser: stage?.tag_per_user,
          eventType: stage?.event_type,
          invoiceType: stage?.invoice_type,
          status: stage?.status
        }
      })

      if (stageData)
        await ProcessProductData(data, stageData, auctionRound)

      return stageData
    })
  }
}

const ProcessProductData = async (data: any, stage: AuctionStage, auctionRound: AuctionRound) => {
  const productList = data?.data

  const stageNumber = stage?.stageNumber
  const lists = productList[stageNumber]
  lists.forEach(async (product: any) => {
    const productId = parseInt(product?.NO)
    await prisma.auctionProduct.upsert({
      where: {
        auctionRoundId_productId: {
          auctionRoundId: auctionRound!.id,
          productId: productId
        }
      },
      update: {
        productStatus: product?.STATUS
      },
      create: {
        auctionStageId: stage.id,
        auctionRoundId: auctionRound!.id,
        productId: productId,
        productNo: product?.PRODUCT_NO,
        chassisNo: product?.PRODUCT_NO_CHASSIS,
        engineNo: product?.PRODUCT_NO_ENGINE,
        name: product?.PRODUCT_NAME,
        brand: product?.PRODUCT_BRAND,
        generation: product?.PRODUCT_GENERATION,
        gear: product?.PRODUCT_GEAR,
        year: product?.PRODUCT_YEAR,
        color: product?.PRODUCT_COLOR,
        engineCapacity: product?.PRODUCT_CC,
        mileage: product?.PRODUCT_MILEAGE,
        vehicleType: product?.PRODUCT_CATEGORY,
        subVehicleType: product?.PRODUCT_CATEGORY_SUB,
        note: product?.PRODUCT_NOTE,
        productStatus: product?.STATUS,
        priceStart: product?.PRICE_START,
        priceService: product?.PRICE_SERVICE,
        priceTransport: product?.PRICE_TRANSPORT,
        licensePlate: product?.PRODUCT_REGISTRATION,
        licensePlateProvince: product?.PRODUCT_PROVINCE,
        licensePlateExpireDate: product?.PRODUCT_DATE_TAX,
        productImageCode: product?.NF_PRODUCT_PICTURE,
        productImageServer: product?.PICTURE_SERVER,
        grade: product?.PRODUCT_GRADE,
        nfLotId: product?.NF_LOT_ID,
        caregId: product?.PRODUCT_CAREG_ID,
      }
    });
  })

  return productList
}

const GetISODate = (stringDate: string) => {
  const isoDateTime = new Date(stringDate).toISOString();
  return isoDateTime
}
