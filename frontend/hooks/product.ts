import { ProductInput, ProductResponse } from "@/schema/product";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";

export const useProduct = () => {
  const queryClient = useQueryClient();

  // 1. Logika Fetch Data (Read)
  const { data: productData, isLoading } = useQuery<ProductResponse>({
    queryKey: ["product"],
    queryFn: async () => {
      const res = await fetch("/api/product");
      return res.json();
    },
  });

  // 2. Logika Tambah Produk (Create)
  const addMutation = useMutation({
    mutationFn: async (Data: ProductInput) => {
      const response = await fetch("/api/product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Data),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create product");
      }

      return data;
    },
    onSuccess: (data) => {
       console.log("SUCCESS BACKEND:", data);
      queryClient.invalidateQueries({ queryKey: ["product"] });
      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Produk telah ditambahkan ke halaman produk.",
        timer: 2000,
        showConfirmButton: false,
      });
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Gagal Tambah Product!",
        text: error.message,
        timer: 2000,
        showConfirmButton: false,
      });
    },
  });

  // 3. Logika Hapus Produk (Delete)
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      if (!id) throw new Error("ID Produk tidak terbaca!");
      const res = await fetch(`/api/product/${id}`, {
        method: "DELETE",
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product"] });
      Swal.fire({
        icon: "success",
        title: "Dihapus!",
        text: "Produk berhasil dihapus.",
        timer: 1500,
        showConfirmButton: false,
      });
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Gagal Hapus Product!",
        text: error.message,
        timer: 1500,
        showConfirmButton: false,
      });
    },
  });

  // Fungsi pembungkus untuk konfirmasi hapus
  const confirmDelete = (id: number) => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Data produk yang dihapus tidak bisa dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };
  return {
    // Create Logic
    isCreate: addMutation.isPending,
    createProduct: addMutation.mutateAsync,

    // Delete Logic
    isDeleting: deleteMutation.isPending,
    deleteProduct: confirmDelete,

    // Data & Loading State
    product: productData?.data ?? [],
    isLoading,
  };
};
