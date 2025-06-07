-- DropForeignKey
ALTER TABLE "ReservationByRoom" DROP CONSTRAINT "ReservationByRoom_guestStatusId_fkey";

-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "reservedRoomName" TEXT[];

-- AlterTable
ALTER TABLE "ReservationByRoom" ALTER COLUMN "guestStatusId" DROP NOT NULL,
ALTER COLUMN "guestStatusId" SET DEFAULT 1;

-- AddForeignKey
ALTER TABLE "ReservationByRoom" ADD CONSTRAINT "ReservationByRoom_guestStatusId_fkey" FOREIGN KEY ("guestStatusId") REFERENCES "GuestStatus"("guestStatusId") ON DELETE SET NULL ON UPDATE CASCADE;
