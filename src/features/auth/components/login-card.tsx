"use client";

import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { FcGoogle } from "react-icons/fc";
import { DottedSeparator } from "@/components/dotted-separator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"

import { loginSchema } from "../server/schema";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useLogin } from "../api/use-login";


export const LoginCard = () => {

    const { mutate: login, isPending } = useLogin()
    
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    });

    const onSubmit = (values: z.infer<typeof loginSchema>) => {
        login(values);
        console.log({values})
    }

    return (
        <Card className="w-full h-full md:[487px] border-none shadow-none">
            <CardHeader className="flex items-center justify-center text-center p-7">
                <CardTitle className="text-2xl">
                    LOGIN
                </CardTitle>
            </CardHeader>

            <div className="px-7">
                <DottedSeparator />
            </div>

            <CardContent className="px-7">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                        <FormField 
                            name="email"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input 
                                            {...field}
                                            id="email"
                                            type="email"
                                            disabled={isPending}
                                            placeholder="Enter your email adress"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField 
                            name="password"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input 
                                            {...field}
                                            id="password"
                                            type="password"
                                            disabled={isPending}
                                            placeholder="Enter your password"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" size="lg" className="w-full" variant="primary">
                            Login
                        </Button>
                    </form>
                </Form>
            </CardContent>

            <div className="px-7">
                <DottedSeparator />
            </div>

            <CardContent className=" flex flex-col gap-y-4">
                <Button
                    disabled={isPending}
                    variant="secondary"
                    size="lg"
                    className="w-full bg-neutral-200"
                >
                    <FcGoogle className="mr-2 size-5"/>
                    Login with Google
                </Button>
                {/* <Button
                    disabled={isPending}
                    variant="secondary"
                    size="lg"
                    className="w-full"
                >
                    <FaGithub className="mr-2 size-5"/>
                    Login with GitHub
                </Button> */}
            </CardContent>
            <div className="px-7">
                <DottedSeparator />
            </div>
            <CardContent className=" flex items-center justify-center">
                <p>
                    Already have an account?
                    <Link href="/sign-up">
                        <span className="text-blue-700">&nbsp;Sign Up</span>
                    </Link>
                </p>
            </CardContent>
        </Card>
    )   
}