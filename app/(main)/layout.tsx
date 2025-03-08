"use client";

import React, { useContext, useEffect } from "react";
import Provider from "../provider";
import Header from "./_components/Header";
import { useRouter } from "next/navigation";
import { GetAuthUserData } from "@/services/GlobalApi";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { AuthContext } from "@/context/AuthContext";

function WorkSpaceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  const convex = useConvex();
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    CheckUseAuth();
  }, []);

  const CheckUseAuth = async () => {
    const token = localStorage.getItem("user_token");
    // console.log("token", token);
    //Get New Access Token
    const user = token && (await GetAuthUserData(token));
    console.log(user);
    console.log(user.picture);
    if (!user?.email) {
      router.replace("/sign-in");
      return;
    }
    // Get User Info From Database
    try {
      const result = await convex.query(api.users.GetUser, {
        email: user?.email,
      });
      console.log("result--", result);
      setUser(result);
    } catch (e) {}
  };

  return (
    <div>
      <Provider>
        <Header user={user} />
        {children}
      </Provider>
    </div>
  );
}

export default WorkSpaceLayout;
