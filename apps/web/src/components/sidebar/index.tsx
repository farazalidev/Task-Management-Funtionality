"use client";
import type { HTMLAttributes } from "react";
import React from "react";
import { sidebardata, SideBarDataType } from "./sidebar.data";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps extends HTMLAttributes<HTMLDivElement> {}

export const Sidebar: React.FC<SidebarProps> = ({ ...props }) => {
  return (
    <aside className="col-span-3 h-full" {...props}>
      <h2 className="text-xl font-bold text-center w-full px-2 py-5">
        Task Management
      </h2>
      <div className="flex flex-col justify-center place-items-center gap-3">
        {sidebardata.map((data) => {
          return <SideBarCard key={data.path} data={data} />;
        })}
      </div>
    </aside>
  );
};

interface SideBarCardProps {
  data: SideBarDataType;
}

export const SideBarCard: React.FC<SideBarCardProps> = ({ data }) => {
  const path = usePathname();
  return (
    <Link
      href={data.path}
      className={`w-full min-h-[40px] border-y-[2px] border-black font-semibold flex  justify-center place-items-center ${path === data.path ? "bg-black text-white" : ""}`}
    >
      {data.title}
    </Link>
  );
};
