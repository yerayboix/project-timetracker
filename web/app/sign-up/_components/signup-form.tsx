"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

const signupSchema = z.object({
    fullname: z.string().min(2, "El nombre completo debe tener al menos 2 caracteres").max(100, "El nombre completo no debe exceder los 100 caracteres"),
    email: z.string().email("Correo electrónico inválido"),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres").regex(/[A-Z]/, "La contraseña debe contener al menos una letra mayúscula").regex(/[a-z]/, "La contraseña debe contener al menos una letra minúscula").regex(/[0-9]/, "La contraseña debe contener al menos un número").regex(/[^A-Za-z0-9]/, "La contraseña debe contener al menos un carácter especial"),
    confirmPassword: z.string().min(6, "La confirmación de la contraseña debe tener al menos 6 caracteres").regex(/[A-Z]/, "La confirmación de la contraseña debe contener al menos una letra mayúscula").regex(/[a-z]/, "La confirmación de la contraseña debe contener al menos una letra minúscula").regex(/[0-9]/, "La confirmación de la contraseña debe contener al menos un número").regex(/[^A-Za-z0-9]/, "La confirmación de la contraseña debe contener al menos un carácter especial"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"]
});

type SignUpSchema = z.infer<typeof signupSchema>;

export function SignupForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const form = useForm<SignUpSchema>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            fullname: "",
            email: "",
            password: "",
            confirmPassword: "",
        }
    });

    function onSubmit(values: SignUpSchema) {
        console.log(values);
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Crear una cuenta</CardTitle>
                    <CardDescription>
                        Regístrate con tu cuenta de Google
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FieldGroup>
                                <Field>
                                    <Button variant="outline" type="button">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                            <path
                                                d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                                                fill="currentColor"
                                            />
                                        </svg>
                                        Registrarse con Google
                                    </Button>
                                </Field>
                                <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                                    O continúa con
                                </FieldSeparator>
                                <FormField control={form.control} name="fullname"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nombre completo</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Juan Pérez" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />

                                <FormField control={form.control} name="email" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Correo electrónico</FormLabel>
                                        <FormControl>
                                            <Input placeholder="juanperez@ejemplo.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />

                                <FormField control={form.control} name="password" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Contraseña</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="********" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />

                                <FormField control={form.control} name="confirmPassword" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Repetir contraseña</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="********" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <Field>
                                    <Button type="submit">Crear cuenta</Button>
                                    <FieldDescription className="text-center">
                                        ¿Ya tienes una cuenta? <a href="/sign-in">Inicia sesión</a>
                                    </FieldDescription>
                                </Field>
                            </FieldGroup>
                        </form>
                    </Form>
                </CardContent>
            </Card>
            <FieldDescription className="px-6 text-center">
                Al continuar, aceptas nuestros <a href="#">Términos de Servicio</a>{" "}
                y <a href="#">Política de Privacidad</a>.
            </FieldDescription>
        </div>
    )
}
