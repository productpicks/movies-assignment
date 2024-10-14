import React, { useState, useEffect } from "react";
import debounce from "lodash.debounce";
import { getAllPorts } from "@/src/utils/services/service";

interface Port {
  id: number;
  name: string;
}
export type RGMSearchProp = {
  type?: string;
  label?: string;
  labelPlacement?: "outside" | "outside-left" | "inside";
  placeholder?: string;
  classname?: string;
  errorMsg?: string;
  value?: string;
  //   onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChange?: (port: Port) => void;
  onBlur?: () => void;
  showEye?: boolean;
  disbaled?: boolean;
  errorWidth?: boolean;
  borderColor?: string;
  textColor?: string;
  btnType?: number;
  mainWidth?: string;
};
function SearchPortInput({
  type,
  labelPlacement,
  placeholder,
  classname,
  errorMsg,
  value,
  onChange,
  onBlur,
  showEye,
  disbaled,
  errorWidth,
  borderColor,
  textColor,
  btnType,
  mainWidth,
}: RGMSearchProp) {
  const [searchText, setSearchText] = useState<string>("");
  const [ports, setPorts] = useState<Port[]>([]);
  const [selectedPort, setSelectedPort] = useState<Port | null>(null);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  // Debounced function to call API
  const fetchPorts = debounce(async (query: string) => {
    if (query.length > 2) {
      try {
        const response = await getAllPorts(`?name=${query}`);
        setPorts(response.data.results);
        setShowDropdown(true);
      } catch (error) {
        console.error("Error fetching ports:", error);
      }
    } else {
      setShowDropdown(false);
    }
  }, 300); // Delay API call by 300ms

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    fetchPorts(e.target.value);
  };

  const handleSelectPort = (port: Port) => {
    setSelectedPort(port);
    setSearchText(port.name); // Set the selected port name in the input field
    setShowDropdown(false); // Hide dropdown after selection
  };

  useEffect(() => {
    if (value) {
      setSearchText(value); // This will set the port name in edit mode
    }
  }, [value]);

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={searchText}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="w-full h-[56px] text-[14px] font-poppins font-[400] px-4 border border-[#D3E0E9] rounded-[10px] text-[#7D7D7F] focus:border-[#000] focus:border hover:border-[#000] hover:border"
      />
      {showDropdown && ports.length > 0 && (
        <ul className="absolute w-full bg-white mt-1 max-h-60 overflow-y-auto z-[10000] shadow-medium rounded-large box-border outline-none p-2">
          {ports.map((port) => (
            <li
              key={port.id}
              onClick={() => {
                handleSelectPort(port);
                onChange?.(port);
                onBlur?.();
              }}
              className="p-2 cursor-pointer hover:bg-gray-200 text-[#7D7D7F] hover:text-[#000] rounded-lg text-[14px] font-poppins font-[400]"
            >
              {port.name}
            </li>
          ))}
        </ul>
      )}
      {errorMsg && (
        <p
          className={`text-red-500 text-[12px] min-h-2 ${
            errorWidth && "max-w-[10rem]"
          }`}
        >
          {errorMsg}
        </p>
      )}
    </div>
  );
}

export default SearchPortInput;
