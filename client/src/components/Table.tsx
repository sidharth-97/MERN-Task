import axios from "axios";
import { useEffect, useState } from "react";
import MonthDropdown from "./UI/MonthDropdown";

export interface Transaction {
  id: string;
  title: string;
  price: string;
  description: string;
  category: string;
  image: string;
  sold: boolean;
  dateOfSale: string;
}

const Table = () => {
  const [data, setData] = useState<Transaction[]>([]);
  const [search, setSearch] = useState("");
  const [month, setMonth] = useState(1);
  const [count, setCount] = useState(0)
  const [page,setPage]=useState(1)
  useEffect(() => {
    async function getData() {
      const response = await axios.get(
        `http://localhost:3000/api/alltransactions?month=${month}&search=${search}&page=${page}`
      );
      setData(response.data.data);
      setCount(response.data.docCount)
      console.log(count,"form table");
    }
    
    getData();
    console.log(page);
    
  }, [search, month,page]);
  return (
    <div className="p-10">
      <div className="flex w-full justify-between py-2">
        <div>
          {" "}
          <input
            type="search"
            onChange={(e) => setSearch(e.target.value)}
            id="default-search"
            className="block w-full p-2 ps-10 text-sm text-[#F0E3CA] border border-[#A35709] rounded-lg bg-transparent focus:ring-blue-500 focus:border-blue-500 "
            placeholder="Search here"
            required
          />
        </div>
        <div>
          <form className="">
            <MonthDropdown set={setMonth} />
          </form>
        </div>
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-[#F0E3CA] border border-spacing-3 border-[#A35709] bg-[#1F1E1B]">
        <thead className="text-xs uppercase text-[#F0E3CA]">
          <tr className="text-center">
            <th scope="col" className="px-3 py-3">
              ID
            </th>
            <th scope="col" className="px-3 py-3">
              Title
            </th>
            <th scope="col" className="px-3 py-3 min-w-40">
              Description
            </th>
            <th scope="col" className="px-3 py-3">
              Price
            </th>
            <th scope="col" className="px-3 py-3">
              Category
            </th>
            <th scope="col" className="px-3 py-3 min-w-40">
              Sold
            </th>
            <th scope="col" className="px-3 py-3">
              Image
            </th>
            <th scope="col" className=" px-3 py-3" colSpan={2}></th>
          </tr>
        </thead>
        <tbody className="text-[#F0E3CA] border">
          {data.length > 0 &&
            data.map((item: Transaction) => (
              <tr className="border-b border border-spacing-3 border-[#A35709] p-2">
                <th
                  scope="row"
                  className="px-2 py-4 font-medium whitespace-nowrap"
                >
                  {item.id}
                </th>
                <td className="px-2 py-4">{item.title}</td>
                <td className="px-2 py-4 text-xs">{item.description}</td>
                <td className="px-2 py-4">{item.price}</td>
                <td className="px-2 py-4">{item.category}</td>
                <td className="px-2 py-4 text-center">{item.sold.toString()}</td>
                <td className="px-2 py-4">
                  <img className="w-10" src={item.image} alt="" />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4 text-white items-center mb-1">
      <p className={`${page==1&&"hidden"}`} onClick={()=>setPage((prev)=>prev-1)}>prev</p>
        {[...Array(count)].map((_, index) => <button
          onClick={()=>setPage(index+1)}
          key={index}
          className={`px-2 py-1 mx-1 rounded text-[#FF8303]`}
        >
          {index+1}
        </button>)
        }
       <p className={`${page==count+1&&"hidden"}`} onClick={()=>setPage((prev)=>prev+1)}>next</p>
      </div>
    </div>
  );
};

export default Table;
