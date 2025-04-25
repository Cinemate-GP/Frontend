"use client";
import { useEffect, useState } from "react";
import FormProvider from "../../components/hook-form/FormProvider";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import RHFTextField from "../../components/hook-form/RHFTextField";
import Link from "next/link";
import * as yup from "yup";
import { useRouter } from "next/navigation";

const ResetPasswordForm = () => {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [code, setCode] = useState<string | null>(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      setEmail(urlParams.get("email"));
      setCode(urlParams.get("code"));
    }
  }, [router]);

  const methods = useForm({
    resolver: yupResolver(
      yup.object().shape({
        newPassword: yup
          .string()
          .required("Password is required")
          .min(6, "Password must be at least 6 characters long"),
      })
    ),
    defaultValues: { newPassword: "" },
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: { newPassword: string }) => {
    const formData = { ...data, email, code };
    try {
      const response = await fetch(`/api/Auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        console.log(response);
        throw Error("Error resetting password");
      }
      router.push("/auth/login");
    } catch (error) {
      reset();
      setServerError(
        error instanceof Error ? error.message : "An error occurred"
      );
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <div>
        {serverError && (
          <p className="text-red-500 me-auto text-center">{serverError}</p>
        )}
      </div>
      <div className="flex flex-col gap-6 w-full">
        <RHFTextField
          name="newPassword"
          label="New Password"
          type="password"
          placeholder="**********"
        />
        <div className="flex gap-6 items-center justify-center">
          <button
            type="submit"
            className="bg-[linear-gradient(90deg,#ff0000,#800000)] hover:scale-105 transition-all duration-150 rounded-full px-12 py-2 sm:text-sm"
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin h-5 w-5 mr-2 border-t-2 border-white rounded-full"
                  viewBox="0 0 24 24"
                ></svg>
                <span>Loading...</span>
              </span>
            ) : (
              "Reset Password"
            )}
          </button>
          <Link
            href={"/"}
            className="bg-transparent rounded-full px-12 py-2 sm:text-sm border border-white hover:scale-105 transition-all duration-150"
          >
            Cancel
          </Link>
        </div>
      </div>
    </FormProvider>
  );
};

export default ResetPasswordForm;
