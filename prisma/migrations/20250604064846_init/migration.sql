-- CreateTable
CREATE TABLE "User" (
    "userId" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordToken" TEXT NOT NULL,
    "roleId" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "UserRole" (
    "roleId" SERIAL NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "UserRole_pkey" PRIMARY KEY ("roleId")
);

-- CreateTable
CREATE TABLE "Reservation" (
    "reservationId" TEXT NOT NULL,
    "reservationName" TEXT NOT NULL,
    "checkInDate" TIMESTAMP(3) NOT NULL,
    "checkOutDate" TIMESTAMP(3) NOT NULL,
    "numberOfAdults" INTEGER NOT NULL,
    "numberOfKids" INTEGER NOT NULL,
    "reservationInfo" TEXT,
    "paymentCompletionStatus" BOOLEAN NOT NULL,
    "bookingSiteId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("reservationId")
);

-- CreateTable
CREATE TABLE "BookingSite" (
    "bookingSiteId" SERIAL NOT NULL,
    "bookingSiteName" TEXT NOT NULL,

    CONSTRAINT "BookingSite_pkey" PRIMARY KEY ("bookingSiteId")
);

-- CreateTable
CREATE TABLE "Room" (
    "roomNumber" INTEGER NOT NULL,
    "roomName" TEXT NOT NULL,
    "roomImageUrl" TEXT NOT NULL,
    "maxNumberOfPeople" INTEGER NOT NULL,
    "facilities" TEXT[],
    "roomStatusId" INTEGER NOT NULL,
    "roomInfo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("roomNumber")
);

-- CreateTable
CREATE TABLE "RoomStatus" (
    "roomStatusId" SERIAL NOT NULL,
    "roomStatus" TEXT NOT NULL,

    CONSTRAINT "RoomStatus_pkey" PRIMARY KEY ("roomStatusId")
);

-- CreateTable
CREATE TABLE "ReservationByRoom" (
    "reservationByRoomId" TEXT NOT NULL,
    "roomNumber" INTEGER NOT NULL,
    "reservationId" TEXT NOT NULL,
    "guestName" TEXT NOT NULL,
    "numberOfAdults" INTEGER NOT NULL,
    "numberOfKids" INTEGER NOT NULL,
    "guestStatusId" INTEGER NOT NULL,
    "restaurantTimeId" INTEGER,
    "restaurantTableId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReservationByRoom_pkey" PRIMARY KEY ("reservationByRoomId")
);

-- CreateTable
CREATE TABLE "GuestStatus" (
    "guestStatusId" SERIAL NOT NULL,
    "guestStatus" TEXT NOT NULL,

    CONSTRAINT "GuestStatus_pkey" PRIMARY KEY ("guestStatusId")
);

-- CreateTable
CREATE TABLE "RestaurantTime" (
    "restaurantTimeId" SERIAL NOT NULL,
    "restaurantTime" TEXT NOT NULL,

    CONSTRAINT "RestaurantTime_pkey" PRIMARY KEY ("restaurantTimeId")
);

-- CreateTable
CREATE TABLE "RestaurantTable" (
    "restaurantTableId" SERIAL NOT NULL,
    "restaurantTableName" TEXT NOT NULL,

    CONSTRAINT "RestaurantTable_pkey" PRIMARY KEY ("restaurantTableId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "UserRole"("roleId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_bookingSiteId_fkey" FOREIGN KEY ("bookingSiteId") REFERENCES "BookingSite"("bookingSiteId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_roomStatusId_fkey" FOREIGN KEY ("roomStatusId") REFERENCES "RoomStatus"("roomStatusId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReservationByRoom" ADD CONSTRAINT "ReservationByRoom_roomNumber_fkey" FOREIGN KEY ("roomNumber") REFERENCES "Room"("roomNumber") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReservationByRoom" ADD CONSTRAINT "ReservationByRoom_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "Reservation"("reservationId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReservationByRoom" ADD CONSTRAINT "ReservationByRoom_guestStatusId_fkey" FOREIGN KEY ("guestStatusId") REFERENCES "GuestStatus"("guestStatusId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReservationByRoom" ADD CONSTRAINT "ReservationByRoom_restaurantTimeId_fkey" FOREIGN KEY ("restaurantTimeId") REFERENCES "RestaurantTime"("restaurantTimeId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReservationByRoom" ADD CONSTRAINT "ReservationByRoom_restaurantTableId_fkey" FOREIGN KEY ("restaurantTableId") REFERENCES "RestaurantTable"("restaurantTableId") ON DELETE SET NULL ON UPDATE CASCADE;
