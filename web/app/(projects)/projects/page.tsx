import { HydrateClient, prefetch, trpc } from "@/trpc/server";
import ProjectBreadcrumb from "./breadcrum";
import ProjectsList from "./_components/projects-list";

export default async function ProjectsPage() {
  void await prefetch(
    trpc.project.listByCurrentUser.queryOptions()
  )
  return (
    <>
      <ProjectBreadcrumb />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <HydrateClient>
          <ProjectsList />
        </HydrateClient>
      </div>
    </>
  )
}