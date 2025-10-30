import { ArrowUpRightIcon, FolderIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

export function ProjectEmpty() {
  return (
    <Empty className="justify-start">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FolderIcon />
        </EmptyMedia>
        <EmptyTitle>No tienes proyectos</EmptyTitle>
        <EmptyDescription>
          Aún no tienes proyectos. ¡Crea tu primer proyecto!
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}
