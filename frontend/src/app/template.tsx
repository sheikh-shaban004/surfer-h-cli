"use client";
import Sidebar from "@/components/common/organisms/sidebar";
import HContainer from "@/components/common/templates/h-container";
import React from "react";

export default function Template({ children }: { children: React.ReactNode }) {

  return <HContainer leftComponent={<Sidebar />}>{children}</HContainer>;
}
