import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function DashboardPage() {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    if (!session) {
        // This should never happen because of the middleware
        return <div>Acceso denegado</div>;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="mt-2">Bienvenido de nuevo {session.user?.name}</p>
        </div>
    )
}