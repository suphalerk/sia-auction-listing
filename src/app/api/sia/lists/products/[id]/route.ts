import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../../utils/prisma";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params?.id) || 0

  if (id > 0) {
    const data = await prisma.auctionProduct.findUnique({ where: { id } })


    return NextResponse.json({
      data
    })
  }

  return NextResponse.json({
    data: {
      auctionProducts: []
    }
  })
}
