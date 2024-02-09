"use-client";

import { hora } from "@/helpers/date-formats";
import { useEffect, useState } from "react";

function Clock() {
  const [clock, setClock] = useState<string>("00:00 -. -.");

  const callBack = () => {
    setClock(hora());
  };

  useEffect(() => {
    const interval = setInterval(callBack, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return <>{clock}</>;
}

export default Clock;
