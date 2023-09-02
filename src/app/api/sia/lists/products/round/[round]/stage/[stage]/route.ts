import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../../../../../utils/prisma";

export async function GET(
  _request: NextRequest,
  { params }: { params: { round: string, stage: string } }
) {
  const round = parseInt(params?.round) || 0
  const stage = parseInt(params?.stage) || 0

  if (round > 0 && stage > 0) {
    const auctionProducts = await prisma.auctionProduct.findMany({
      where: {
        auctionRoundId: round,
        auctionStageId: stage
      }
    })


    return NextResponse.json({
      data: {
        auctionProducts
      }
    })
  }

  return NextResponse.json({
    data: {
      auctionProducts: []
    }
  })
}
