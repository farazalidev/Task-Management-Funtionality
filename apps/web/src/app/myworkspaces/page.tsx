/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import useSWR from "swr";
import { GetMyWorkspaces } from "../../utils/api";
import NoData from "../../components/status/NoData";
import WorkspaceCard from "@/components/workspace/WorkspaceCard";


const Page: React.FC= () => {
  const { data, error, isLoading } = useSWR("/myworkspaces", GetMyWorkspaces);

  if (isLoading) {
    return <h1>loading...</h1>;
  }

  if (error) {
    return <h1>error {JSON.stringify(error)}</h1>;
  }

  return (
    <div className="h-full px-3 py-4">
      <div className="pb-4 flex place-items-center justify-between">
        <h2 className="text-xl font-bold ">My Workspaces</h2>
        <button className="border-[2px] border-black px-2 py-1">
          Add More
        </button>
      </div>
      {data?.data?.workspaces?.length === 0 ? (
        <NoData name="My workspaces" />
      ) : (
        <div className="grid grid-cols-12 w-full h-full gap-3">
          {data?.data.workspaces.map((card: any) => {
            return <WorkspaceCard key={card?._id} data={card} />;
          })}
        </div>
      )}
    </div>
  );
};
export default Page;
