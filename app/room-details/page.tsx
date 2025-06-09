"use client";

import React from "react";

import { getRooms } from "../../services/room";

const RoomDetails = () => {
  const handleGetRooms = async () => {
    const data = await getRooms();
    console.log("Rooms data:", data);
  };

  return (
    <>
      <div>RoomDetails</div>
      <button onClick={handleGetRooms}>Get Rooms</button>
    </>
  );
};

export default RoomDetails;
