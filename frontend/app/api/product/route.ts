import { NextResponse } from "next/server";

const API_URL = process.env.BACKEND_URL;

export async function GET() {
  try {
    const res = await fetch(`${API_URL}/api/v1/product`, {
        cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) {
      return new Response("Failed to fetch products", {
        status: res.status,
        statusText: res.statusText,
      });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return new Response("Internal Server Error", {
      status: 500,
    });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Mengirim data ke:", `${API_URL}/api/v1/product`);
    const res = await fetch(`${API_URL}/api/v1/product`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      return new Response("Failed to create product", {
        status: res.status,
        statusText: res.statusText,
      });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return new Response("Internal Server Error", {
      status: 500,
    });
  }
}
