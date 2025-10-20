import { HydrateClient, prefetch, trpc } from "@/trpc/server";
import { Suspense } from "react";
import {ClientGreeting} from "./client-greetings";

export default async function Home() {
  void await prefetch(
    trpc.project.getById.queryOptions({ projectId: "1" }),
  )
  return (
    <HydrateClient>
      <div>This rendered on server</div>
      <ClientGreeting />
    </HydrateClient>
  );
}
