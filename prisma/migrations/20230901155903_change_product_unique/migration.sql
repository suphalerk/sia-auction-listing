/*
  Warnings:

  - A unique constraint covering the columns `[auctionRoundId,productId]` on the table `AuctionProduct` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `auctionRoundId` to the `AuctionProduct` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "AuctionProduct_productId_key";

-- AlterTable
ALTER TABLE "AuctionProduct" ADD COLUMN     "auctionRoundId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "AuctionProduct_auctionRoundId_productId_key" ON "AuctionProduct"("auctionRoundId", "productId");

-- AddForeignKey
ALTER TABLE "AuctionProduct" ADD CONSTRAINT "AuctionProduct_auctionRoundId_fkey" FOREIGN KEY ("auctionRoundId") REFERENCES "AuctionRound"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
