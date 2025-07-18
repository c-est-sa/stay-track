"use client";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { staffColumns, StaffTableType } from "@/components/table/staffColumns";
import { StaffDataTable } from "@/components/table/staffDataTable";
import { Button } from "@/components/ui/button";
import { getAllUsers } from "@/services/auth";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const StaffList = () => {
  const [staffData, setStaffData] = useState<StaffTableType[]>([]);

  useEffect(() => {
    const fetchAllStaff = async () => {
      try {
        const data = await getAllUsers();

        console.log("Fetched staff data:", data);

        if (!data) {
          console.error("Error fetching staff data");
          window.alert(
            "An error occurred while fetching staff data. Please try again."
          );
          return;
        }

        if (data.length === 0) {
          console.warn("No reservations found.");
          setStaffData(data);
          return;
        }

        setStaffData(data);
      } catch (error) {
        console.error("Error fetching staff data:", error);
        window.alert(
          "An error occurred while fetching staff data. Please try again."
        );
      }
    };

    fetchAllStaff();
  }, []);

  return (
    <ProtectedRoute>
      <div>
        <h1 className="text-2xl font-bold mb-4">Staff List</h1>
        <StaffDataTable columns={staffColumns} data={staffData} />

        <Link href={"/admin/create-account"}>
          <Button className="mt-4">Create</Button>
        </Link>
      </div>
    </ProtectedRoute>
  );
};

export default StaffList;
