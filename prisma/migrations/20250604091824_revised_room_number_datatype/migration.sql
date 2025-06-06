/*
  Warnings:

  - The primary key for the `Room` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "ReservationByRoom" DROP CONSTRAINT "ReservationByRoom_roomNumber_fkey";

-- AlterTable
ALTER TABLE "ReservationByRoom" ALTER COLUMN "roomNumber" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Room" DROP CONSTRAINT "Room_pkey",
ALTER COLUMN "roomNumber" SET DATA TYPE TEXT,
ADD CONSTRAINT "Room_pkey" PRIMARY KEY ("roomNumber");

-- AddForeignKey
ALTER TABLE "ReservationByRoom" ADD CONSTRAINT "ReservationByRoom_roomNumber_fkey" FOREIGN KEY ("roomNumber") REFERENCES "Room"("roomNumber") ON DELETE RESTRICT ON UPDATE CASCADE;
