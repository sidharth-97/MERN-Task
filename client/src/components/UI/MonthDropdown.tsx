import React from 'react'

interface MonthDropdownProps {
    set: React.Dispatch<React.SetStateAction<number>>;
  }

const MonthDropdown:React.FC<MonthDropdownProps> = ({set}) => {
  return (
    <select
      defaultValue={3}
    onChange={(e) => set((_prev)=>parseInt(e.target.value))}
    id="countries"
    className="bg-transparent border border-[#A35709] text-gray-300 text-sm rounded-lg focus:ring-[#A35709] focus:border-[#A35709] block w-full p-2.5"
  >
    <option selected className=' bg-black text-[#A35709]"'>
      Select Month
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
    <option value="5" className=" bg-black text-[#A35709]">
      May
    </option>
    <option value="6" className="  bg-black text-[#A35709]">
      Jun
    </option>
    <option value="7" className="  bg-black text-[#A35709]">
      Jul
    </option>
    <option value="8" className="  bg-black text-[#A35709]">
      Aug
    </option>
    <option value="9" className="  bg-black text-[#A35709]">
      Sept
    </option>
    <option value="10" className="  bg-black text-[#A35709]">
      Oct
    </option>
    <option value="11" className="  bg-black text-[#A35709]">
      Nov
    </option>
    <option value="12" className="  bg-black text-[#A35709]">
      Dec
    </option>
  </select>
  )
}

export default MonthDropdown