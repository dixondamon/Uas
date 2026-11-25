import Link from "next/link";

export function Navbar() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="PustakaKu beranda">
        <span className="brand-mark" aria-hidden="true">
          <svg viewBox="0 0 24 24" role="img">
            <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H11v16H6.5A2.5 2.5 0 0 0 4 21.5v-16Z" />
            <path d="M20 5.5A2.5 2.5 0 0 0 17.5 3H13v16h4.5a2.5 2.5 0 0 1 2.5 2.5v-16Z" />
          </svg>
        </span>
        <span>PustakaKu</span>
      </Link>

      <nav className="main-nav" aria-label="Navigasi utama">
        <Link href="/">Beranda</Link>
        <Link href="/buku">Daftar Buku</Link>
        <Link href="/login">Masuk</Link>
      </nav>
    </header>
  );
}
