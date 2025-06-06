import React from "react";

const SwitchButton = ({ status,setStatus , disabled }: { status: boolean; setStatus: (state: boolean) => void , disabled?: boolean}) => {
    
   
  return (
    <div
      role="button"
      aria-disabled={disabled}
      className={`w-12 h-6 flex items-center bg-gray-400 rounded-full p-1 cursor-pointer ${
        status ? "!bg-primary" : ""
      }`}
      onClick={() => setStatus(!status)}
    >
      <div className={`w-5 h-5 bg-white rounded-full transition-all duration-200 ${status ? "translate-x-[22px]" : ""}`}></div>
    </div>
  );
};

export default SwitchButton;
