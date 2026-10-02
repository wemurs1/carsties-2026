import {NextRequest, NextResponse} from "next/server";
import {getSessionCookie} from "better-auth/cookies";

export function proxy(request: NextRequest) {
    const sessionCookie = getSessionCookie(request);

    if (!sessionCookie) {
        const signInUrl = new URL("/auth/sign-in", request.url);
        signInUrl.searchParams.set("callbackUrl", request.nextUrl.pathname + request.nextUrl.search);

        return NextResponse.redirect(signInUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/session']
}