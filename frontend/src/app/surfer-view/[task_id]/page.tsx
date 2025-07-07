"use client";

import { useParams } from "next/navigation";
import SurferView from "@/components/SurferH/surfer-view";

export default function SurferViewPage() {
  const params = useParams();
  const trajectoryId = params.task_id as string;

  return (
      <SurferView taskId={trajectoryId} />
  );
}
