"use client"

import * as React from "react"
import { cn } from "@/utils"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/common/atoms/select";

export interface LabeledSelectProps {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  options: { value: string; label: string }[];
  className?: string;
  selectClassName?: string;
}

function LabeledSelect({ 
  label, 
  value, 
  onValueChange, 
  options, 
  className, 
  selectClassName 
}: LabeledSelectProps) {
  return (
    <div className={cn("flex items-center justify-between p-4 border border-gray-3 rounded-md", className)}>
      <div className="flex flex-col">
        <label className="text-14-medium-body text-gray-8">{label}</label>
      </div>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className={cn("w-[140px]", selectClassName)}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

LabeledSelect.displayName = "LabeledSelect"

export { LabeledSelect } 