"use client";
import { FieldValues, UseFormRegister } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { BiChevronDown } from "react-icons/bi";
interface inputProps {
  label?: string;
  name?: string;
  type?: string;
  placeholder?: string;
  register?: ReturnType<UseFormRegister<FieldValues>>;
}

export function Input({
  label,
  name,
  type,
  placeholder,
  register,
}: inputProps) {
  return (
    <div className="text-sm w-full">
      <label className={`text-white font-semibold`}>{label}</label>      <input
        name={name}
        {...register}
        type={type}
        placeholder={placeholder}
        className={`w-full bg-transparent text-sm mt-3 p-4 border 
           'border-white text-white rounded-lg focus:border focus:border-subMain focus:outline-none focus:ring-0`}
        style={{
          outline: 'none !important',
          boxShadow: 'none !important',
          WebkitAppearance: 'none',
          MozAppearance: 'none',
          appearance: 'none'
        }}
      />
    </div>
  );
}

// select
export const CustomSelect = ({
  options,
  label,
}: {
  options: string[];
  label: string;
}) => {
  const [selected, setSelected] = useState("Male");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full flex flex-col gap-3">
      <label htmlFor="" className="text-white">
        {label}
      </label>
      <div
        className={`w-full flex justify-between items-center p-3 rounded-md text-sm cursor-pointer border border-gray-700 transition ${
          isOpen ? "bg-gray-800 text-white" : "bg-transparent text-gray-300"
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium">{selected}</span>
        <BiChevronDown size={18} className="text-gray-400" />
      </div>

      {/* Dropdown List */}
      {isOpen && (
        <ul className="absolute w-full bg-[#1a1a1a] border border-gray-700 mt-1 rounded-md shadow-lg z-10 top-20">
          {options.map((option) => (
            <li
              key={option}
              className={`p-3 cursor-pointer transition ${
                selected === option
                  ? "bg-red-600 text-white" // Selected option in red
                  : "hover:bg-gray-700 hover:text-white text-gray-300"
              }`}
              onClick={() => {
                setSelected(option);
                setIsOpen(false);
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
