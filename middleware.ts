import { request } from "http";
import { url } from "inspector";
import { NextRequest, NextResponse, userAgent } from "next/server";
const urls = ["/profile", "/auth"];
export function middleware(request: NextRequest) {
    const { device } = userAgent(request);
    const url = request.nextUrl.clone();
    const isToken = request.cookies.get("t");

    if (device.type === "mobile") {
        const url = request.nextUrl.clone();
        if (urls.some((item: string) => url.pathname.startsWith(item))) {
            url.pathname = "/m" + url.pathname;
            return NextResponse.redirect(new URL(url.pathname, request.url));
        }
    }
    
    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
