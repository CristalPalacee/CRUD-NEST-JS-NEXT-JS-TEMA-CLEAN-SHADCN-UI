import { NextResponse } from "next/server"



const API_URL = process.env.BACKEND_URL
export async function POST(req: Request) {
    try {
        const body = await req.json()
        const res = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })

        const data = await res.json()

        if (!res.ok) {
            return new Response('Failed to register ', {
                status: res.status,
                statusText: res.statusText
            })
        }
        

        return NextResponse.json(data)
    } catch (error) {
        console.log(error)
        return new Response('Internal Server Error', {
            status: 500
        })
    }
}