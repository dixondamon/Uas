import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const sampleBooks = [
  {
    judul: "Laskar Pelangi",
    penulis: "Andrea Hirata",
    kategori: "Novel",
    stok: 5,
    tahunTerbit: 2005,
    deskripsi: "Kisah persahabatan dan semangat belajar dari Belitung.",
  },
  {
    judul: "Bumi Manusia",
    penulis: "Pramoedya Ananta Toer",
    kategori: "Novel",
    stok: 0,
    tahunTerbit: 1980,
    deskripsi: "Novel tentang kehidupan dan perubahan pada masa kolonial.",
  },
  {
    judul: "Fisika Dasar",
    penulis: "David Halliday",
    kategori: "Pelajaran",
    stok: 12,
    deskripsi: "Pengantar konsep-konsep utama dalam ilmu fisika.",
  },
  {
    judul: "Matematika Terapan",
    penulis: "Tim Edukasi",
    kategori: "Pelajaran",
    stok: 8,
    deskripsi: "Latihan matematika untuk memperkuat pemahaman konsep.",
  },
  {
    judul: "Atlas Indonesia",
    penulis: "Tim Kartografi",
    kategori: "Referensi",
    stok: 3,
    deskripsi: "Referensi peta dan informasi wilayah Indonesia.",
  },
  {
    judul: "Petualangan di Pulau Awan",
    penulis: "Nara Putra",
    kategori: "Komik",
    stok: 4,
    deskripsi: "Komik petualangan dengan tokoh-tokoh yang saling membantu.",
  },
];

async function main() {
  const existingBooks = await prisma.buku.findMany({
    select: { judul: true },
  });
  const existingTitles = new Set(
    existingBooks.map((book) => book.judul.trim().toLocaleLowerCase()),
  );
  const booksToAdd = sampleBooks.filter(
    (book) => !existingTitles.has(book.judul.toLocaleLowerCase()),
  );

  if (booksToAdd.length === 0) {
    console.log("Sample books are already in the database.");
    return;
  }

  await prisma.buku.createMany({ data: booksToAdd });
  console.log(`Added ${booksToAdd.length} sample books.`);
}

main()
  .catch((error) => {
    console.error("Failed to seed sample books:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
