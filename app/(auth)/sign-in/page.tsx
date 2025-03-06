"use client";

import { Button } from "@/components/ui/button";
import { GetAuthUserData } from "@/services/GlobalApi";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import Image from "next/image";
import React from "react";

function Signin() {
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      if (typeof window !== undefined) {
        localStorage.setItem("user_token", tokenResponse.access_token);
      }

      const user = GetAuthUserData(tokenResponse.access_token);

      console.log("user=>", user);
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center gap-5 border rounded-2xl p-10 shadow-md">
        <Image src={"/logo.svg"} width={50} height={50} alt="logo" />
        <h2 className="text-2xl">
          Sign In To Your AI Personal Assistant & Agent
        </h2>

        <Button onClick={() => googleLogin()}>Sign In with Gmail</Button>
      </div>
    </div>
  );
}

export default Signin;
