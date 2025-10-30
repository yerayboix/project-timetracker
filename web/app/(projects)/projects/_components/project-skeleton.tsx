import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectSkeleton() {
    return (
        <div className="flex flex-col space-y-3 border border-gray-200 p-4 rounded-xl shadow-md">
            <Skeleton className="h-[125px] w-full rounded-xl" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
            </div>
        </div>
    )
}