"use client";

import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useParams } from "next/navigation";

import UserDetailsForm, {
  UserDetailsFormSchema,
} from "@/components/auth/UserDetailsForm";
import { getUserById, updateUser } from "@/services/auth";

const StaffDetails = () => {
  const { userId } = useParams();

  const form = useForm<z.infer<typeof UserDetailsFormSchema>>({
    resolver: zodResolver(UserDetailsFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      roleId: 1,
    },
  });

  useEffect(() => {
    if (!userId) {
      console.error("No user ID provided in the URL.");
      return;
    }

    const fetchUserDetails = async () => {
      try {
        const data = await getUserById(userId.toString());

        if (!data) {
          console.error("Error fetching user details");
          window.alert(
            "An error occurred while fetching user details. Please reload the page."
          );
          return;
        }

        form.reset({
          username: data.username || "",
          email: data.email || "",
          roleId: data.roleId || 1,
        });
      } catch (error) {
        console.error("Error fetching user details:", error);
        window.alert(
          "An error occurred while fetching user details. Please reload the page."
        );
      }
    };

    fetchUserDetails();
  }, [form, userId]);

  if (!userId) {
    return (
      <h1 className="text-2xl font-bold mb-4">
        Staff Details: no user ID provided
      </h1>
    );
  }

  const onSubmit = async (values: z.infer<typeof UserDetailsFormSchema>) => {
    try {
      const data = await updateUser(userId.toString(), values);

      if (!data) {
        console.error("Error during form submission");
        window.alert(
          "An error occurred while submitting the form. Please try again."
        );
        return;
      }

      console.log("User updated successfully:", data);
      window.alert("User updated successfully.");
    } catch (error) {
      console.error("Error during form submission:", error);
      window.alert(
        "An error occurred while submitting the form. Please try again."
      );
      return;
    }
    console.log(values);
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Staff Details</h1>
      <UserDetailsForm form={form} onSubmit={onSubmit} />
    </>
  );
};

export default StaffDetails;
