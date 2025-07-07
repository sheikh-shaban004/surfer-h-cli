"use client"

import * as React from "react"
import { cn } from "@/utils"

export interface SettingsSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

function SettingsSection({ title, children, className }: SettingsSectionProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <h3 className="text-16-medium-heading text-gray-8">{title}</h3>
      {children}
    </div>
  )
}

SettingsSection.displayName = "SettingsSection"

export { SettingsSection } 