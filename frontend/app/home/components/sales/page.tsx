"use client";

import { useProduct } from "@/hooks/product";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

export default function SalesPage() {
  // Ambil data produk yang sudah "matang" dari hook kita
  const { product, isLoading } = useProduct();

  if (isLoading) return <div className="p-10 text-center">Memuat produk...</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Katalog Penjualan</h1>
      
      {/* Grid untuk menampilkan Card Produk */}
      <div className="grid container mx-auto grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {product.map((p) => (
          <Card key={p.id} className="overflow-hidden hover:shadow-lg shadow-xl rounded-md transition-shadow">
            <div className="aspect-video bg-muted flex items-center justify-center">
              {/* Tempat foto produk jika nanti ada */}
              <span className="text-muted-foreground text-xs">No Image</span>
            </div>
            <CardHeader>
              <CardTitle className="text-lg">{p.name}</CardTitle>
              <p className="text-sm text-muted-foreground line-clamp-2">{p.description}</p>
            </CardHeader>
            <CardContent>
              <p className="text-xl font-bold text-primary">
                Rp {p.price.toLocaleString("id-ID")}
              </p>
              <span className="text-xs bg-secondary px-2 py-1 rounded-full">
                {p.category}
              </span>
            </CardContent>
            <CardFooter>
              <Button className="w-full gap-2">
                <ShoppingCart size={16} />
                Tambah ke Keranjang
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {product.length === 0 && (
        <div className="text-center text-muted-foreground py-20">
          Belum ada produk yang dijual.
        </div>
      )}
    </div>
  );
}