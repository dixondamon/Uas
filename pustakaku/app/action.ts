"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export type FormState = {
  sukses: boolean;
  pesan: string;
  galat?: {
    judul?: string;
    penulis?: string;
    kategori?: string;
    stok?: string;
    tahunTerbit?: string;
  };
  values?: {
    judul: string;
    penulis: string;
    kategori: string;
    stok: string;
    tahunTerbit: string;
    isbn: string;
    deskripsi: string;
  };
};

export async function simpanBuku(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const judul = String(formData.get("judul") ?? "").trim();
  const penulis = String(formData.get("penulis") ?? "").trim();
  const kategori = String(formData.get("kategori") ?? "").trim();
  const stokInput = String(formData.get("stok") ?? "").trim();
  const tahunTerbitInput = String(formData.get("tahunTerbit") ?? "").trim();
  const isbn = String(formData.get("isbn") ?? "").trim();
  const deskripsi = String(formData.get("deskripsi") ?? "").trim();
  const values = {
    judul,
    penulis,
    kategori,
    stok: stokInput,
    tahunTerbit: tahunTerbitInput,
    isbn,
    deskripsi,
  };

  const galat: NonNullable<FormState["galat"]> = {};
  const stok = Number(stokInput);
  const tahunTerbit = Number(tahunTerbitInput);
  const categories = ["Novel", "Pelajaran", "Referensi", "Komik", "Lainnya"];

  if (!judul) galat.judul = "Judul buku harus diisi.";
  if (!penulis) galat.penulis = "Penulis harus diisi.";
  if (!categories.includes(kategori)) galat.kategori = "Pilih kategori yang valid.";
  if (!stokInput || !Number.isInteger(stok) || stok < 0) {
    galat.stok = "Stok harus berupa bilangan bulat nol atau lebih.";
  }
  if (
    tahunTerbitInput &&
    (!Number.isInteger(tahunTerbit) || tahunTerbit < 1000 || tahunTerbit > 9999)
  ) {
    galat.tahunTerbit = "Tahun terbit harus berupa tahun yang valid.";
  }

  if (Object.keys(galat).length > 0) {
    return { sukses: false, pesan: "Periksa kembali isian Anda.", galat, values };
  }

  await prisma.buku.create({
    data: {
      judul,
      penulis,
      kategori,
      stok,
      tahunTerbit: tahunTerbitInput ? tahunTerbit : null,
      isbn: isbn || null,
      deskripsi: deskripsi || null,
    },
  });

  revalidatePath("/");
  revalidatePath("/buku");
  return { sukses: true, pesan: "Buku berhasil disimpan." };
}
