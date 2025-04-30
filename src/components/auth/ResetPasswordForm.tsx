"use client";
import { useEffect, useState } from "react";
import FormProvider from "../hook-form/FormProvider";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import RHFTextField from "../hook-form/RHFTextField";
import Link from "next/link";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import SuccessModal from "../modals/SuccessSendEmail";

const ResetPasswordForm = () => {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [code, setCode] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      setEmail(urlParams.get("email"));
      setCode(urlParams.get("code"));
    }
  }, []);

  const methods = useForm({
    resolver: yupResolver(
      yup.object().shape({
        newPassword: yup
          .string()
          .required("Password is required")
          .min(8, "Password must be at least 8 characters long")
          .test('password-strength', 
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
            (value) => {
              if (!value) return false;
              // Check for uppercase letters
              const hasUppercase = /[A-Z]/.test(value);
              // Check for lowercase letters
              const hasLowercase = /[a-z]/.test(value);
              // Check for numbers
              const hasNumber = /[0-9]/.test(value);
              // Check for special characters (wider range)
              const hasSpecial = /[!@#$%^&*()_\-+=[\]{};:'"\\|,.<>/?]/.test(value);
              
              return hasUppercase && hasLowercase && hasNumber && hasSpecial;
            }
          ),
        confirmPassword: yup
          .string()
          .required("Please confirm your password")
          .oneOf([yup.ref("newPassword")], "Passwords must match"),
      })
    ),
    defaultValues: { 
      newPassword: "",
      confirmPassword: ""
    },
    mode: "onChange",
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: { newPassword: string; confirmPassword: string }) => {
    const formData = { newPassword: data.newPassword, email, code };
    try {
      const response = await fetch(`/api/Auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw Error(error.errors?.[1] || "Error resetting password");
      }
      
      setIsSuccess(true);
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (error) {
      reset();
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
        ease: "easeOut"
      }
    })
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <motion.div 
        className="space-y-4"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
      >
        <motion.div 
          className="text-center"
          variants={fadeInUp}
          custom={0}
        >
          <motion.div 
            className="mx-auto w-14 h-14 mb-3 relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
          >
            <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl"></div>
            <div className="relative h-full w-full flex items-center justify-center rounded-full border border-gray-700/50 bg-gray-900/70">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-7 w-7 text-red-500"
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                <line x1="12" y1="15" x2="12" y2="17"></line>
              </svg>
            </div>
          </motion.div>
          
          <h1 className="text-xl font-bold mb-0.5 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-100 to-gray-300">
            Reset Password
          </h1>
          <p className="text-gray-400 text-xs max-w-xs mx-auto">
            Please enter a new secure password for your account
          </p>
        </motion.div>
        
        {serverError && (
          <motion.div 
            className="bg-red-500/10 backdrop-blur-sm rounded-lg p-2 border border-red-500/20"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-red-500 text-xs font-medium text-center">
              {serverError}
            </p>
          </motion.div>
        )}

        {(!email || !code) && (
          <motion.div 
            className="bg-amber-500/10 backdrop-blur-sm rounded-lg p-2 border border-amber-500/20"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-amber-500 text-xs font-medium text-center">
              Invalid or expired password reset link. Please request a new one.
            </p>
          </motion.div>
        )}
        
        <motion.div 
          className="space-y-4"
          variants={fadeInUp} 
          custom={1}
        >
          <div className="relative">
            <RHFTextField
              name="newPassword"
              label="New Password"
              type="password"
              placeholder="Enter your new password"
              disabled={!email || !code}
            />
          </div>
          
          <div className="relative">
            <RHFTextField
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              placeholder="Confirm your new password"
              disabled={!email || !code}
            />
          </div>

          <motion.div variants={fadeInUp} custom={2}>
            <motion.button
              type="submit"
              className="w-full relative group overflow-hidden bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500
                       transition-all duration-300 rounded-lg px-6 py-2.5 text-sm font-medium 
                       focus:ring-2 focus:ring-red-500/50 focus:outline-none
                       shadow-lg shadow-red-700/20
                       disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={isSubmitting || !email || !code}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 flex items-center justify-center">
                {isSubmitting ? (
                  <span className="flex items-center justify-center space-x-2">
                    <svg className="animate-spin h-4 w-4 border-2 border-t-transparent border-white rounded-full" viewBox="0 0 24 24"></svg>
                    <span>Updating...</span>
                  </span>
                ) : (
                  "Reset Password"
                )}
              </span>
              <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.button>
          </motion.div>
          
          <motion.p 
            variants={fadeInUp} 
            custom={3}
            className="text-center text-xs text-gray-400 pt-1"
          >
            Remember your password?{" "}
            <Link href="/login" className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600 font-medium hover:from-red-500 hover:to-red-400 transition-all duration-300">
              Sign In
            </Link>
          </motion.p>
        </motion.div>
      </motion.div>
      
      <SuccessModal 
        isOpen={isSuccess} 
        onClose={() => {
          setIsSuccess(false);
          router.push("/login");
        }} 
        email={email}
        title="Password Reset Successfully!"
        message="Your password has been reset. You can now sign in with your new password."
        type="reset-password"
      />
    </FormProvider>
  );
};

export default ResetPasswordForm;
