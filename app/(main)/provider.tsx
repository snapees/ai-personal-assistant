"use client";

import { AuthContext } from "@/context/AuthContext";
import { api } from "@/convex/_generated/api";
import { GetAuthUserData } from "@/services/GlobalApi";
import { useConvex } from "convex/react";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect } from "react";
import Header from "./_components/Header";

function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const router = useRouter();

  // const convex = useConvex();
  // const { user, setUser } = useContext(AuthContext);

  // useEffect(() => {
  //   CheckUseAuth();
  // }, []);

  // const CheckUseAuth = async () => {
  //   const token = localStorage.getItem("user_token");
  //   // console.log("token", token);
  //   //Get New Access Token
  //   const user = token && (await GetAuthUserData(token));
  //   console.log(user);
  //   if (!user?.email) {
  //     router.replace("/sign-in");
  //     return;
  //   }
  //   // Get User Info From Database
  //   try {
  //     const result = await convex.query(api.users.GetUser, {
  //       email: user?.email,
  //     });
  //     console.log("result--", result);
  //     setUser(result);
  //   } catch (e) {}
  // };

  return (
    <div>
      {/* <Header /> */}
      {children}
    </div>
  );
}

export default Provider;
