"use client"

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Project } from "@/lib/db/schema/project";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { FolderKanban, Trash2 } from "lucide-react";
import Link from "next/link";

export default function ProjectsList() {
    const trpc = useTRPC();
    const projects = useQuery(trpc.project.listByCurrentUser.queryOptions());

    if (projects.isLoading) {
        return <div>Loading...</div>;
    }

    if (projects.isError) {
        return <div>Error loading projects</div>;
    }

    if (!projects.data || projects.data.length === 0) {
        return <div>No projects found</div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.data.map(project => (
                <ProjectCard key={project.id} project={project} />
            ))}
        </div>
    )
}

const ProjectCard = ({ project }: { project: Project }) => {
    return (
        <div className="relative group">
            <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 z-10 h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                title="Eliminar proyecto"
                onClick={(e) => {
                    e.preventDefault(); // Prevent Link navigation
                    // Logic to delete the project
                    console.log("Eliminar proyecto:", project.id);
                }}
            >
                <Trash2 className="h-4 w-4" />
            </Button>

            <Link href={`/projects/${project.id}`} className="block h-full">
                <Card className="hover:shadow-md transition-all duration-200 flex flex-col h-full">
                    <CardHeader>
                        <div className="flex items-start gap-2">
                            <div className="bg-primary/10 p-2 rounded-md">
                                <FolderKanban className="h-5 w-5 text-primary" />
                            </div>
                            <div className="flex-1 pr-6">
                                <CardTitle className="text-lg font-semibold line-clamp-1">{project.name}</CardTitle>
                                <CardDescription className="line-clamp-2 mt-1 text-sm text-muted-foreground">
                                    {project.description || "Sin descripción"}
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex w-full flex-wrap gap-2">
                            <Badge variant="secondary">
                                <b>Estimadas:</b> {project.estimatedHours || "0"} horas
                            </Badge>
                            <Badge variant="secondary">
                                <b>Precio/h:</b> {project.hourlyRate || "0"} €
                            </Badge>
                            <Badge variant="secondary">
                                <b>Realizadas:</b> {project.estimatedHours || "0"} horas
                            </Badge>
                        </div>
                    </CardContent>
                </Card>
            </Link>
        </div>
    )
}