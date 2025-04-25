"use client";
import SuccessModal from "@/components/modals/SuccessSendEmail";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function VerifyEmail() {
  const { email } = useParams();
  const emailAddress = decodeURIComponent(email as string);
  const [loading, setLoading] = useState(false);
  const [isOpen,setIsOpen] = useState(false)

  const reSendEmail = async (emailAddress: string) => {
    try {
      const response = await fetch(`/api/Auth/resend-confirm-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: emailAddress }),
      });

      if (response.ok) {
        console.log("Email re-sent successfully");
        setIsOpen(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-cover bg-center">
      <div className="bg-black bg-opacity-80 p-8 rounded-lg shadow-lg text-center w-96">
        <h2 className="text-white text-2xl font-semibold">Verify Your Email</h2>
        <p className="text-gray-400 mt-2">
          {" We've sent a confirmation email to:"} <br />
          <span className="text-red-400 font-semibold">{emailAddress}</span>
        </p>
        <p className="text-gray-400 mt-3">
          Please check your inbox and click the verification link.
        </p>
        <p className="text-gray-400 text-sm mt-3">Didn’t receive the email?</p>
        <button
          className="text-red-400 hover:underline"
          onClick={() => reSendEmail(emailAddress)}
        >
          {loading ? (
            <span className="flex items-center">
              <svg
                className="animate-spin h-5 w-5 mr-2 border-t-2 border-white rounded-full"
                viewBox="0 0 24 24"
              ></svg>
              Loading...
            </span>
          ) : (
            "Resend"
          )}
        </button>
      </div>
      <SuccessModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}
