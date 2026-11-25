import Link from "next/link";
import { Navbar } from "./navbar";

export function LandingPage({ totalBooks }: { totalBooks: number | null }) {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="landing-main">
        <section className="landing-copy">
          <p className="section-label">Perpustakaan digital sekolah</p>
          <h1>Temukan buku, <span>jaga pengetahuan.</span></h1>
          <p className="landing-description">
            PustakaKu membantu siswa dan petugas perpustakaan menemukan,
            mengelola, dan menambahkan koleksi buku dalam satu tempat.
          </p>
          <Link className="primary-button" href="/buku">
            Lihat Daftar Buku
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <path d="M4 10h11M11 6l4 4-4 4" />
            </svg>
          </Link>
        </section>

        <section className="landing-visual" aria-label="Ringkasan PustakaKu">
          <div className="visual-card visual-card-main">
            <span className="visual-overline">Koleksi katalog</span>
            <strong>{totalBooks ?? "—"}</strong>
            <p>judul tersimpan</p>
          </div>
          <div className="visual-card visual-card-small">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H11v16H6.5A2.5 2.5 0 0 0 4 21.5v-16ZM20 5.5A2.5 2.5 0 0 0 17.5 3H13v16h4.5a2.5 2.5 0 0 1 2.5 2.5v-16Z" />
            </svg>
            <div>
              <strong>Cari cepat</strong>
              <span>Judul atau penulis</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}