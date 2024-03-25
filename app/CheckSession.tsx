"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";

function CheckSession() {
  const router = useRouter();

  useEffect(() => {}, []);
  return (
    <>
      <ToastContainer />
    </>
  );
}

export default CheckSession;
