'use client';

import {  useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel, FieldError } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Package,  Loader2, Plus, Tag, X } from "lucide-react";
import { Product, ProductInput, productSchema } from '@/schema/product';
import { Textarea } from '@/components/ui/textarea';
import { useEffect } from 'react';

interface ProductFormProps {
  onSubmit: (values: ProductInput) => void;
  isPending: boolean;
  editingProduct?: Product | null;
  onCancel?: () => void;
}

export function ProductForm({ onSubmit, isPending, editingProduct, onCancel }: ProductFormProps) {
  const form = useForm<ProductInput>({
    resolver: zodResolver(productSchema) ,
    defaultValues: { name: '', price: 0, category: '', description: '', userId: 'cmo0gl0tz0000ngutu8ns7aob' },
  });

  useEffect(() => {
    if (editingProduct) {
      form.reset({
        name: editingProduct.name,
        price: Number(editingProduct.price),
        category: editingProduct.category,
        description: editingProduct.description,
        userId: editingProduct.userId,
      });
    } else {
      form.reset({ name: '', price: 0, category: '', description: '', userId: 'cmo0gl0tz0000ngutu8ns7aob' });
    }
  }, [editingProduct, form]);

  const handleInternalSubmit = async (values: ProductInput) => {
 try {
    // Tambahkan 'await' agar form tidak langsung terhapus
    await onSubmit(values); 
    const dataToSubmit = {
      ...values,
      price: Number(values.price),
    };
    console.log("Data berhasil dikirim:", dataToSubmit);
    form.reset({
            name: '',
            price: 0,
            category: '',
            description: '',
            userId: values.userId // tetap pertahankan userId jika diperlukan
        });
  } catch (error) {
    console.error("Gagal mengirim ke database:", error);
  }
  };

  return (
    <Card className="shadow-lg border-none">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="size-5 text-primary" /> Tambah Produk
        </CardTitle>
        <CardDescription>Masukkan detail koleksi baru Anda.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(handleInternalSubmit)}>
          <input type="hidden" {...form.register('userId')} />
          <FieldGroup className="space-y-4">

             {/* NAMA PRODUK */}
            <Field data-invalid={!!form.formState.errors.name}>
              <FieldLabel>Nama Produk</FieldLabel>
              <InputGroup className='shadow-md'>
                <InputGroupAddon><Package size={16} /></InputGroupAddon>
                <InputGroupInput placeholder="Nama produk..." {...form.register('name')} />
              </InputGroup>
              {form.formState.errors.name && <FieldError>{form.formState.errors.name.message}</FieldError>}
            </Field>

           
            {/* Harga */}
            <Field data-invalid={!!form.formState.errors.price}>
              <FieldLabel>Harga</FieldLabel>
              <InputGroup className='shadow-md'>
                <InputGroupInput type="number" {...form.register('price')} />
                <InputGroupAddon>Rp</InputGroupAddon>
              </InputGroup>
            </Field>

            {/* Kategori (Field Baru) */}
              <Field data-invalid={!!form.formState.errors.category}>
                <FieldLabel className="text-xs font-semibold">Kategori</FieldLabel>
                <InputGroup className='shadow-md'>
                  <InputGroupAddon><Tag size={14} /></InputGroupAddon>
                  <InputGroupInput placeholder="Minuman, dll" {...form.register('category')} />
                </InputGroup>
              </Field>

             {/* Deskripsi (Field Baru) */}
            <Field data-invalid={!!form.formState.errors.description}>
              <FieldLabel className="text-xs font-semibold">Deskripsi</FieldLabel>
              <Textarea 
                placeholder="Detail produk..." 
                className="min-h-20 shadow-md text-sm" 
                {...form.register('description')} 
              />
              {form.formState.errors.description && <FieldError>{form.formState.errors.description.message}</FieldError>}
            </Field>

            <div className='flex gap-2 justify-center'>
              <Button className="w-50 cursor-pointer hover:scale-110" type="submit" disabled={isPending}>
                {isPending ? <Loader2 className="animate-spin mr-2" size={16} /> : <Plus className="mr-2" size={16} />}
                Tambah Produk
              </Button>
              {editingProduct && (
                <Button variant="outline" type="button" onClick={onCancel}>
                  <X className="mr-2" size={16} /> Batal Edit
                </Button>
              )}
            </div>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}