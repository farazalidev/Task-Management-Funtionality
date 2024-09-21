import type { HTMLAttributes } from "react";
import Image from "next/image";
import React from "react";

interface NoDataProps extends HTMLAttributes<HTMLDivElement> {
  name: string;
}

const NoData: React.FC<NoDataProps> = ({ ...props }) => {
  return (
    <div
      className="w-full h-full flex justify-center place-items-center"
      {...props}
    >
      <div className="flex justify-center place-items-center flex-col">
        <Image src={"/no_data.svg"} width={300} height={300} alt="no data" />
        <span>Sorry! We found no data for {props.name}</span>
      </div>
    </div>
  );
};
export default NoData;
