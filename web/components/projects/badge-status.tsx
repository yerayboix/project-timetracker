import { Badge } from "@/components/ui/badge";

type ProjectStatus = 'not_started' | 'in_progress' | 'paused' | 'completed' | 'cancelled'

export default function BadgeStatus({ status }: { status: ProjectStatus }) {
    const statusMap: Record<ProjectStatus, string> = {
        not_started: 'No comenzado',
        in_progress: 'En progreso',
        paused: 'Pausado',
        completed: 'Completado',
        cancelled: 'Cancelado',
    }
    
    switch (status) {
        case 'not_started':
            return (
                <Badge variant="outline" className="rounded-full border-none bg-amber-600/10 text-amber-600 focus-visible:ring-amber-600/20 focus-visible:outline-none dark:bg-amber-400/10 dark:text-amber-400 dark:focus-visible:ring-amber-400/40 [a&]:hover:bg-amber-600/5 dark:[a&]:hover:bg-amber-400/5">
                    <span className='size-1.5 rounded-full bg-amber-600 dark:bg-amber-400' aria-hidden='true' />
                    {statusMap[status]}
                </Badge>
            )
        case 'in_progress':
            return (
                <Badge variant="outline" className="rounded-full border-none bg-blue-600/10 text-blue-600 focus-visible:ring-blue-600/20 focus-visible:outline-none dark:bg-blue-400/10 dark:text-blue-400 dark:focus-visible:ring-blue-400/40 [a&]:hover:bg-blue-600/5 dark:[a&]:hover:bg-blue-400/5">
                    <span className='size-1.5 rounded-full bg-blue-600 dark:bg-blue-400' aria-hidden='true' />
                    {statusMap[status]}
                </Badge>
            )
        case 'paused':
            return (
                <Badge variant="outline" className="rounded-full border-none bg-gray-600/10 text-gray-600 focus-visible:ring-gray-600/20 focus-visible:outline-none dark:bg-gray-400/10 dark:text-gray-400 dark:focus-visible:ring-gray-400/40 [a&]:hover:bg-gray-600/5 dark:[a&]:hover:bg-gray-400/5">
                    <span className='size-1.5 rounded-full bg-gray-600 dark:bg-gray-400' aria-hidden='true' />
                    {statusMap[status]}
                </Badge>
            )
        case 'completed':
            return (
                <Badge variant="outline" className="rounded-full border-none bg-emerald-600/10 text-emerald-600 focus-visible:ring-emerald-600/20 focus-visible:outline-none dark:bg-emerald-400/10 dark:text-emerald-400 dark:focus-visible:ring-emerald-400/40 [a&]:hover:bg-emerald-600/5 dark:[a&]:hover:bg-emerald-400/5">
                    <span className='size-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400' aria-hidden='true' />
                    {statusMap[status]}
                </Badge>
            )
        case 'cancelled':
            return (
                <Badge variant="outline" className="bg-red-600/10 [a&]:hover:bg-red-600/5 focus-visible:ring-red-600/20 dark:focus-visible:ring-red-600/40 text-red-600 rounded-full border-none focus-visible:outline-none">
                    <span className='bg-red-600 size-1.5 rounded-full' aria-hidden='true' />
                    {statusMap[status]}
                </Badge>
            )
    }
}