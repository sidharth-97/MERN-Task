import { useEffect, useState } from "react";
import MonthDropdown from "./UI/MonthDropdown";
import axios from "axios";

interface Response{
    sale: number,
    count: number,
    unsold:number
}

const Statistics = () => {
  const [data, setData] = useState<Response>();
  const [month, setMonth] = useState(1);

  useEffect(() => {
    async function getData() {
      const response = await axios.get(
        `http://localhost:3000/api/Statistics?month=${month}`
      );
      setData(response.data.data);
    }
    getData();
    console.log(data);
  }, [month]);
  return (
    <div className="text-[#F0E3CA] bg-[#1F1E1B] w-1/3  border border-spacing-3 border-[#A35709] p-10">
      <div className="flex justify-between">
        {" "}
        <h1 className="text-xl underline">Statistics</h1>
        <div>
          <MonthDropdown set={setMonth} />
        </div>
      </div>
      <div>
        <div className="flex justify-between">
          <p>Total Sale</p>
          <p>{data?.sale}</p>
        </div>
        <div className="flex justify-between">
          <p>Total sold item</p>
          <p>{data?.count}</p>
        </div>
        <div className="flex justify-between">
          <p>Total not sold item</p>
          <p>{data?.unsold}</p>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
