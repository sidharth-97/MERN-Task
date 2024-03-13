import axios from "axios";
import { useEffect, useState } from "react";

interface Transaction {
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
  useEffect(() => {
    async function getData() {
      const response = await axios.get(
        `http://localhost:3000/api/alltransactions?month=${month}&search=${search}`
      );
      setData(response.data.data);
    }
    getData();
  }, [search, month]);
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
            <select
              onChange={(e) => setMonth(e.target.value)}
              id="countries"
              className="bg-transparent border border-[#A35709] text-gray-300 text-sm rounded-lg focus:ring-[#A35709] focus:border-[#A35709] block w-full p-2.5"
            >
              <option selected className=' bg-black text-[#A35709]"'>
                Select Contractor
              </option>
              <option value="1" className=" bg-black text-[#A35709]">
                Jan
              </option>
              <option value="2" className="  bg-black text-[#A35709]">
                Feb
              </option>
              <option value="3" className="  bg-black text-[#A35709]">
                Mar
              </option>
              <option value="4" className="  bg-black text-[#A35709]">
                Apr
              </option>
              <option value="1" className=" bg-black text-[#A35709]">
                May
              </option>
              <option value="2" className="  bg-black text-[#A35709]">
                Jun
              </option>
              <option value="3" className="  bg-black text-[#A35709]">
                Jul
              </option>
              <option value="4" className="  bg-black text-[#A35709]">
                Aug
              </option>
              <option value="2" className="  bg-black text-[#A35709]">
                Sept
              </option>
              <option value="3" className="  bg-black text-[#A35709]">
                Oct
              </option>
              <option value="4" className="  bg-black text-[#A35709]">
                Nov
              </option>
              <option value="4" className="  bg-black text-[#A35709]">
                Dec
              </option>
            </select>
          </form>
        </div>
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-[#F0E3CA] border border-spacing-3 border-[#A35709]">
        <thead className="text-xs uppercase text-[#F0E3CA]">
          <tr>
            <th scope="col" className="px-6 py-3">
              ID
            </th>
            <th scope="col" className="px-6 py-3">
              Title
            </th>
            <th scope="col" className="px-6 py-3 min-w-40">
              Description
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Category
            </th>
            <th scope="col" className="px-6 py-3 min-w-40">
              Sold
            </th>
            <th scope="col" className="px-6 py-3">
              Image
            </th>
            <th scope="col" className=" px-6 py-3" colSpan={2}></th>
          </tr>
        </thead>
        <tbody className="text-[#F0E3CA] border">
          {data.length > 0 &&
            data.map((item: Transaction) => (
              <tr className="border-b border border-spacing-3 border-[#A35709] p-2">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium whitespace-nowrap"
                >
                  {item.id}
                </th>
                <td className="px-6 py-4">{item.title}</td>
                <td className="px-6 py-4">{item.description}</td>
                <td className="px-6 py-4">{item.price}</td>
                <td className="px-6 py-4">{item.category}</td>
                <td className="px-6 py-4">{item.sold}</td>
                <td className="px-6 py-4">
                  <img className="w-10" src={item.image} alt="" />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
