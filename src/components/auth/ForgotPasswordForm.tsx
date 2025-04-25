"use client";
import FormProvider from "../../components/hook-form/FormProvider";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import RHFTextField from "../../components/hook-form/RHFTextField";
import Link from "next/link";
import * as yup from "yup";
import { useState } from "react";
import SuccessModal from "../modals/SuccessSendEmail";

const ForgotPasswordForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const methods = useForm({
    resolver: yupResolver(
      yup.object().shape({
        email: yup
          .string()
          .required("Email is required")
          .email("Email must be a valid email address"),
      })
    ),
    defaultValues: {
      email: "",
    },
  });

  const { reset, handleSubmit,formState:{ isSubmitting } } = methods;
  const onSubmit = async (data: { email: string }) => {
    try {
      const response = await fetch(`/api/Auth/forget-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw Error(error.errors[1]);
      }
      console.log(response.json())
      setIsOpen(true);
      reset();
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
          name="email"
          label="Email"
          type="email"
          placeholder="johen@gmail.com"
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
              "Send"
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
      <SuccessModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </FormProvider>
  );
};

export default ForgotPasswordForm;
