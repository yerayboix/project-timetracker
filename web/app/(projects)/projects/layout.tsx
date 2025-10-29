import AppSidebar from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function ProjectLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    if (!session) {
        return <div>Please log in to access the dashboard.</div>
    }
    return (
        <SidebarProvider>
            <AppSidebar variant="inset" session={session} />
            <SidebarInset>
                {children}
            </SidebarInset>
        </SidebarProvider>
    )
}
