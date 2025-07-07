import React, { memo } from "react";
import { useListTrajectories } from "@/hooks/useTrajectories";
import Link from "next/link";
import { usePathname } from "next/navigation";
import cx from "classnames";
import { CheckCircle, Clock, AlertCircle, XCircle } from "lucide-react";
import { Skeleton } from "@/components/common/atoms/skeleton";

const SidebarRuns = memo(() => {
  const pathname = usePathname();
  const { data: trajectories, isLoading: loading } = useListTrajectories();

  // Get the most recent 5 trajectories, sorted by start_time descending
  const recentTrajectories = trajectories
    ? trajectories
        .sort((a, b) => new Date(b.start_time).getTime() - new Date(a.start_time).getTime())
        .slice(0, 5)
    : [];

  // Helper function to get status icon and color
  const getStatusDisplay = (status?: string) => {
    switch (status) {
      case 'completed':
        return { icon: CheckCircle, color: 'text-h-green', label: 'Completed' };
      case 'running':
        return { icon: Clock, color: 'text-blue-500', label: 'Running' };
      case 'failed':
        return { icon: XCircle, color: 'text-red-500', label: 'Failed' };
      case 'timed_out':
        return { icon: AlertCircle, color: 'text-yellow-500', label: 'Timed Out' };
      default:
        return { icon: Clock, color: 'text-gray-5', label: 'Pending' };
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col flex-grow overflow-hidden">
        {(loading || (!loading && recentTrajectories.length > 0)) && (
          <div className="flex justify-between items-center pl-2 pr-1 h-9">
            <p className="text-14-medium-heading text-gray-6">Recent runs</p>
          </div>
        )}
        <div
          className="overflow-y-auto flex-grow hide-scrollbar"
          style={{
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}
        >
          <div className="pb-4 flex flex-col gap-y-1">
            {loading ? (
              // Skeleton loaders
              Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="relative w-full rounded-sm flex flex-row items-center pl-2 pr-1 h-9"
                >
                  <Skeleton className="w-4 h-4 flex-shrink-0" />
                  <Skeleton className="ml-1.5 h-4 flex-grow max-w-[180px]" />
                </div>
              ))
            ) : recentTrajectories.length > 0 ? (
              recentTrajectories.map((trajectory) => {
                const statusDisplay = getStatusDisplay(trajectory.status);
                const StatusIcon = statusDisplay.icon;
                const isCurrent = pathname === `/surfer-view/${trajectory.trajectory_id}`;

                return (
                  <Link
                    key={trajectory.trajectory_id}
                    href={`/surfer-view/${trajectory.trajectory_id}`}
                    className={cx(
                      "relative w-full rounded-sm flex flex-row items-center pl-2 pr-1 h-9 group",
                      {
                        "bg-gray-3": isCurrent,
                        "hover:bg-gray-2": !isCurrent,
                      }
                    )}
                  >
                    <StatusIcon className={`w-4 h-4 ${statusDisplay.color} flex-shrink-0`} />
                    <p className="truncate ml-1.5 text-14-medium-heading text-gray-8">
                      {trajectory.task || 'Untitled run'}
                    </p>
                  </Link>
                );
              })
            ) : (
              <div className="flex flex-col items-center justify-center text-center p-4">
                <p className="text-14-regular-body text-gray-6">No runs yet</p>
                <p className="text-12-regular-body text-gray-5 mt-1">Your recent runs will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

SidebarRuns.displayName = "SidebarRuns";

export default SidebarRuns;
