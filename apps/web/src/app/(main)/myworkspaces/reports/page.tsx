"use client";
import CircleLoader from '@/components/status/CirlceLoader';
import DisplayError from '@/components/status/Error';
import TaskReport from '@/components/workspace/MyWorkspaceReports';
import ReportForm from '@/components/workspace/workspaceReportsFilter';
import { GetMyWorkspacesAllUsers, GetMyWorkspacesReports } from '@/utils/api';
import { decodeFilterQuery } from '@/utils/decodeFilterQuery';
import { useQueryState } from 'nuqs';
import React  from 'react';
import useSWR from 'swr';

interface PageProps { }


const Page: React.FC<PageProps> = ({ ...props }) => {
        const [filterQuery] = useQueryState("filter");
        const filters = decodeFilterQuery(filterQuery || "");
        const { data: usersData, error: usersError } = useSWR('/myworkspaces/users', GetMyWorkspacesAllUsers);

        const { data, isLoading, error } = useSWR(
                [filters.all, filters.by_user, filters.from, filters.to],
                ([all, by_user, from, to]) => GetMyWorkspacesReports(all, by_user, from, to)
        );


        if (isLoading) {
                return <CircleLoader />;
        }

        if (error) {
                return <DisplayError errorMessage={error?.message} />;
        }

        if (usersError) {
                typeof filters
                return <DisplayError errorMessage={usersError?.message} />;
        }


        return (
                <div {...props}>
                        {/* Render Report Form for Filtering */}
                        {usersData && (
                                <ReportForm
                                        users={usersData?.data?.users || []}
                                />
                        )}

                        {/* Render Task Report */}
                        {data?.data?.tasksData && (
                                <TaskReport tasksData={data?.data?.tasksData} />
                        )}
                </div>
        );
};

export default Page;
