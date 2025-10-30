import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Timer } from "lucide-react";

export default function AddTimetracker() {
    return (
        <Card className="p-4">
            <div className="flex items-center justify-between gap-2">
                <div className="bg-primary/10 p-2 rounded-md">
                    <Timer className="h-5 w-5 text-primary" />
                </div>
                <div className="w-full flex flex-row gap-2">
                    <Input placeholder="Descripción de la tarea..." />
                    <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Proyecto" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Proyectos</SelectLabel>
                                <SelectItem value="apple">Apple</SelectItem>
                                <SelectItem value="banana">Banana</SelectItem>
                                <SelectItem value="blueberry">Blueberry</SelectItem>
                                <SelectItem value="grapes">Grapes</SelectItem>
                                <SelectItem value="pineapple">Pineapple</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Tipo" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Tipos</SelectLabel>
                                <SelectItem value="d">Desarrollo</SelectItem>
                                <SelectItem value="o">Diseño</SelectItem>
                                <SelectItem value="blueberry">Mantenimiento</SelectItem>
                                <SelectItem value="grapes">Debugging</SelectItem>
                                <SelectItem value="pineapple">Reuniones</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Tarea" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Tareas</SelectLabel>
                                <SelectItem value="d">Creación login</SelectItem>
                                <SelectItem value="o">Fixear UI Dashboard</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <div className="bg-primary/10 rounded-md justify-center items-center flex p-1">
                        <span>00:00:00</span>
                    </div>
                </div>
                <Button>Empezar</Button>
            </div>
        </Card>
    )
}