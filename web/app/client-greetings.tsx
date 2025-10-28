'use client';
import { useTRPC } from '@/trpc/client';
import { useQuery, useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { authClient } from '@/lib/auth-client';

export function ClientGreeting({...props}) {
  const trpc = useTRPC();
  
  const ownerId = props.session.user.id
  
  const projects = useQuery(trpc.project.listByCurrentUser.queryOptions());

  const createProjectMutation = useMutation({
    ...trpc.project.create.mutationOptions(),
    onSuccess: () => {
      toast.success('Proyecto creado exitosamente');
      projects.refetch();
    },
    onError: (error) => {
      toast.error(`Error al crear proyecto: ${error.message}`);
    }
  });
  
  function createProject() {
    if (!ownerId) {
      toast.error('Debes iniciar sesión');
      return;
    }
    createProjectMutation.mutate({
      name: 'Nuevo Proyecto',
      description: 'Descripción del proyecto',
      color: '#FF5733',
    });
  }
  
  if (projects.isLoading) {
    return <div>Loading...</div>;
  }
  
  if (projects.isError) {
    return <div>Error loading projects</div>;
  }
  
  if (!projects.data || projects.data.length === 0) {
    return (
      <div>
        <button 
          onClick={createProject}
          disabled={createProjectMutation.isPending}
          className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          {createProjectMutation.isPending ? 'Creando...' : 'Crear Proyecto'}
        </button>
        <div>No hay proyectos</div>
      </div>
    );
  }
  
  return (
    <div>
      <button 
        onClick={createProject}
        disabled={createProjectMutation.isPending}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        {createProjectMutation.isPending ? 'Creando...' : 'Crear Proyecto'}
      </button>
      
      {createProjectMutation.isError && (
        <div className="text-red-500 mb-4">
          Error: {createProjectMutation.error.message}
        </div>
      )}
      
      {createProjectMutation.isSuccess && (
        <div className="text-green-500 mb-4">
          ¡Proyecto creado exitosamente!
        </div>
      )}
      
      {projects.data.map(project => (
        <div key={project.id}>{project.name}</div>
      ))}
    </div>
  );
}