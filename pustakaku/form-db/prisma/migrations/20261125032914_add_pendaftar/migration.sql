-- CreateTable
CREATE TABLE "Pendaftar" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "namaPengguna" TEXT NOT NULL,
    "tanggalDaftar" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "terakhirMasuk" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "jumlahMasuk" INTEGER NOT NULL DEFAULT 1
);

-- CreateIndex
CREATE UNIQUE INDEX "Pendaftar_namaPengguna_key" ON "Pendaftar"("namaPengguna");
