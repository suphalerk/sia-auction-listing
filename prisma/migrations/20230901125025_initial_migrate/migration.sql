-- CreateTable
CREATE TABLE "AuctionRound" (
    "id" SERIAL NOT NULL,
    "roundNumber" INTEGER NOT NULL,
    "auctionDate" TIMESTAMP(3) NOT NULL,
    "auctionUpdateAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuctionRound_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuctionStage" (
    "id" SERIAL NOT NULL,
    "auctionRoundId" INTEGER NOT NULL,
    "stageNumber" INTEGER NOT NULL,
    "stageLocation" TEXT,
    "stageType" TEXT,
    "depositAmount" INTEGER,
    "tagPerUser" INTEGER,
    "eventType" TEXT,
    "invoiceType" TEXT,
    "status" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuctionStage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AuctionStage" ADD CONSTRAINT "AuctionStage_auctionRoundId_fkey" FOREIGN KEY ("auctionRoundId") REFERENCES "AuctionRound"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
