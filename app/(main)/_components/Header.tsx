"use client";

import { AuthContext } from "@/context/AuthContext";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";

function Header({ user }: { user: any }) {
  // const { user } = useContext(AuthContext);
  // const [isUserAvailable, setIsUserAvailable] = useState(false);

  // useEffect(() => {
  //   if (user) {
  //     setIsUserAvailable(true);
  //   }
  // }, [user]);

  return (
    <div className="p-3 shadow-sm flex items-center justify-between px-14">
      <Image src={"/logo.svg"} alt="logo" width={40} height={40} />
      {user?.picture && (
        <Image
          src={user?.picture}
          alt="logo"
          width={40}
          height={40}
          className="rounded-full"
        />
      )}
    </div>
  );
}

export default Header;
