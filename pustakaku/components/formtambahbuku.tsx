 "use client";

import Link from "next/link";
import { useActionState } from "react";
import { simpanBuku, type FormState } from "@/app/action";
import { Navbar } from "@/components/pustakakucomponent/navbar";

const initialState: FormState = { sukses: false, pesan: "" };

export function FormTambahBuku() {
  const [state, formAction, pending] = useActionState(simpanBuku, initialState);

  return (
    <div className="app-shell">
      <Navbar />
      <main className="page-main form-main">
        <Link className="back-link" href="/buku">
          <svg viewBox="0 0 20 20" aria-hidden="true">
            <path d="M16 10H5M9 6l-4 4 4 4" />
          </svg>
          Kembali ke daftar
        </Link>

        <div className="form-card">
          <div className="form-heading">
            <p className="section-label">Katalog perpustakaan</p>
            <h1>Tambah Buku Baru</h1>
          </div>

          {state.pesan && (
            <div className={state.sukses ? "success-message" : "login-error"} role="status">
              {state.pesan}
            </div>
          )}

          <form action={formAction}>
            <label htmlFor="judul">
              Judul buku
              <input
                id="judul"
                name="judul"
                placeholder="Masukkan judul buku"
                defaultValue={state.values?.judul}
                required
              />
              {state.galat?.judul && <span className="login-error">{state.galat.judul}</span>}
            </label>

            <label htmlFor="penulis">
              Penulis
              <input
                id="penulis"
                name="penulis"
                placeholder="Nama penulis"
                defaultValue={state.values?.penulis}
                required
              />
              {state.galat?.penulis && <span className="login-error">{state.galat.penulis}</span>}
            </label>

            <label htmlFor="kategori">
              Kategori
              <select id="kategori" name="kategori" defaultValue={state.values?.kategori ?? ""} required>
                <option value="" disabled>Pilih kategori</option>
                <option value="Novel">Novel</option>
                <option value="Pelajaran">Pelajaran</option>
                <option value="Referensi">Referensi</option>
                <option value="Komik">Komik</option>
                <option value="Lainnya">Lainnya</option>
              </select>
              {state.galat?.kategori && <span className="login-error">{state.galat.kategori}</span>}
            </label>

            <div className="form-row">
              <label htmlFor="tahunTerbit">
                Tahun terbit
                <input
                  id="tahunTerbit"
                  name="tahunTerbit"
                  type="number"
                  placeholder="2026"
                  min="1000"
                  max="9999"
                  defaultValue={state.values?.tahunTerbit}
                />
                {state.galat?.tahunTerbit && (
                  <span className="login-error">{state.galat.tahunTerbit}</span>
                )}
              </label>

              <label htmlFor="stok">
                Jumlah stok
                <input
                  id="stok"
                  name="stok"
                  type="number"
                  placeholder="5"
                  min="0"
                  step="1"
                  defaultValue={state.values?.stok}
                  required
                />
                {state.galat?.stok && <span className="login-error">{state.galat.stok}</span>}
              </label>
            </div>

            <label htmlFor="isbn">
              ISBN
              <input
                id="isbn"
                name="isbn"
                placeholder="Nomor ISBN"
                defaultValue={state.values?.isbn}
              />
            </label>

            <label htmlFor="deskripsi">
              Deskripsi
              <textarea
                id="deskripsi"
                name="deskripsi"
                placeholder="Deskripsi singkat buku"
                rows={4}
                defaultValue={state.values?.deskripsi}
              />
            </label>

            <div className="form-actions">
              <Link className="secondary-button" href="/buku">Batal</Link>
              <button className="primary-button" type="submit" disabled={pending}>
                {pending ? "Menyimpan..." : "Simpan Buku"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
