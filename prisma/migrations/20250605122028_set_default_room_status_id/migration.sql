-- DropForeignKey
ALTER TABLE "Room" DROP CONSTRAINT "Room_roomStatusId_fkey";

-- AlterTable
ALTER TABLE "Room" ALTER COLUMN "roomStatusId" DROP NOT NULL,
ALTER COLUMN "roomStatusId" SET DEFAULT 1;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_roomStatusId_fkey" FOREIGN KEY ("roomStatusId") REFERENCES "RoomStatus"("roomStatusId") ON DELETE SET NULL ON UPDATE CASCADE;
