import React from "react";
import { IP } from "../types/types";
import IpItem from "./IpItem";

interface Props {
  ips: IP[] | undefined;
}

const IpList: React.FC<Props> = ({ ips }) => {
  return (
    <div className="flex flex-wrap items-start gap-2 overflow-auto">
      {ips && ips.map((ip, index) => <IpItem ip={ip} key={index} />)}
    </div>
  );
};

export default IpList;
