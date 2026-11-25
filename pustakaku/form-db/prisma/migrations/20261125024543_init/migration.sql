-- CreateTable
CREATE TABLE "Buku" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "judul" TEXT NOT NULL,
    "penulis" TEXT NOT NULL,
    "kategori" TEXT NOT NULL,
    "stok" INTEGER NOT NULL,
    "tahunTerbit" INTEGER,
    "isbn" TEXT,
    "deskripsi" TEXT
);
