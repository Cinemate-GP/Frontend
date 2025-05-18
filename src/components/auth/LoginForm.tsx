"use client";
import {motion} from "framer-motion";
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
  afterSubmit?: string;
}

const LoginForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const methods = useForm<LoginFormData>({
    resolver: yupResolver(LoginSchema),
    defaultValues: {
      userNameOrEmail: "",
      password: "",
    },
    mode: "onChange",
  });

  const {
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    try {
      const response = await fetch("/api/Auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw Error(error.errors[1] || "Login failed. Please check your credentials.");
      }
      
      const user = await response.json();
      dispatch(
        setUser({user})
      );
      setCookie("token", user.token, 1);
      setCookie("refreshToken", user.refreshToken, 1);
      setCookie("userId", user.id, 1);
      router.push("/home");
    } catch (error) {
      setError("afterSubmit", {
        type: "manual",
        message: error instanceof Error ? error.message : "An error occurred",
      });
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
          <h1 className="text-xl font-bold mb-0.5 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
            Welcome Back
          </h1>
          <p className="text-gray-400 text-xs">
            Sign in to continue to your account
          </p>
        </motion.div>

        {!!errors.afterSubmit && (
          <motion.div 
            className="bg-red-500/10 backdrop-blur-sm rounded-lg p-2 border border-red-500/20"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-red-500 text-xs font-medium text-center">
              {errors.afterSubmit.message}
            </p>
          </motion.div>
        )}
        
        <div className="space-y-3">
          <motion.div variants={fadeInUp} custom={1}>
            <RHFTextField
              name="userNameOrEmail"
              label=" Email or Username"
              type="text"
              placeholder="Enter your email or username"
            />
          </motion.div>
          
          <motion.div variants={fadeInUp} custom={2} className="space-y-1">
            <RHFTextField
              name="password"
              label="Password"
              type="password"
              placeholder="Enter your password"
            />
            
            <Link
              href="/forgot-password"
              className="text-xs font-medium text-gray-300 hover:text-primary transition-all duration-200 w-fit block ml-auto"
            >
              Forgot Password?
            </Link>
          </motion.div>
          
          <motion.div variants={fadeInUp} custom={3}>
            <button
              type="submit"
              className="w-full relative group overflow-hidden bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 text-white
                        transition-all duration-300 rounded-lg px-6 py-2.5 font-medium mt-1
                        focus:ring-2 focus:ring-primary/50 focus:outline-none
                        disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              <span className="relative z-10 flex items-center justify-center">
                {isSubmitting ? (
                  <span className="flex items-center justify-center space-x-2">
                    <svg className="animate-spin h-4 w-4 border-2 border-t-transparent border-white rounded-full" viewBox="0 0 24 24"></svg>
                    <span>Signing in...</span>
                  </span>
                ) : (
                  "Sign In"
                )}
              </span>
              <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </motion.div>
          
          <motion.p 
            variants={fadeInUp} 
            custom={4}
            className="text-center text-xs text-gray-400 pt-1"
          >
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600 font-medium hover:from-red-500 hover:to-red-400 transition-all duration-300">
              Create an account
            </Link>
          </motion.p>
        </div>
      </motion.div>
    </FormProvider>
  );
};

export default LoginForm;
