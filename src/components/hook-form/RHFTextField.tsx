'use client'
import { useFormContext, Controller } from "react-hook-form";
import { BsEye, BsEyeSlash } from "react-icons/bs";

import { useState } from "react";

interface RHFTextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label: string;
    type: string;
    color?: string;
  }
  

const RHFTextField = ({ name, label, type, ...other }: RHFTextFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="flex flex-col w-full items-start justify-start relative">
          <label htmlFor="email">{label}</label>
          <input
            {...field}
            type={type === "password" ? (showPassword ? "text" : "password") : type}
            {...other}
            className={`w-full bg-transparent text-sm mt-3 p-4 outline-none border ${error ? "border-red-500" :  'border-gray-800'} font-light rounded-lg focus:border `}
          />
          {type === "password" && <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-14">
            {showPassword ? <BsEyeSlash /> : <BsEye />}
          </button>}
          {error && <p className="text-red-500 mt-1 text-sm">{error.message}</p>}
        </div>
      )}
    />
  );
};

export default RHFTextField;

