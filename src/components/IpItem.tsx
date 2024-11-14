import React, { useEffect, useState } from "react";
import { IP } from "../types/types";

interface Props {
  ip: IP;
}

const IpItem: React.FC<Props> = ({ ip }) => {
  const [_ip, set_Ip] = useState<IP | undefined>(undefined);
  const [intervalDelay, setIntervalDelay] = useState<number>(20000);

  useEffect(() => {
    const fetchIpStatus = () => {
      fetch(`http://localhost:8082/network/check-ip?ip=${ip.ip}`)
        .then((res) => res.json())
        .then((data) => {
          set_Ip(data);
          setIntervalDelay(10000);
        })
        .catch((err) => {
          console.error(err);
          setIntervalDelay((prev) => Math.min(prev * 2, 60000));
        });
    };

    fetchIpStatus();

    const intervalId = setInterval(fetchIpStatus, intervalDelay);

    return () => clearInterval(intervalId);
  }, [ip, intervalDelay]);

  return (
    <div className="flex items-center justify-between w-40 h-10 gap-3 px-3 bg-white rounded-lg shadow w-">
      <p>{_ip?.ip}</p>
      <div
        className={`${_ip?.alive ? "bg-green-500" : "bg-red-700"} h-4 w-4`}
      ></div>
    </div>
  );
};

export default IpItem;
