import { Timer, ToyBrick } from "lucide-react"

import { SignInForm } from "@/app/sign-in/_components/signin-form"

export default function LoginPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <Timer  className="size-4"/>
          </div>
          Project Timetracker
        </a>
        <SignInForm />
      </div>
    </div>
  )
}
