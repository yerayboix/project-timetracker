"use client"

import BadgeStatus from "@/components/projects/badge-status";
import { Badge } from "@/components/ui/badge";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Project } from "@/lib/db/schema/project";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { FolderKanban } from "lucide-react";
import Link from "next/link";
import ProjectSkeleton from "./project-skeleton";
import { ProjectEmpty } from "./project-empty";

export default function ProjectsList() {
    const trpc = useTRPC();
    const projects = useQuery({
        ...trpc.project.listByCurrentUser.queryOptions(),
        staleTime: 1000 * 60, // 1 minute
    });

    if (projects.isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(6)].map((_, index) => (
                    <ProjectSkeleton key={index} />
                ))}
            </div>
        );
    }

    if (projects.isError) {
        return <div>Error loading projects</div>;
    }

    if (!projects.data || projects.data.length === 0) {
        return <ProjectEmpty />;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
            {projects.data.map(project => (
                <ProjectCard key={project.id} project={project} />
            ))}
        </div>
    )
}

const ProjectCard = ({ project }: { project: Project }) => {
    return (
        <div className="relative group">
            <Link href={`/projects/${project.id}`} className="block h-full">
                <Card className="hover:shadow-lg transition-all duration-200 flex flex-col h-full">
                    <CardHeader>
                        <div className="flex items-start gap-2">
                            <div className="bg-primary/10 p-2 rounded-md">
                                <FolderKanban className="h-5 w-5 text-primary" />
                            </div>
                            <div className="flex-1 pr-6">
                                <CardTitle className="text-lg font-semibold line-clamp-1">{project.name}</CardTitle>
                            </div>
                        </div>
                        <CardAction>
                            <BadgeStatus status={project.status} />
                        </CardAction>
                        <CardDescription className="line-clamp-2 mt-1 text-sm text-muted-foreground">
                            {project.description || "Sin descripción"}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex w-full flex-wrap gap-2">
                            <Badge variant="outline">
                                <b>Estimadas:</b> {project.estimatedHours || "0"} horas
                            </Badge>
                            <Badge variant="outline">
                                <b>Precio/h:</b> {project.hourlyRate || "0"} €
                            </Badge>
                            <Badge variant="outline">
                                <b>Realizadas:</b> {project.estimatedHours || "0"} horas
                            </Badge>
                        </div>
                    </CardContent>
                </Card>
            </Link>
        </div>
    )
}