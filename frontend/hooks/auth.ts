// src/hooks/useAuth.ts
import { LoginInput, RegisterInput } from '@/schema/auth';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';


export interface AuthResponse {
  access_token: string;
  user?: {
    id: string;
    email: string;
    name?: string;
  };
}

// Error response dari NestJS/Zod
export interface ApiErrorResponse {
  message: string | string[];
  error: string;
  statusCode: number;
}
export const useAuth = () => {
  const router = useRouter();

  const logout = async () => {
    const result = await Swal.fire({
      title: 'Apakah kamu yakin?',
      text: "Sesi kamu akan berakhir!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Ya, Logout!',
      cancelButtonText: 'Batal'
    })

    
  if (result.isConfirmed) {
      try {
        const response = await fetch('/api/auth/logout', {
          method: 'POST',
        });

        if (response.ok) {
          // Berikan notifikasi sukses
          await Swal.fire({
            icon: 'success',
            title: 'Berhasil Logout',
            text: 'Sampai jumpa kembali!',
            timer: 1500,
            showConfirmButton: false,
          });

          // Redirect ke login
          router.push('/login');
          router.refresh();
        }
      } catch (error) {
        Swal.fire('Error', 'Gagal logout, coba lagi nanti.', 'error');
      }
    }
  };

  const loginMutation = useMutation<AuthResponse, Error, LoginInput>({
    mutationFn: async (credentials) => {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Login gagal');
      return data;
    },
    onSuccess: (data) => {
      localStorage.setItem('token', data.access_token);
      Swal.fire('Berhasil!', 'Selamat datang kembali', 'success');
      router.push('/admin/dashboard');
    },
    onError: (error) =>
      Swal.fire({
    icon: 'error',
    title: 'Gagal Login',
    text: error.message, 
    confirmButtonText: 'Coba Lagi',
    confirmButtonColor: '#7c3aed', 
  
    showClass: {
      popup: 'animate__animated animate__headShake'
    }
  }),
  });

  const registerMutation = useMutation<AuthResponse, Error, RegisterInput>({
    mutationFn: async (userData) => {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Registrasi gagal');
      return data;
    },
    onSuccess: () => {
      Swal.fire('Berhasil!', 'Akun terdaftar, silakan login.', 'success');
      router.push('/login');
    },
    onError: (error) => Swal.fire('Gagal', error.message, 'error'),
  });

  

  return {
    logout,
    login: loginMutation.mutate,
    isLoginLoading: loginMutation.isPending,
    register: registerMutation.mutate,
    isRegisterLoading: registerMutation.isPending,
  };
};