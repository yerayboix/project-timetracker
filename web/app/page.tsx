import { HydrateClient, prefetch, trpc } from "@/trpc/server";
import { ClientGreeting } from "./client-greetings";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers()
  })
  if (!session) {
    return <div>Please log in to access the dashboard.</div>
  }
  void await prefetch(
    trpc.project.getById.queryOptions({ projectId: "1" }),
  );

  return (
    <HydrateClient>
      <div>This rendered on server</div>
      <ClientGreeting session={session} />
    </HydrateClient>
  );
}
