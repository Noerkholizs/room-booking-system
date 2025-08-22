"use client";

import { LogOut } from "lucide-react";
import { DottedSeparator } from "@/components/dotted-separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// import { useLogout } from "../api/use-logout";
// import { useCurrent } from "../api/use-current";
import { clearStoredUser, getStoredUser } from "@/lib/auth";
import { useRouter } from "next/navigation";

export const UserButton = () => {
    const router = useRouter();
    // const { data: user, isLoading } = useCurrent();
    // const { mutate: logout } = useLogout();
    const handleLogout = () => {
        clearStoredUser()
        router.push('/login')
    }

    const user = getStoredUser();
    

    // if (isLoading) {
    //     return (
    //         <div className="size-10 rounded-full flex items-center justify-center bg-neutral-200 border-neutral-300">
    //             <Loader className="siz3-4 animate-spin text-muted-foreground"/>
    //         </div>
    //     )
    // }

    if (!user) {
        return null;
    }

    const { name, email } = user;

    const avatarFallback = name
        ? name.charAt(0).toUpperCase()
        : name.charAt(0).toUpperCase() ?? "U"

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger className="outline-none relative">
                <Avatar className="size-10 hover:opacity-75 transtion border border-neutral-300">
                    <AvatarFallback className="bg-neutral-200 font-medium text-blue-500 flex items-center justify-center">
                        {avatarFallback}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" side="bottom" className="w-60" sideOffset={10}>
                <div className="flex flex-col items-center justify-center gap-2 px-2.5 py-4">
                    <Avatar className="size-[52px] transtion border border-neutral-300">
                        <AvatarFallback className="bg-neutral-200 text-xl font-medium text-neutral-500 flex items-center justify-center">
                            {avatarFallback}
                        </AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col items-center justify-center">
                        <p className="text-sm font-medium text-neutral-900">{name || "User"}</p>
                        <p className="text-xs text-neutral-500">{email}</p>  
                    </div>
                </div>

                <DottedSeparator className="mb-1" />

                <DropdownMenuItem 
                    onClick={handleLogout}
                    className="h-10 flex items-center justify-center text-amber-300 font-medium cursor-pointer">
                    <LogOut className="size-4 mr-2" />
                        Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

