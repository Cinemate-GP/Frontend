'use client';
import { authFetch } from "@/lib/api";

const SwitchButton = ({ status,setStatus , disabled,statusType }: { status: boolean; setStatus: (state: boolean) => void , disabled?: boolean,statusType?:string}) => {
  const toggleStatus = async () => {
    setStatus(!status);
    if (statusType) {
      try {
        const response = await authFetch(`/api/Profile/${statusType}`, {
          method: "PUT",
        });
        if (!response.ok) {
          throw new Error("Failed to update status");
        }
      } catch (error) {
        console.error("Error updating status:", error);
      }
    }
  }
  
   
  return (
    <div
      role="button"
      aria-disabled={disabled}
      className={`w-12 h-6 flex items-center bg-gray-400 rounded-full p-1 cursor-pointer ${
        status ? "!bg-primary" : ""
      }`}
      onClick={() => toggleStatus()}
    >
      <div className={`w-5 h-5 bg-white rounded-full transition-all duration-200 ${status ? "translate-x-[22px]" : ""}`}></div>
    </div>
  );
};

export default SwitchButton;
