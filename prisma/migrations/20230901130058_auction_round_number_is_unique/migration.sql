/*
  Warnings:

  - A unique constraint covering the columns `[roundNumber]` on the table `AuctionRound` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "AuctionRound_roundNumber_key" ON "AuctionRound"("roundNumber");
