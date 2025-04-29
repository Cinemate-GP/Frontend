"use client";

import { useState } from "react";
import FormProvider from "../hook-form/FormProvider";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import RHFTextField from "../hook-form/RHFTextField";
import Link from "next/link";
import * as yup from "yup";
import SuccessModal from "../modals/SuccessSendEmail";
import { motion } from "framer-motion";

const ForgotPasswordForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  
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
    mode: "onChange",
  });

  const { reset, handleSubmit, formState: { isSubmitting } } = methods;
  
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
        throw Error(error.errors?.[1] || "Failed to process request");
      }
      
      setEmail(data.email);
      setIsOpen(true);
      reset();
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
        className="space-y-4" // Reduced from space-y-6
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
            className="mx-auto w-14 h-14 mb-3 relative" // Reduced size and margin
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
          >
            <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl"></div>
            <div className="relative h-full w-full flex items-center justify-center rounded-full border border-gray-700/50 bg-gray-900/70">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-7 w-7 text-red-500" // Reduced icon size
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
          </motion.div>
          
          <h1 className="text-xl font-bold mb-0.5 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-100 to-gray-300">
            Forgot Password
          </h1>
          <p className="text-gray-400 text-xs max-w-xs mx-auto">
            Enter your email address and we&apos;ll send you a link to reset your password
          </p>
        </motion.div>
        
        {serverError && (
          <motion.div 
            className="bg-red-500/10 backdrop-blur-sm rounded-lg p-2 border border-red-500/20" // Reduced padding
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-red-500 text-xs font-medium text-center"> // Smaller text
              {serverError}
            </p>
          </motion.div>
        )}
        
        <motion.div 
          className="space-y-4" // Reduced from space-y-5
          variants={fadeInUp} 
          custom={1}
        >
          <div className="relative">
            <RHFTextField
              name="email"
              label="Email"
              type="email"
              placeholder="Enter your email address"
            />
            <motion.div 
              className="absolute inset-0 rounded-lg border border-red-500/0 pointer-events-none"
              animate={{ 
                borderColor: ["rgba(239, 68, 68, 0)", "rgba(239, 68, 68, 0.1)", "rgba(239, 68, 68, 0)"],
                boxShadow: [
                  "0 0 0 rgba(239, 68, 68, 0)", 
                  "0 0 8px rgba(239, 68, 68, 0.2)", 
                  "0 0 0 rgba(239, 68, 68, 0)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
            />
          </div>

          <motion.button
            variants={fadeInUp}
            custom={2}
            type="submit"
            className="w-full relative group overflow-hidden bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500
                     transition-all duration-300 rounded-lg px-6 py-2.5 font-medium 
                     focus:ring-2 focus:ring-red-500/50 focus:outline-none
                     shadow-lg shadow-red-700/20
                     disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            <span className="relative z-10 flex items-center justify-center">
              {isSubmitting ? (
                <span className="flex items-center justify-center space-x-2">
                  <svg className="animate-spin h-4 w-4 border-2 border-t-transparent border-white rounded-full" viewBox="0 0 24 24"></svg>
                  <span>Sending...</span>
                </span>
              ) : (
                "Send Reset Link"
              )}
            </span>
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </motion.button>
          
          <motion.p 
            variants={fadeInUp} 
            custom={3}
            className="text-center text-xs text-gray-400 pt-1" // Reduced text size and padding
          >
            Remember your password?{" "}
            <Link href="/login" className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600 font-medium hover:from-red-500 hover:to-red-400 transition-all duration-300">
              Back to Sign In
            </Link>
          </motion.p>
        </motion.div>
      </motion.div>
      
      <SuccessModal isOpen={isOpen} onClose={() => setIsOpen(false)} email={email} />
    </FormProvider>
  );
};

export default ForgotPasswordForm;