/*
  Warnings:

  - A unique constraint covering the columns `[stageId]` on the table `AuctionStage` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "AuctionStage_stageId_key" ON "AuctionStage"("stageId");
