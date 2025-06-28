// https://ui.shadcn.com/docs/components/form
"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import UserDetailsForm, {
  UserDetailsFormSchema,
} from "@/components/auth/UserDetailsForm";
import { createUser } from "@/services/auth";
import { useRouter } from "next/navigation";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

const CreateAccount = () => {
  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof UserDetailsFormSchema>>({
    resolver: zodResolver(UserDetailsFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      roleId: 1,
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof UserDetailsFormSchema>) => {
    try {
      const response = await createUser(values);

      console.log("User created successfully:", response);
      window.alert("User created successfully.");

      router.push("/admin/staff");
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
    <ProtectedRoute>
      <div>
        <h1 className="text-2xl font-bold mb-4">Create Account</h1>
        <UserDetailsForm form={form} onSubmit={onSubmit} />
      </div>
    </ProtectedRoute>
  );
};

export default CreateAccount;
