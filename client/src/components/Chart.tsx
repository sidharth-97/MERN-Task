import axios from "axios";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
import MonthDropdown from "./UI/MonthDropdown";

const Barchart = () => {
  const [data, setData] = useState();
  const [month, setMonth] = useState(1);
  useEffect(() => {
    async function getData() {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}api/pricerange?month=${month}`
      );
      setData(
        response.data.data.sort((a: { _id: string }, b: { _id: any }) =>
          a._id.localeCompare(b._id)
        )
      );
    }
    getData();
  }, [month]);
  return (
    <div className="text-[#F0E3CA]">
      <div className="flex justify-between gap-2 items-center">
        <h1 className="w-1/3 ms-14 text-xl">Transactions Bar Chart</h1>
        <div className="w-1/3">
          {" "}
          <MonthDropdown set={setMonth} />
        </div>
      </div>
      <BarChart width={600} height={300} data={data}>
        <XAxis dataKey="_id" stroke="#F0E3CA" />
        <YAxis />
        <Tooltip wrapperStyle={{ width: 100, backgroundColor: "#ccc" }} />
        <Legend
          width={100}
          wrapperStyle={{
            top: 40,
            right: 20,
            backgroundColor: "#f5f5f5",
            border: "1px solid #d5d5d5",
            borderRadius: 3,
            lineHeight: "40px",
          }}
        />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <Bar dataKey="count" fill="#FF8303" barSize={30} />
      </BarChart>
    </div>
  );
};

export default Barchart;
