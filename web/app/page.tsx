import { HydrateClient, prefetch, trpc } from "@/trpc/server";
import { Suspense } from "react";
import {ClientGreeting} from "./client-greetings";

export default async function Home() {
  prefetch(
    trpc.hello.queryOptions({ text: "world" }),
  )
  return (
    <HydrateClient>
      <div>This rendered on server</div>
      <ClientGreeting />
    </HydrateClient>
  );
}
