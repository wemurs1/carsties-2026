"use client"

import {
    CarFront,
    LogOutIcon,
    SettingsIcon, Trophy,
    UserIcon,
} from "lucide-react"

import {Button} from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {User} from "better-auth";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {authClient} from "@/lib/auth-client";

type Props = {
    user: User
}

export function UserMenu({user}: Props) {
    const router = useRouter()
    
    const signOut = () => {
        void authClient.signOut({
            fetchOptions: {
                onSuccess: ()=>{
                    router.push("/");
                    router.refresh();
                }
            }
        })
    }
    
    return (
        <DropdownMenu>
            <DropdownMenuTrigger render={
                <Button variant="outline">
                   {user.name}
                </Button>
            }/>
            <DropdownMenuContent>
                <DropdownMenuItem>
                    <UserIcon/>
                    My Auctions
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Trophy/>
                    Auctions Won
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <CarFront/>
                    Sell My Car
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link href='/session' className='flex gap-2 items-center'>
                        <SettingsIcon/>
                        Session
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator/>
                <DropdownMenuItem onClick={signOut} variant="destructive">
                    <LogOutIcon/>
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
