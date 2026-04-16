'use client';



import { Button } from "@/components/ui/button";

import {
    LogOut
} from "lucide-react";
import { useProduct } from '@/hooks/product';
import { useAuth } from '@/hooks/auth';
import { ProductForm } from './component/product-form';
import { ProductTable } from './component/product.table';


export default function AddProductPage() {

    const { createProduct, product, deleteProduct, isCreate, isLoading, isDeleting } = useProduct();
    const { logout } = useAuth();



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
                    <ProductForm onSubmit={createProduct} isPending={isCreate} />
                </div>
                <div className="lg:col-span-7">
                    <ProductTable
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