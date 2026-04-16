'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// Shadcn UI v4 Components
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel, FieldError } from "@/components/ui/field";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Mail, Lock, Loader2, EyeOff, Eye } from "lucide-react";
import { useAuth } from '@/hooks/auth';
import { LoginInput, loginSchema } from '@/schema/auth';
import { useState } from 'react';


export default function LoginPage() {

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const { login, isLoginLoading } = useAuth();

  const { register, handleSubmit, formState: { errors } } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = (values: LoginInput) => {
    login(values)
  };



  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Selamat Datang</CardTitle>
          <CardDescription>Masukkan kredensial Anda untuk mengakses akun.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field data-invalid={!!errors.email}>
                <FieldLabel>Email</FieldLabel>

                <InputGroup>
                  <InputGroupAddon><Mail size={16} /></InputGroupAddon>
                  <InputGroupInput 
                    className="border-none focus-visible:ring-0"
                    type="email"
                    placeholder="email@example.com"
                    {...register('email')}
                  />
                </InputGroup>

                {errors.email && <FieldError>{errors.email.message}</FieldError>}
              </Field>

              <Field data-invalid={!!errors.password}>
                <div className="flex items-center justify-between">
                  <FieldLabel>Password</FieldLabel>
                  <Link href="#" className="text-xs text-primary hover:underline">Lupa password?</Link>
                </div>
                <InputGroup>
                  <InputGroupAddon><Lock size={16} /></InputGroupAddon>
                  <InputGroupInput
                   className='bg-transparent'
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    {...register('password')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <EyeOff size={20} /> // Ikon mata tertutup
                    ) : (
                      <Eye size={20} />    // Ikon mata terbuka
                    )}
                  </button>
                </InputGroup>
                {errors.password && <FieldError>{errors.password.message}</FieldError>}
              </Field>

              <Button type="submit" className="w-full" disabled={isLoginLoading}>
                {isLoginLoading && <Loader2 className="animate-spin" data-icon="inline-start" />}
                Masuk ke Dashboard
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter className="justify-center text-sm">
          <p className="text-muted-foreground">
            Belum punya akun?{" "}
            <Link href="/register" className="text-primary font-medium hover:underline">
              Daftar gratis
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

