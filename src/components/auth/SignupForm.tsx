"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
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
  jop: string;
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
  jop: "other",
  birthDay: new Date(2000, 0, 1),
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
    watch,
    formState: { isSubmitting },
  } = methods;

  // Auto-dismiss error after 5 seconds
  useEffect(() => {
    if (!serverError) return;
    const timer = setTimeout(() => setServerError(null), 5000);
    return () => clearTimeout(timer);
  }, [serverError]);

  // Clear error when user starts editing any field
  useEffect(() => {
    const subscription = watch(() => {
      if (serverError) setServerError(null);
    });
    return () => subscription.unsubscribe();
  }, [watch, serverError]);

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
      transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
    }),
  };

  return (
    <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
      <motion.div
        className="space-y-3"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      >
        <motion.div className="text-center mb-3" variants={fadeInUp} custom={0}>
          <h1 className="text-xl font-bold bg-clip-text text-textMuted">
            Create Account
          </h1>
        </motion.div>

        <AnimatePresence>
          {serverError && (
            <motion.div
              key="server-error"
              className="bg-red-500/10 rounded-lg p-3 border border-red-500/20 flex items-start gap-2"
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1, x: [0, -6, 6, -4, 4, 0] }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ duration: 0.35 }}
            >
              <p className="text-red-500 text-sm font-medium flex-1 text-center">
                {serverError}
              </p>
              <button
                type="button"
                onClick={() => setServerError(null)}
                className="text-red-400 hover:text-red-300 transition-colors shrink-0 mt-0.5"
                aria-label="Dismiss error"
              >
                <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-2.5">
          <motion.div variants={fadeInUp} custom={1}>
            <RHFTextField name="fullName" type="text" placeholder="Full name" />
          </motion.div>

          <motion.div variants={fadeInUp} custom={2}>
            <RHFTextField name="email" type="email" placeholder="Email" />
          </motion.div>

          <motion.div variants={fadeInUp} custom={2}>
            <RHFTextField name="userName" type="text" placeholder="Username" />
          </motion.div>

          <motion.div variants={fadeInUp} custom={3}>
            <RHFTextField name="password" type="password" placeholder="Password" />
          </motion.div>

          <motion.div variants={fadeInUp} custom={3}>
            <RHFSelectField name="job" options={occupations} />
          </motion.div>

          <motion.div
            variants={fadeInUp}
            custom={4}
            className="grid grid-cols-1 sm:grid-cols-2 gap-2.5"
          >
            <RHFSelectField
              name="gender"
              options={[{ id: "Male", label: "Male" }, { id: "Female", label: "Female" }]}
            />
            <RHFDatePicker control={methods.control} name="birthDay" />
          </motion.div>

          <motion.div variants={fadeInUp} custom={5}>
            <button
              type="submit"
              className="w-full relative group overflow-hidden bg-primary
                        transition-all duration-300 rounded-lg px-6 py-3 font-medium mt-1
                        text-white focus:ring-2 focus:ring-primary/50 focus:outline-none
                        disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              <span className="relative z-10 flex items-center justify-center">
                {isSubmitting ? (
                  <span className="flex items-center justify-center space-x-2">
                    <svg className="animate-spin h-5 w-5 border-2 border-t-transparent border-white rounded-full" viewBox="0 0 24 24" />
                    <span>Creating account...</span>
                  </span>
                ) : (
                  "Create Account"
                )}
              </span>
              <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </motion.div>

          <motion.p
            variants={fadeInUp}
            custom={6}
            className="text-center text-[16px] text-gray-400"
          >
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-transparent bg-clip-text bg-primary font-medium transition-all duration-300"
            >
              Sign in
            </Link>
          </motion.p>

          <motion.div variants={fadeInUp} custom={7}>
            <div className="relative flex items-center my-2">
              <div className="flex-grow border-t border-border" />
              <span className="mx-3 text-xs text-gray-500 uppercase tracking-wider">or</span>
              <div className="flex-grow border-t border-border" />
            </div>
            <Link
              href="/home"
              className="w-full inline-flex items-center justify-center px-6 py-2.5 rounded-lg border border-border
                text-textMuted hover:text-foreground hover:bg-hoverBg font-medium transition-colors text-sm"
            >
              Continue as guest
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </FormProvider>
  );
};

export default SignupForm;
