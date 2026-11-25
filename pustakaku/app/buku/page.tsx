import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import { DaftarBuku } from "@/components/pustakakucomponent/daftarbuku";
import { Navbar } from "@/components/pustakakucomponent/navbar";

async function BookCatalog() {
  const books = await prisma.buku.findMany({
    orderBy: { judul: "asc" },
  });

  return <DaftarBuku books={books} />;
}

export default function BukuPage() {
  return (
    <Suspense
      fallback={
        <div className="app-shell">
          <Navbar />
          <main className="page-main">Memuat daftar buku...</main>
        </div>
      }
    >
      <BookCatalog />
    </Suspense>
  );
}
