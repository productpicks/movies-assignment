"use client";
import React from "react";
import Image from "next/image";

export type DataProp = {
  key: number;
  icon: string;
  percent: string;
  plusPercent: string;
  title: string;
};
export default function DataCardDashboard({
  key,
  icon,
  percent,
  plusPercent,
  title,
}: DataProp) {
  return (
    <div
      key={key}
      className="bg-primary text-[#fff] flex p-6 rounded-[10px] items-center relative"
    >
      <div className="flex flex-col">
        <span className="text-[14px] font-[500] font-poppins">{title}</span>
        <span className="text-[30px] font-[600] font-poppins">{percent}</span>
        <span className="text-[14px] font-[400] font-poppins">
          Confidence factor: {plusPercent}%
        </span>
        <div className="absolute bottom-[24px] right-[24px]">
          <Image src={icon} width={35} height={40} alt="Summary Icon" />
        </div>
      </div>
    </div>
  );
}
