"use client"

import {
    CarFront, ChevronDown,
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
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {authClient} from "@/lib/auth-client";
import {SessionUser} from "@/lib/auth";

type Props = {
    user: SessionUser
}

export function UserMenu({user}: Props) {
    const router = useRouter();
    const pathName = usePathname();
    const searchParams = useSearchParams();

    const setParams = (key: 'seller' | 'winner', value: string) => {
        const params = new URLSearchParams(searchParams);

        if (key === "seller" && params.has("winner")) params.delete("winner");
        if (key === "winner" && params.has("seller")) params.delete("seller");

        params.set(key, value);
        params.set('pageNumber', '1');

        const dest = pathName === '/' ? pathName : '/';

        router.push(`${dest}?${params.toString()}`);
    }

    const signOut = () => {
        void authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
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
                    <ChevronDown/>
                </Button>
            }/>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setParams('seller', user.username)}>
                    <UserIcon/>
                    My Auctions
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setParams('winner', user.username)}>
                    <Trophy/>
                    Auctions Won
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link href="/listings/create" className='flex gap-2 items-center">'>
                        <CarFront/>
                        Sell My Car
                    </Link>
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
