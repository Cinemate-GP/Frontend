"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import Link from "next/link";
import FormProvider from "../../components/hook-form/FormProvider";
import RHFTextField from "../../components/hook-form/RHFTextField";
import { LoginSchema } from "@/lib/validation";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slices/userSlice";
import { setCookie } from "@/lib/utils";

interface LoginFormData {
  userNameOrEmail: string;
  password: string;
}

const LoginForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [serverError, setServerError] = useState<string | null>(null);

  const methods = useForm<LoginFormData>({
    resolver: yupResolver(LoginSchema),
    defaultValues: { userNameOrEmail: "", password: "" },
    mode: "onChange",
  });

  const {
    watch,
    handleSubmit,
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

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    try {
      setServerError(null);
      const response = await fetch("/api/Auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw Error(error.errors[1] || "Login failed. Please check your credentials.");
      }

      const user = await response.json();
      dispatch(setUser({ user }));
      setCookie("token", user.token, 1);
      setCookie("refreshToken", user.refreshToken, 1);
      setCookie("userId", user.id, 1);
      router.push("/home");
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
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <motion.div
        className="space-y-4"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      >
        <motion.div className="text-center mb-4" variants={fadeInUp} custom={0}>
          <h1 className="text-xl font-bold bg-clip-text text-textMuted">
            Welcome Back
          </h1>
        </motion.div>

        <AnimatePresence>
          {serverError && (
            <motion.div
              key="server-error"
              className="bg-red-500/10 backdrop-blur-sm rounded-lg p-2.5 border border-red-500/20 flex items-start gap-2"
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1, x: [0, -6, 6, -4, 4, 0] }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ duration: 0.35 }}
            >
              <p className="text-red-500 text-xs font-medium flex-1 text-center">
                {serverError}
              </p>
              <button
                type="button"
                onClick={() => setServerError(null)}
                className="text-red-400 hover:text-red-300 transition-colors shrink-0"
                aria-label="Dismiss error"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-3">
          <motion.div variants={fadeInUp} custom={1}>
            <RHFTextField
              name="userNameOrEmail"
              type="text"
              placeholder="Email or username"
            />
          </motion.div>

          <motion.div variants={fadeInUp} custom={2} className="space-y-1">
            <RHFTextField
              name="password"
              type="password"
              placeholder="Password"
            />
            <Link
              href="/forgot-password"
              className="text-xs font-medium text-textMuted hover:text-primary transition-all duration-200 w-fit block ml-auto"
            >
              Forgot Password?
            </Link>
          </motion.div>

          <motion.div variants={fadeInUp} custom={3}>
            <button
              type="submit"
              className="w-full relative group overflow-hidden bg-primary text-white
                        transition-all duration-300 rounded-lg px-6 py-2.5 font-medium mt-1
                        focus:ring-2 focus:ring-primary/50 focus:outline-none
                        disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              <span className="relative z-10 flex items-center justify-center">
                {isSubmitting ? (
                  <span className="flex items-center justify-center space-x-2">
                    <svg className="animate-spin h-4 w-4 border-2 border-t-transparent border-white rounded-full" viewBox="0 0 24 24" />
                    <span>Signing in...</span>
                  </span>
                ) : (
                  "Sign In"
                )}
              </span>
              <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </motion.div>

          <motion.p
            variants={fadeInUp}
            custom={4}
            className="text-center text-[16px] text-gray-400 pt-1"
          >
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-transparent bg-clip-text bg-primary transition-all duration-300">
              Create an account
            </Link>
          </motion.p>

          <motion.div variants={fadeInUp} custom={5} className="pt-2">
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

export default LoginForm;
