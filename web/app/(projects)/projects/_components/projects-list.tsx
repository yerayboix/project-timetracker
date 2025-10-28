"use client"

import { Button } from "@/components/ui/button";
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight, FolderKanban } from "lucide-react";

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
        <div>
            {projects.data.map(project => (
                <Item key={project.id} className="mb-2" variant="outline">
                    <ItemMedia variant="icon">
                        <FolderKanban />
                    </ItemMedia>
                    <ItemContent>
                        <ItemTitle>{project.name}</ItemTitle>
                        <ItemDescription>{project.description}</ItemDescription>
                    </ItemContent>
                    <ItemContent>
                        <ItemContent className="flex-none text-left">
                            <ItemDescription>Estimadas: {project.estimatedHours || 0} horas</ItemDescription>
                        </ItemContent>
                        <ItemContent className="flex-none text-left">
                            <ItemDescription>Precio/hora: {project.hourlyRate || 0} €</ItemDescription>
                        </ItemContent>
                    </ItemContent>
                    <ItemActions>
                        <Button variant="default"><ChevronRight /></Button>
                        <Button variant="destructive">Eliminar</Button>
                    </ItemActions>
                </Item>
            ))}
        </div>
    )
}