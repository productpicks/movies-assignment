import React from "react";
import { Select, SelectItem } from "@nextui-org/react";
import { VesselDataInterface } from "@/src/interfaces";

export type RGMSelectProp<T = any> = {
  label?: string;
  classname?: string;
  errorMsg?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: () => void;
  showEye?: boolean;
  disbaled?: boolean;
  errorWidth?: boolean;
  borderColor?: string;
  data: T[]; // Now accepts any type of data
  mainWidth?: string;
  height?: string;
  labelPlacement?: "outside" | "outside-left" | "inside";
  onCreateNewButton?: () => void;
  createButtonText?: string;
};

export default function RGMSelect({
  classname,
  errorMsg,
  value,
  onChange,
  onBlur,
  showEye,
  disbaled,
  errorWidth,
  borderColor,
  label,
  data,
  mainWidth,
  height,
  labelPlacement,
  onCreateNewButton,
  createButtonText,
}: RGMSelectProp) {
  return (
    <div className={mainWidth}>
      <Select
        label={label}
        className={classname}
        variant="bordered"
        classNames={{
          listbox: "text-[#7D7D7F]",
          label: "text-[#7D7D7F]",
          trigger: `text-[#7D7D7F] !border ${height} ${borderColor}`,
        }}
        value={value} // Set the selected value
        onChange={onChange} // Ensure the selected value is passed to onChange
        onBlur={onBlur}
        selectedKeys={value ? [value.toString()] : []}
        labelPlacement={labelPlacement}
      >
        {data.length > 0 ? (
          data.map((vessel) => (
            <SelectItem key={vessel.id.toString()} value={vessel.id.toString()}>
              {vessel.name}
            </SelectItem>
          ))
        ) : onCreateNewButton ? ( // Check if onCreateNewVessel is provided
          <SelectItem
            key="create-new"
            value="create-new" // Use a distinct string value
            className="text-secondary font-semibold cursor-pointer"
            onClick={(e) => {
              e.stopPropagation(); // Prevent selecting it as a dropdown value
              if (onCreateNewButton) {
                onCreateNewButton(); // Trigger the creation action
              }
            }}
          >
            {createButtonText}
          </SelectItem>
        ) : (
          data.map((vessel) => (
            <SelectItem key={vessel.id.toString()} value={vessel.id.toString()}>
              {vessel.name}
            </SelectItem>
          ))
        )}
      </Select>
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
