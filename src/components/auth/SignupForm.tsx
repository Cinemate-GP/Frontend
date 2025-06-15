"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import FormProvider from "../hook-form/FormProvider";
import RHFTextField from "../hook-form/RHFTextField";
import RHFSelectField from "../hook-form/RHFSelectField";
import { RegisterSchema } from "@/lib/validation";
import RHFDatePicker from "../hook-form/RHFDatePicker";
import { FormateBirthDate } from "@/lib/utils";
import { occupations } from "@/constants";

interface SignupFormData {
  fullName: string;
  email: string;
  userName: string;
  jop:string,
  password: string;
  gender: string;
  birthDay: Date;
}

const defaultValues: SignupFormData = {
  fullName: "",
  email: "",
  userName: "",
  password: "",
  gender: "Male",
  jop:'other',
  birthDay: new Date(),
};

const SignupForm = () => {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const methods = useForm<SignupFormData>({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
    mode: "onChange",
    shouldFocusError: false,
  });

  const {
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: SignupFormData) => {
    try {
      setServerError(null);
      const formattedData = {
        ...data,
        birthDay: data.birthDay ? FormateBirthDate(data.birthDay) : null,
      };
      const response = await fetch("/api/Auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw Error(
          Array.isArray(error.errors)
            ? error.errors[0]
            : error.errors?.Password || "Registration failed. Please try again."
        );
      }

      router.push(`/verify-email/${data.email}`);
    } catch (error) {
      setServerError(
        error instanceof Error ? error.message : "An error occurred"
      );
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  return (
    <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
      <motion.div
        className="space-y-6"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
      >
        <motion.div className="text-center" variants={fadeInUp} custom={0}>
          <h1 className="text-2xl font-bold mb-1 bg-clip-text text-textMuted ">
            Create Account
          </h1>
          <p className="text-gray-400 text-sm mb-12">
            Join our community today
          </p>
        </motion.div>

        {serverError && (
          <motion.div
            className="bg-red-500/10 rounded-lg p-4 border border-red-500/20"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-red-500 text-sm font-medium text-center">
              {serverError}
            </p>
          </motion.div>
        )}

        <div className="space-y-4">
          <motion.div variants={fadeInUp} custom={1}>
            <RHFTextField
              name="fullName"
              label="Full Name"
              type="text"
              placeholder="Enter your full name"
            />
          </motion.div>

          <motion.div variants={fadeInUp} custom={2}>
            <RHFTextField
              name="email"
              label="Email"
              type="email"
              placeholder="Enter your email"
            />
          </motion.div>
          <motion.div variants={fadeInUp} custom={2}>
            <RHFTextField
              name="userName"
              label="User Name"
              type="text"
              placeholder="Enter your user name"
            />
          </motion.div>

          <motion.div variants={fadeInUp} custom={3}>
            <RHFTextField
              name="password"
              label="Password"
              type="password"
              placeholder="Create a secure password"
            />
          </motion.div>
          <motion.div variants={fadeInUp} custom={3}>
            <RHFSelectField
              name="job"
              label="Job"
              options={occupations}
            />
          </motion.div>

          <motion.div
            variants={fadeInUp}
            custom={4}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <RHFSelectField
              name="gender"
              label="Gender"
              options={[{id:'Male',label:'Male'},{id:'Female',label:'Female'}]}
            />
            <RHFDatePicker
              control={methods.control}
              name="birthDay"
              label="Date of Birth"
            />
          </motion.div>

          <motion.div variants={fadeInUp} custom={5}>
            <button
              type="submit"
              className="w-full relative group overflow-hidden bg-primary hover:from-red-600 hover:to-red-500
                        transition-all duration-300 rounded-lg px-6 py-3.5 font-medium mt-2
                        text-white
                        focus:ring-2 focus:ring-primary/50 focus:outline-none
                        disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              <span className="relative z-10 flex items-center justify-center">
                {isSubmitting ? (
                  <span className="flex items-center justify-center space-x-2">
                    <svg
                      className="animate-spin h-5 w-5 border-2 border-t-transparent border-white rounded-full"
                      viewBox="0 0 24 24"
                    ></svg>
                    <span>Creating account...</span>
                  </span>
                ) : (
                  "Create Account"
                )}
              </span>
              <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </motion.div>

          <motion.p
            variants={fadeInUp}
            custom={6}
            className="text-center text-[16px] text-gray-400 pt-2"
          >
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-transparent bg-clip-text bg-primary font-medium hover:from-red-500 hover:to-red-400 transition-all duration-300"
            >
              Sign in
            </Link>
          </motion.p>
        </div>
      </motion.div>
    </FormProvider>
  );
};

export default SignupForm;
