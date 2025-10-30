"use client"
import * as React from "react"
import {
  Folder,
  FolderPlus,
  Frame,
  LayoutDashboard,
  Map,
  PieChart,
  Timer,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Button } from "./ui/button"
import { toast } from "sonner"
import { useTRPC } from "@/trpc/client"
import { useMutation, useQueryClient } from "@tanstack/react-query"


const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Proyectos",
      url: "/projects",
      icon: Folder,
    },
    {
      title: "Timetracker",
      url: "/timetracker",
      icon: Timer,
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

export default function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2 font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <Timer className="size-4" />
          </div>
          Project Timetracker
        </div>
      </SidebarHeader>
      <SidebarContent>
        <CreateProjectButton />
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={props.session.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

const CreateProjectButton = () => {
  const [isOpen, setIsOpen] = React.useState(false)
  return (
    <SidebarMenuItem className="p-2">
      <SidebarMenuButton
        tooltip="Quick Create"
        className="bg-primary cursor-pointer text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
        onClick={() => setIsOpen(true)}
      >
        <FolderPlus className="size-4" />
        <span>Nuevo proyecto</span>
      </SidebarMenuButton>
      <CreateProjectDialog isOpen={isOpen} onOpenChange={setIsOpen} />
    </SidebarMenuItem>
  )
}

const formSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  description: z.string().optional(),
  color: z.string().optional(),
  hourlyRate: z.number().optional(),
  estimatedHours: z.number().optional(),
});

type FormSchema = z.infer<typeof formSchema>;

const CreateProjectDialog = ({ isOpen, onOpenChange }: { isOpen: boolean, onOpenChange: (open: boolean) => void }) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const createProjectMutation = useMutation({
    ...trpc.project.create.mutationOptions(),
    onSuccess: () => {
      toast.success(`Proyecto "${form.getValues("name")}" creado de forma correcta.`);
      form.reset();
      queryClient.invalidateQueries(
        {
          queryKey: [['project', 'listByCurrentUser']],
        }
      );
      onOpenChange(false);
    },
    onError: (error) => {
      toast.error(`Error al crear proyecto: ${error.message}`);
    },
  });
  
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      color: '#000000',
      hourlyRate: 0,
      estimatedHours: 0,
    },
  });

  const onSubmit = (values: FormSchema) => {
    createProjectMutation.mutate({
      name: values.name,
      description: values.description,
      color: values.color,
      hourlyRate: values.hourlyRate ? Number(values.hourlyRate) : 0,
      estimatedHours: values.estimatedHours ? Number(values.estimatedHours) : 0,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nuevo proyecto</DialogTitle>
          <DialogDescription>
            Aquí podrás crear un nuevo proyecto para organizar tus tareas y actividades.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre del proyecto</FormLabel>
                  <FormControl>
                    <Input placeholder="Project Timetracker" {...field} />
                  </FormControl>
                  <FormDescription>
                    Este es el nombre que se mostrará en la lista de proyectos.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Descripción del proyecto..." {...field} />
                  </FormControl>
                  <FormDescription>
                    Esta es la descripción que se mostrará en la lista de proyectos.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-row gap-4">
              <FormField
                control={form.control}
                name="estimatedHours"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Horas estimadas</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="100" onChange={(e) => field.onChange(Number(e.target.value))} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="hourlyRate"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Precio por hora (€)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="50" onChange={(e) => field.onChange(Number(e.target.value))} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="mt-10">
              <Button type="submit" disabled={createProjectMutation.isPending}>
                {createProjectMutation.isPending ? 'Creando...' : 'Crear Proyecto'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}