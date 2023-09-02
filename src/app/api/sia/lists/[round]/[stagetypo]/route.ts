import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../../utils/prisma";

interface SiaListRoundResponse {
  round: string;
}

export async function GET(
  _request: NextRequest,
  { params }: { params: { round: string, stagetypo: string } }
) {
  const round = parseInt(params?.round) || 0

  if (round > 0) {
    const auctionRound = await prisma.auctionRound.findUnique({
      where: { roundNumber: round},
      select: {
        auctionDate: true,
        auctionUpdateAt: true,
        roundNumber: true,
        AuctionStage: {
          select: {
            stageId: true,
            stageNumber: true,
            stageLocation: true,
            stageType: true,
            depositAmount: true,
            tagPerUser: true,
            eventType: true,
            invoiceType: true,
            status: true
          },
          where: {
            stageType: params?.stagetypo
          }
        }
      }
    });

    return NextResponse.json({
      data: {
        auctionRound: {
          auctionDate: auctionRound?.auctionDate,
          auctionUpdateAt: auctionRound?.auctionUpdateAt,
          auctionRoundNumber: auctionRound?.roundNumber,
          auctionStage: auctionRound?.AuctionStage
        }
      }
    })
  }

  return NextResponse.json({
    data: {
      round
    }
  })
}
