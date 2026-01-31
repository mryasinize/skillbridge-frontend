import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export default async function proxy(req: NextRequest) {
    const token = (await cookies()).get('token')?.value

    if (!token) {
        return NextResponse.redirect(new URL('/login', req.nextUrl))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/dashboard/:path*'],
}
