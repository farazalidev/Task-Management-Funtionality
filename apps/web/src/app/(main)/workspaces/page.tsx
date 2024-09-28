/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import CircleLoader from "@/components/status/CirlceLoader";
import DisplayError from "@/components/status/Error";
import NoData from "@/components/status/NoData";
import WorkspaceCard from "@/components/workspace/WorkspaceCard";
import { GetWorkspaces } from "@/utils/api";
import React from "react";
import useSWR from "swr";


const Page: React.FC= () => {
  const { data, error, isLoading } = useSWR("/workspace", GetWorkspaces);
  if (isLoading) {
    return <CircleLoader />;
  }

  if (error) {
    return <DisplayError errorMessage={ error?.message} />;
  }

  return (
    <div className="h-full px-3 py-4">
      <div className="pb-4 flex place-items-center justify-between">
        <h2 className="text-xl font-bold ">My Workspaces</h2>
        
      </div>
      {data?.data?.workspaces?.length === 0 ? (
        <NoData name="workspaces" />
      ) : (
        <div className="grid grid-cols-12 w-full h-full gap-3">
          {data?.data.workspaces.map((card: any) => {
            return <WorkspaceCard key={card?._id} data={card?.workspace} />;
          })}
        </div>
      )}
    </div>
  );
};
export default Page;
