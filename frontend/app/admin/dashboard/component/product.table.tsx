'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Loader2, LayoutDashboard, Pencil, } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Product } from "@/schema/product";



interface ProductTableProps {
  product: Product[];
  isLoading: boolean;
  onDelete: (id: number) => void;
  isDeleting: boolean;
  onEdit: (product: Product) => void;
  
}

export function ProductTable({ product, isLoading, onDelete, isDeleting, onEdit }: ProductTableProps) {
  return (
    <Card className="shadow-lg border-none">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <LayoutDashboard className="size-5 text-primary" /> Daftar Produk
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center p-10"><Loader2 className="animate-spin" /></div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produk</TableHead>
                <TableHead>Harga</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {product.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>
                    <div className="font-medium">{p.name}</div>
                    <div className="text-xs text-muted-foreground">{p.category}</div>
                    <div className="text-xs text-muted-foreground">{p.description}</div>
                  </TableCell>
                  <TableCell>Rp {Number(p.price).toLocaleString()}</TableCell>
                  <TableCell className="text-right">

                  {/* Button Edit */}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-blue-500 hover:text-blue-700 hover:bg-blue-50"
                        onClick={() => onEdit(p)}
                        disabled={isDeleting}
                      >
                        <Pencil size={16} />
                      </Button>
                {/* Button Delete */}
                    <Button
                      variant="ghost" size="icon" className="text-destructive"
                      onClick={() => {
                        if (!p.id) {
                          console.error("ID Produk tidak ditemukan!");
                          return;
                        }
                        onDelete(p.id);
                      }} disabled={isDeleting}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}