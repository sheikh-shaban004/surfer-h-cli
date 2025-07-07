import HomepageContainer from "@/components/Home/homepage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Surfer H",
  description: "Surf the web with an autonomous Web Agent",
};

export default function IndexPage() {
  return (
    <main className="flex flex-col h-full w-full p-4">
      <HomepageContainer />
    </main>
  );
}
