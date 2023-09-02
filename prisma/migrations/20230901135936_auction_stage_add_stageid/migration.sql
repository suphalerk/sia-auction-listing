/*
  Warnings:

  - Added the required column `stageId` to the `AuctionStage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AuctionStage" ADD COLUMN     "stageId" INTEGER NOT NULL;
