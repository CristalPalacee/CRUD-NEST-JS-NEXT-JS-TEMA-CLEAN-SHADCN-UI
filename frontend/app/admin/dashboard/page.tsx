'use client';



import { Button } from "@/components/ui/button";

import {
    LogOut
} from "lucide-react";
import { useProduct } from '@/hooks/product';
import { useAuth } from '@/hooks/auth';
import { ProductForm } from './component/product-form';
import { ProductTable } from './component/product.table';
import { useState } from "react";
import { Product, ProductInput } from "@/schema/product";


export default function AddProductPage() {

    const { createProduct, product, deleteProduct, isCreate, isLoading, isDeleting, updateProduct, isUpdating } = useProduct();
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const { logout } = useAuth();

    const handleFormSubmit = async (values: ProductInput) => {
        if (editingProduct) {
            // Jika sedang mode edit, panggil updateProduct
            await updateProduct({ id: editingProduct.id, data: values });
            setEditingProduct(null); // Reset setelah berhasil
        } else {
            // Jika tidak, tambah produk baru
            await createProduct(values);
        }
    };

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                    <p className="text-muted-foreground">Kelola Bisnis produk Anda di sini.</p>
                </div>
                <Button
                    variant="outline"
                    onClick={logout}
                    className="gap-2 cursor-pointer border-destructive text-destructive hover:bg-destructive hover:text-white transition-all shadow-sm"
                >
                    <LogOut size={16} />
                    Logout
                </Button>

            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-5">
                    <ProductForm editingProduct={editingProduct} onCancel={() => setEditingProduct(null)} onSubmit={handleFormSubmit} isPending={isCreate || isUpdating} />
                </div>
                <div className="lg:col-span-7">
                    <ProductTable
                        onEdit={(p) => {
                            setEditingProduct(p)
                            window.scrollTo({ top: 0, behavior: 'smooth' })

                        }

                        }
                        product={product}
                        isLoading={isLoading}
                        onDelete={deleteProduct}
                        isDeleting={isDeleting}

                    />
                </div>
            </div>

        </div>
    );
}