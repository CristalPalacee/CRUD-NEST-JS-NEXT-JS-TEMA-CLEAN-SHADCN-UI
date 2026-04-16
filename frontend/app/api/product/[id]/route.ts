import { NextResponse } from "next/server";

const API_URL = process.env.BACKEND_URL;

export async function GET( { params }: { params: { id: string } }) {
  const res = await fetch(`${API_URL}/api/v1/product/${params.id}`, {
    cache: "no-store",
  });
  const data = await res.json();
  return NextResponse.json(data);
}


export async function PATCH(req: Request, { params }: { params: { id: string } }) {
try {
    const body = await req.json()
    const res = await fetch(`${API_URL}/api/v1/product/${params.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    const data = await res.json()
    if (!res.ok) {
        return new Response('Failed to update product', {
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


export async function DELETE(
  req: Request,
  { params }: { params:Promise<{ id: string }> }
) {
  try {
    // params.id diambil dari nama folder [id]
    const {id} = await params
   console.log("Menghapus produk ID:", id);

    const res = await fetch(`${API_URL}/api/v1/product/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      const errorData = await res.json();
      return NextResponse.json(errorData, { status: res.status });
    }

    return NextResponse.json({ message: "Produk berhasil dihapus" });
  } catch (error) {
    console.error("Koneksi ke Backend Putus:", error);
    return NextResponse.json(
      { message: "Gagal terhubung ke backend" }, 
      { status: 500 }
    );
  }
}