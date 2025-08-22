
import { ReactNode } from "react";

interface AuthLayoutProps {
    children: ReactNode;   
}

const AuthLayout = ({ children } : AuthLayoutProps) => {
    return (
        <main className="bg-neutral-100 min-h-screen">
            <div className="mx-auto max-w-lg p-4">
                {/* <nav className="flex justify-between items-center">
                    <Image src="/logo.svg" height={56} width={152} alt="Logo" />
                    <Button variant="secondary">
                        <Link href={isSignIn ? "/sign-up" : "/sign-in"}>
                            {isSignIn ? "Sign Up" : "Login"}
                        </Link>
                    </Button>
                </nav> */}
                <div className="flex flex-col items-center justify-center pt-4 md:pt-14">
                    {children}
                </div>
            </div>
        </main>
    )
}

export default AuthLayout;