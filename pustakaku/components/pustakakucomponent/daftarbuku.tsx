"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Navbar } from "@/components/pustakakucomponent/navbar";

export type Buku = {
  id: number;
  judul: string;
  penulis: string;
  kategori: string;
  stok: number;
  tahunTerbit: number | null;
  isbn: string | null;
  deskripsi: string | null;
};

export function DaftarBuku({ books }: { books: Buku[] }) {
  const [query, setQuery] = useState("");

  const filteredBooks = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return books;

    return books.filter((book) =>
      `${book.judul} ${book.penulis} ${book.kategori}`
        .toLowerCase()
        .includes(normalizedQuery),
    );
  }, [books, query]);

  return (
    <div className="app-shell">
      <Navbar />
      <main className="page-main">
        <div className="page-heading">
          <div>
            <p className="section-label">Katalog perpustakaan</p>
            <h1>Daftar Buku</h1>
          </div>
          <Link className="primary-button compact" href="/buku/baru">
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <path d="M10 4v12M4 10h12" />
            </svg>
            Tambah Buku
          </Link>
        </div>

        <div className="catalog-toolbar">
          <label className="search-field">
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <circle cx="9" cy="9" r="5" />
              <path d="m13 13 4 4" />
            </svg>
            <span className="sr-only">Cari buku</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Cari judul, penulis, atau kategori"
            />
          </label>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Judul</th>
                <th>Penulis</th>
                <th>Kategori</th>
                <th>Stok</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks.map((book, index) => (
                <tr key={book.id}>
                  <td data-label="No">{index + 1}</td>
                  <td data-label="Judul" className="book-title">{book.judul}</td>
                  <td data-label="Penulis">{book.penulis}</td>
                  <td data-label="Kategori">{book.kategori}</td>
                  <td data-label="Stok">
                    <span className={book.stok === 0 ? "stock stock-empty" : "stock"}>
                      {book.stok}
                    </span>
                  </td>
                  <td data-label="Aksi">
                    <Link className="detail-link" href={`/buku/${book.id}`}>
                      Detail
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredBooks.length === 0 && (
            <div className="empty-state">
              <strong>{query ? "Buku tidak ditemukan" : "Katalog masih kosong"}</strong>
              <p>
                {query
                  ? "Coba kata kunci lain untuk pencarian Anda."
                  : "Tambahkan buku untuk mulai mengisi katalog."}
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}