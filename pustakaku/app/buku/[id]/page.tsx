import { Suspense } from "react";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { DetailBuku } from "@/components/pustakakucomponent/detailbuku";
import { Navbar } from "@/components/pustakakucomponent/navbar";

async function BookDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const bookId = Number(id);

  if (!Number.isSafeInteger(bookId) || bookId < 1) notFound();

  const book = await prisma.buku.findUnique({ where: { id: bookId } });
  if (!book) notFound();

  return <DetailBuku book={book} />;
}

export default function DetailBukuPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="app-shell">
          <Navbar />
          <main className="page-main">Memuat detail buku...</main>
        </div>
      }
    >
      <BookDetails params={params} />
    </Suspense>
  );
}
