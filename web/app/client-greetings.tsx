'use client';
import { useTRPC } from '@/trpc/client';
import { useQuery } from '@tanstack/react-query';

export function ClientGreeting() {
  const trpc = useTRPC();
  const projects = useQuery(trpc.project.list.queryOptions({ ownerId: '1' }));
  
  if (projects.isLoading) {
    return <div>Loading...</div>;
  }
  
  if (projects.isError) {
    return <div>Error loading projects</div>;
  }
  
  if (!projects.data || projects.data.length === 0) {
    return <div>No hay proyectos</div>;
  }
  
  return (
    <div>
      {projects.data.map(project => (
        <div key={project.id}>{project.name}</div>
      ))}
    </div>
  );
}