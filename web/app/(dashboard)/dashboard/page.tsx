import { auth } from "@/lib/auth"
import { headers } from "next/headers"

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers()
  })
  if (!session) {
    return <div>Please log in to access the dashboard.</div>
  }

  return (
    <>DashboardPage</>
  )
}
