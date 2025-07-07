"use client"

import * as React from "react"
import { cn } from "@/utils"

export interface LabeledInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  containerClassName?: string;
}

const LabeledInput = React.forwardRef<HTMLInputElement, LabeledInputProps>(
  ({ className, label, containerClassName, ...props }, ref) => {
    return (
      <div className={cn("", containerClassName)}>
        <label className="block text-14-regular-body text-gray-7 mb-2">
          {label}
        </label>
        <input
          className={cn(
            "w-full p-2 border border-gray-3 rounded-md bg-gray-1 text-14-regular-body focus:outline-none focus:ring-1 focus:ring-h-green",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)
LabeledInput.displayName = "LabeledInput"

export { LabeledInput } 