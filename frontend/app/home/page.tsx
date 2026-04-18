
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingBag, LayoutDashboard } from "lucide-react";
import SalesPage from "./components/sales/page";

export default function Home() {
  return (
    <>
    <main className="flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center py-24 px-6 bg-linear-to-b from-primary/10 to-background border-b">
        <div className="max-w-3xl space-y-6">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
            Kelola Bisnis Anda <br />
            <span className="text-primary">Lebih Pintar</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Platform manajemen produk dan penjualan yang terintegrasi dengan 
            Next.js 15 dan NestJS.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            {/* Tombol ke Katalog Penjualan */}
            <Link href="/sales">
              <Button size="lg" className="gap-2 h-12 px-8 text-lg">
                <ShoppingBag size={20} />
                Mulai Belanja
              </Button>
            </Link>

            {/* Tombol ke Admin Dashboard */}
            <Link href="/admin/dashboard">
              <Button size="lg" variant="outline" className="gap-2 h-12 px-8 text-lg">
                <LayoutDashboard size={20} />
                Admin Dashboard
              </Button>
            </Link>
          </div>
        </div>

        {/* Preview Visual */}
        <div className="mt-16 w-full max-w-5xl rounded-xl border bg-card p-2 shadow-2xl">
          <div className="rounded-lg bg-muted md:aspect-video  aspect-9/16 flex items-center justify-center border border-dashed">
            <p className="text-muted-foreground italic">Sistem Penjualan & Dashboard</p>
          </div>
        </div>
      </section>

      {/* Info Singkat */}
      <section className="py-20 grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto px-6">
        <div className="p-6 rounded-xl border shadow-md bg-card">
          <h3 className="text-xl font-bold mb-2">CRUD Produk</h3>
          <p className="text-muted-foreground">Kelola data produk langsung ke database Prisma.</p>
        </div>
        <div className="p-6 rounded-xl border shadow-md bg-card">
          <h3 className="text-xl font-bold mb-2">Next.js 15</h3>
          <p className="text-muted-foreground">Sudah mendukung fitur Async Params terbaru.</p>
        </div>
        <div className="p-6 rounded-xl border shadow-md bg-card">
          <h3 className="text-xl font-bold mb-2">Real-time Data</h3>
          <p className="text-muted-foreground">Sinkronisasi data cepat dengan TanStack Query.</p>
        </div>
      </section>

      <section className="container mx-auto max-w-7xl">
        <div className="p-8"><SalesPage/></div>
      </section>
    </main>
    </>
  );
}