import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../utils/prisma";

export async function GET(_request: NextRequest) {
  const auctionRound = await prisma.auctionRound.findMany({
    select: {
      auctionDate: true,
      auctionUpdateAt: true,
      roundNumber: true
    },
    orderBy: {
      auctionDate: 'desc'
    }
  });

  return NextResponse.json({
    data: {
      auctionRounds: auctionRound
    }
  })
}
