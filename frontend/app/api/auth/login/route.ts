import { cookies } from "next/headers";
import { NextResponse } from "next/server"



const API_URL = process.env.BACKEND_URL
export async function POST(req: Request) {
    try {
        const body = await req.json()

        if (!API_URL) {
            throw new Error("BACKEND_URL is not defined in environment variables");
        }


        const res = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        
        const data = await res.json()

        
        
        
        
        if (!res.ok) {
            return NextResponse.json(
                { message: data.message || 'Failed to login' }, 
                { status: res.status }
            );
        }   
        
        if (data.access_token) {
            const cookieStore = await cookies();
            cookieStore.set('token', data.access_token, {
              httpOnly: true, 
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'lax',
              path: '/',
              maxAge: 60 * 60 * 24,
            });
          }

        return NextResponse.json(data, {status: res.status})
    } catch (error) {
        console.log(error)
        return new Response('Internal Server Error', {
            status: 500
        })
    }
}