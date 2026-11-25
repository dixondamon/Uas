import Link from "next/link";
import { Navbar } from "./navbar";
import type { Buku } from "./daftarbuku";

export function DetailBuku({ book }: { book: Buku }) {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="page-main detail-main">
        <Link className="back-link" href="/buku">
          <svg viewBox="0 0 20 20" aria-hidden="true">
            <path d="M16 10H5M9 6l-4 4 4 4" />
          </svg>
          Kembali ke daftar
        </Link>

        <article className="detail-card">
          <div className="book-cover" aria-hidden="true">
            <span>PustakaKu</span>
            <svg viewBox="0 0 48 48">
              <path d="M8 11a5 5 0 0 1 5-5h11v34H13a5 5 0 0 0-5 5V11Zm32 0a5 5 0 0 0-5-5H24v34h11a5 5 0 0 1 5 5V11Z" />
            </svg>
          </div>

          <div className="detail-content">
            <p className="section-label">Detail buku</p>
            <h1>{book.judul}</h1>
            <dl>
              <div><dt>Penulis</dt><dd>{book.penulis}</dd></div>
              <div><dt>Kategori</dt><dd>{book.kategori}</dd></div>
              <div>
                <dt>Stok</dt>
                <dd>
                  <span className={book.stok === 0 ? "stock stock-empty" : "stock"}>
                    {book.stok} buku
                  </span>
                </dd>
              </div>
              {book.tahunTerbit && <div><dt>Tahun terbit</dt><dd>{book.tahunTerbit}</dd></div>}
              {book.isbn && <div><dt>ISBN</dt><dd>{book.isbn}</dd></div>}
            </dl>
            {book.deskripsi && (
              <div className="book-description">
                <h2>Deskripsi</h2>
                <p>{book.deskripsi}</p>
              </div>
            )}
          </div>
        </article>
      </main>
    </div>
  );
}