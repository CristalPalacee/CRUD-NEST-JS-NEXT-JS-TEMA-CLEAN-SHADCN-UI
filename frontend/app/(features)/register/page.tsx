'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// Shadcn UI v4 Components
import { Button } from "@/components/ui/button";
import { 
  Field, 
  FieldGroup, 
  FieldLabel, 
  FieldError 
} from "@/components/ui/field";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle, 
  CardFooter 
} from "@/components/ui/card";
import { Loader2, User, Mail, Lock, EyeOff, Eye } from "lucide-react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { RegisterInput, registerSchema } from '@/schema/auth';
import { useAuth } from '@/hooks/auth';
import { useState } from 'react';

export default function RegisterPage() {
       
     const [showPassword, setShowPassword] = useState(false);
  const { register, isRegisterLoading } = useAuth();

  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (values: RegisterInput) => {
    register(values);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Daftar Akun</CardTitle>
          <CardDescription>Mulai perjalanan Anda bersama kami hari ini.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              {/* Nama Lengkap */}
              <Field data-invalid={!!errors.name}>
                <FieldLabel>Nama Lengkap</FieldLabel>
                <InputGroup>
                  <InputGroupAddon><User size={16} /></InputGroupAddon>
                  <InputGroupInput 
                    placeholder="John Doe" 
                    {...registerField('name')} 
                  />
                </InputGroup>
                {errors.name && <FieldError>{errors.name.message}</FieldError>}
              </Field>

              {/* Email */}
              <Field data-invalid={!!errors.email}>
                <FieldLabel>Email</FieldLabel>
                <InputGroup>
                  <InputGroupAddon><Mail size={16} /></InputGroupAddon>
                  <InputGroupInput 
                    type="email" 
                    placeholder="nama@email.com" 
                    {...registerField('email')} 
                  />
                </InputGroup>
                {errors.email && <FieldError>{errors.email.message}</FieldError>}
              </Field>

              {/* Password */}
              <Field data-invalid={!!errors.password}>
                <FieldLabel>Password</FieldLabel>
                <InputGroup>
                  <InputGroupAddon><Lock size={16} /></InputGroupAddon>
                  <InputGroupInput 
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••" 
                    {...registerField('password')} 
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

              {/* Confirm Password */}
              <Field data-invalid={!!errors.confirmPassword}>
                <FieldLabel>Konfirmasi Password</FieldLabel>
                <InputGroup>
                  <InputGroupAddon><Lock size={16} /></InputGroupAddon>
                  <InputGroupInput 
                   type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••" 
                    {...registerField('confirmPassword')} 
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
                {errors.confirmPassword && <FieldError>{errors.confirmPassword.message}</FieldError>}
              </Field>

              <div className='flex items-center justify-center'>
                <Button type="submit" className="w-50  cursor-pointer transition-all duration-300 ease-in-out hover:scale-[120%]" disabled={isRegisterLoading}>
                  {isRegisterLoading ? (
                    <Loader2 className="animate-spin" data-icon="inline-start" />
                  ) : null}
                  Buat Akun
                </Button>
              </div>
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter className="justify-center text-sm">
          <p className="text-muted-foreground">
            Sudah punya akun?{" "}
            <Link href="/login" className="text-primary font-medium hover:underline">
              Masuk
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}