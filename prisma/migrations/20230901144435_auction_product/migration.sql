-- CreateTable
CREATE TABLE "AuctionProduct" (
    "id" SERIAL NOT NULL,
    "auctionStageId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "productNo" TEXT,
    "chassisNo" TEXT,
    "engineNo" TEXT,
    "name" TEXT,
    "brand" TEXT,
    "generation" TEXT,
    "gear" TEXT,
    "year" TEXT,
    "color" TEXT,
    "engineCapacity" TEXT,
    "mileage" INTEGER,
    "vehicleType" TEXT,
    "subVehicleType" TEXT,
    "note" TEXT,
    "productStatus" TEXT,
    "priceStart" INTEGER,
    "priceService" INTEGER,
    "priceTransport" INTEGER,
    "licensePlate" TEXT,
    "licensePlateExpireDate" TEXT,
    "productImageCode" TEXT,
    "productImageServer" TEXT,
    "grade" TEXT,
    "nfLotId" INTEGER,
    "caregId" INTEGER,

    CONSTRAINT "AuctionProduct_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AuctionProduct_productId_key" ON "AuctionProduct"("productId");

-- AddForeignKey
ALTER TABLE "AuctionProduct" ADD CONSTRAINT "AuctionProduct_auctionStageId_fkey" FOREIGN KEY ("auctionStageId") REFERENCES "AuctionStage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
