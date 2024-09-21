import Image from "next/image";
import dayjs from "dayjs";
import type { HTMLAttributes } from "react";
import React from "react";

export type WorkspaceType = {
  name: string;
  createdAt: string;
  updatedAt: string;
};

interface WorkspaceCardProps extends HTMLAttributes<HTMLDivElement> {
  data: WorkspaceType;
}

const WorkspaceCard: React.FC<WorkspaceCardProps> = ({ ...props }) => {
  return (
    <div
      className="border-[2px] border-black p-2 col-span-12 lg:col-span-6 xl:col-span-4 h-[200px] cursor-pointer flex flex-col justify-between"
      {...props}
    >
      <div className="flex place-items-center justify-center gap-2">
        <Image src={"/workspace.svg"} height={25} width={25} alt="" />
        <span className="font-bold text-lg capitalize">{props.data.name}</span>
      </div>
      <div className="w-full flex justify-between place-items-center">
        <div className="flex flex-col">
          <span className="font-semibold">created on</span>
          <span>{dayjs(props.data.createdAt).format("MMMM D, YYYY")}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-semibold">updated on</span>
          <span>{dayjs(props.data.updatedAt).format("MMMM D, YYYY")}</span>
        </div>
      </div>
    </div>
  );
};
export default WorkspaceCard;
