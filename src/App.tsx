import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import IpList from "./components/IpList";
import { IpRet } from "./types/types";

interface FormFields {
  status: string;
  offset: number;
  limit: number;
}

const App = () => {
  const { register, handleSubmit } = useForm<FormFields>();
  const [ips, setIps] = useState<IpRet | undefined>(undefined);
  const [status, setStatus] = useState<string>("all");
  const [offset, setOffset] = useState<number>(0);
  const [limit, setLimit] = useState<number>(20);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (status) {
      setLoading(true);
      fetch(
        `http://localhost:8082/network/check-ips?status=${status}&offset=${offset}&limit=${limit}`
      )
        .then((res) => res.json())
        .then((data) => setIps(data))
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [status, offset, limit]);

  const onSubmit = (data: FormFields) => {
    if (offset > limit) {
      alert("Offset should be less than the limit");
      return;
    }

    if (limit >= 200) {
      alert("Limit should be less than 200");
      return;
    }

    setStatus(data.status);
    setOffset(data.offset);
    setLimit(data.limit);
  };

  return (
    <div className="p-5 bg-neutral-200">
      <form
        className="flex flex-col gap-4 mb-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex items-center gap-3">
          <label className="flex items-center">
            <input
              {...register("status")}
              type="radio"
              value="alive"
              className="mr-2"
            />
            Up
          </label>
          <label className="flex items-center">
            <input
              {...register("status")}
              type="radio"
              value="dead"
              className="mr-2"
            />
            Down
          </label>

          <label className="flex items-center">
            <input
              {...register("status")}
              type="radio"
              value="all"
              className="mr-2"
            />
            All
          </label>
        </div>

        <div className="flex items-center gap-3">
          <label>
            Offset:
            <input
              {...register("offset", { valueAsNumber: true })}
              type="number"
              className="px-2 py-1 ml-2 border rounded"
              defaultValue={0}
            />
          </label>
          <label>
            Limit:
            <input
              {...register("limit", { valueAsNumber: true })}
              type="number"
              className="px-2 py-1 ml-2 border rounded"
              defaultValue={limit}
            />
          </label>
        </div>

        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-500 rounded"
        >
          Check Status
        </button>
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : ips && ips.ips.length > 0 ? (
        <IpList ips={ips.ips} />
      ) : (
        <p>Nothing found</p>
      )}
    </div>
  );
};

export default App;
