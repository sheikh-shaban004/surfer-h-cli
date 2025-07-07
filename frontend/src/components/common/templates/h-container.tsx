import React from "react";

interface HContainerProps {
  leftComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
}

export default function HContainer({
  leftComponent,
  children,
}: HContainerProps & { children?: React.ReactNode }) {
  return (
    <div className="flex h-full bg-gray-1 relative overflow-hidden">
      {leftComponent}

      <div className="flex-1 p-0 md:pr-4 md:pt-4 md:pb-4 overflow-hidden md:h-full">
        <div className="h-full  w-full md:rounded-sm md:border md:border-gray-3 flex flex-col overflow-y-auto scrollbar-hide">
          {children}
        </div>
      </div>
    </div>
  );
}
