# Portfolio

Website portofolio satu halaman menggunakan Vue 3, Vite, dan Tailwind CSS. Tidak memerlukan backend.

## Menjalankan proyek

Gunakan Node.js 20.9 atau lebih baru dan npm:

```bash
npm ci
npm run dev
```

Perintah lain: `npm run build` untuk build produksi, `npm run preview` untuk melihat hasil build, dan `npm test` untuk menjalankan tes galeri.

## Konten dan fotografi

Profil, tautan sosial, dan skill diatur di `src/data/portfolio.js`. Letakkan foto di `src/assets/img`; saat menjalankan dev atau build, skrip membuat salinan WebP dan thumbnail di `src/generated/photos`. Direktori tersebut tidak disimpan di Git, dan foto asli tidak diubah. Jalankan `npm run optimize` jika foto berubah saat server dev sedang berjalan. Isi `src/data/photo-descriptions.js` dengan deskripsi setiap foto untuk teks alternatif yang lebih bermakna.

Form kontak membuka aplikasi email pengunjung melalui `mailto:`; form tidak mengirim pesan sendiri dan membutuhkan aplikasi email yang terkonfigurasi.

## Deployment

Workflow `.github/workflows/deploy.yml` membangun dan menerbitkan situs ke GitHub Pages pada push ke branch `master` atau melalui pemicu manual. Atur sumber GitHub Pages repository ke **GitHub Actions**.
