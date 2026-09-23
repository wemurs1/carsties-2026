'use client';

import {Button} from "@/components/ui/button";
import {auth} from "@/lib/auth";
import {authClient} from "@/lib/auth-client";

export default function LoginButton() {
    return (
        <Button
            variant="outline"
            size="lg"
            onClick={()=>authClient.signIn.oauth2({
                providerId: "duende",
                callbackURL: '/session',
            })}
        >Login</Button>
    );
}