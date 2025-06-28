"use client";

import React from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";

import { getRoomByRoomNumber } from "../../../services/room";

const RoomDetailsByRoomNumber = () => {
  let { roomNumber } = useParams();
  console.log("Room number from params:", roomNumber);

  if (!roomNumber) {
    return <div>No room number provided in params</div>;
  } else {
    roomNumber = roomNumber.toString();
  }

  const handleGetRoomDetails = async (roomNumber: string) => {
    try {
      const data = await getRoomByRoomNumber(roomNumber);
      console.log("Room details data:", data);
    } catch (error) {
      console.error("Error getting room details:", error);
    }
  };

  return (
    <>
      <div>RoomDetailsByRoomNumber</div>
      <Button onClick={() => handleGetRoomDetails(roomNumber)}>
        get room details
      </Button>
    </>
  );
};

export default RoomDetailsByRoomNumber;
