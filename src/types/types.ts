type IP = {
  ip: string;
  alive: boolean;
};

type IpRet = {
  ips: IP[];
  count: number;
};

type Range = {
  min: number;
  max: number;
};

export type { IP, IpRet, Range };
