import { createFileRoute } from "@tanstack/react-router";
import { Experience } from "@/components/Experience";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <Experience />;
}
