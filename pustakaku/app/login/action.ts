"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export type LoginState = {
  galat?: string;
};

export async function simpanMasuk(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const namaPengguna = String(formData.get("name") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!namaPengguna || !password) {
    return { galat: "Nama pengguna dan kata sandi harus diisi." };
  }

  await prisma.pendaftar.upsert({
    where: { namaPengguna },
    create: { namaPengguna },
    update: {
      terakhirMasuk: new Date(),
      jumlahMasuk: { increment: 1 },
    },
  });

  redirect("/buku");
}
