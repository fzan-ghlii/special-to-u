# 📝 Log Perubahan (Changelog) — Website Ultah Joice

Dokumen ini mencatat seluruh riwayat pembaruan, perbaikan desain, dan peningkatan fitur pada proyek Website Ucapan Ulang Tahun ke-21 Joice Omasi Angelita Harefa.

---

## [Pembaruan] — 7 November 2026 (Rombak Penuh Pengalaman Sinematik Dark Chocolate)

### 🍫 1. Desain Sinematik *Nocturnal Cocoa & Golden Starlight* (Sesuai Referensi Video)
- **Palet Warna Coklat Gelap Hangat & Emas:**
  - Latar belakang gradasi *Dark Espresso & Warm Cocoa* (`#130B07` → `#1D110B`) dilengkapi efek *blurred heart bokeh* (`♥`) dan partikel cahaya bintang (*starlight dust*) yang melayang lembut.
  - Tipografi *Playfair Display* italic/bold berpendar (*champagne gold glow*) dipadukan dengan kartu *frosted glassmorphism* beraksen emas karamel.
- **Alur Naratif 7 Tahap Interaktif di Halaman Utama ([`page.tsx`](file:///d:/KULIAH%20BISDIG/SKRIPSI/UMUM/specialtou/app/app/page.tsx)):**
  1. **Layar 1 — Hitung Mundur Misterius (`countdown`):** Menampilkan `✦ MENGHITUNG WAKTU ✦`, judul *"Her Special Day is Coming"*, dan 4 kotak kaca hitung mundur (`HARI : JAM : MENIT : DETIK`) yang selalu tampil tanpa bocoran ulang tahun. Tombol terkunci `🔒 TUNGGU SAMPAI WAKTUNYA 🔒` bertransformasi menjadi `✦ OPEN HER GIFT 🎁 ✦`.
  2. **Layar 2 — Kotak Kado Berpendar (`gift`):** Menampilkan `✦ ADA SESUATU UNTUKMU ✦` dengan ilustrasi kotak kado coklat-emas berpendar yang bergetar dan meledakkan partikel saat diklik.
  3. **Layar 3 — Sampul *Your Special Day* (`hero`):** Dikelilingi 6 bingkai foto Polaroid miring di sisi kiri dan kanan serta tombol `✦ READ MY LETTER ✦`.
  4. **Layar 4 — Surat Cinta Efek Ketik (`letter`):** Judul *"Happy Birthday"* dengan kartu kaca gelap yang mengetikkan isi surat secara otomatis (*live typewriter effect* dengan kursor `|`) serta tombol `OUR MEMORIES →`.
  5. **Layar 5 — Dinding Polaroid Kenangan (`memories`):** Grid 8 kartu Polaroid miring interaktif dilengkapi *Lightbox Modal* saat diklik, serta tombol `A MOMENT FOR YOU →`.
  6. **Layar 6 — Pemutar Video / Kenangan (`video`):** Layar *"A Moment For You · a special video message"* dengan tombol Play bundar di tengah dan *timeline bar* di bawah (mendukung file `/videos/moment.mp4` maupun *fallback* otomatis berupa *Cinematic Memory Reel* dari foto galeri).
  7. **Layar 7 — Penutup *With All My Love* (`closing`):** Animasi ketik berubah dari *"Happy Birthday"* menjadi *"With All My Love"*, pesan penutup *"Forever yours, 🤍"*, tombol `↺ REPLAY FROM START`, serta pintasan ke Balas WhatsApp (`/balas`) dan Amplop Masa Depan (`/kenangan`).
- **Pop-up Musik di Sudut Kanan Bawah ([`MiniPlayer.tsx`](file:///d:/KULIAH%20BISDIG/SKRIPSI/UMUM/specialtou/app/components/MiniPlayer.tsx)):**
  - Dipindahkan ke pojok kanan bawah (`bottom: 20px; right: 20px;`) dengan kapsul lingkaran *Play/Pause*, animasi *equalizer bar*, dan kartu *pop-up* kaca saat diklik.

---

## [Pembaruan] — 27 Oktober 2026

### 💌 1. Perbaikan Desain & Konten Halaman Surat Ucapan (`/ucapan`)
- **Format Kotak Surat Tidak Memanjang:**
  - Menghilangkan tampilan kotak yang sebelumnya melebar ke seluruh lebar layar.
  - Membungkus halaman dengan `.ucapan-container` (`max-width: 440px`) dan kartu surat proporsional `.letter-parchment-card` (`max-width: 400px`) yang terpusat rapi dan nyaman dibaca di mobile maupun desktop.
- **Visual Kertas Surat Klasik (*Romantic Parchment Stationery*):**
  - Mengimplementasikan bingkai ganda bergaya jahitan tepi (*stitched inner frame*).
  - Menambahkan ornamen stempel segel lilin monogram **"J"** bertabur kilau emas (*wax seal motif*).
  - Menambahkan stempel tanggal elegan: `8 November 2026 · Hari yang Paling Berharga ✨`.
  - Menambahkan garis pembatas floral flourish SVG di bawah badan surat.
- **Penyempurnaan Kata-kata & Emoji Surat:**
  - Menyusun ulang 4 paragraf surat dengan bahasa yang lebih puitis, tulus, hangat, dan menyentuh hati.
  - Menyelaraskan penempatan emoji emosional yang manis (`🎂`, `✨`, `🌸`, `🤍`, `☕`, `📜`, `🌻`, `🤲`, `🌈`, `💌`, `🕊️`).
  - Menambahkan salam pembuka resmi: *"Untuk: Joice Omasi Angelita Harefa Tersayang 🤍"*.
  - Menambahkan salam penutup dan tanda tangan: *"Dengan segenap doa, cinta, dan ketulusan — Dari seseorang yang selalu bangga atas setiap langkahmu 🤍✨"*.
- **Navigasi Terintegrasi:**
  - Menambahkan tombol aksi langsung menuju halaman kejutan: *"Buka Kejutan Spesial 🎁 →"*.

---

### 🏝️ 2. Pemutar Musik Bawah Gaya "Dynamic Island" (`app/components/MiniPlayer.tsx`)
- **Masalah Sebelumnya:** Mini-player lama berukuran penuh dan menutupi sebagian teks atau konten saat pengguna membaca halaman.
- **Solusi Dynamic Island:**
  - **Mode Kompak (Default):**
    - Berwujud kapsul pill melayang yang sangat ramping (tinggi hanya 42px, lebar ringkas ~175px - 270px) tepat di atas bilah navigasi bawah.
    - Sisi kiri dan kanan layar tetap **100% bersih dan bebas hambatan**, sehingga pengunjung dapat membaca surat, melihat galeri foto, atau membaca linimasa kenangan tanpa tertutup sama sekali!
    - Dilengkapi piringan vinyl mini berputar, indikator animasi gelombang equalizer dinamis (`island-eq-bars`), judul lagu bergulir, tombol putar/jeda langsung, dan ikon perluas.
  - **Mode Diperluas (*Expanded Card*):**
    - Ketika kapsul diketuk, ia bertransformasi secara mulus (*smooth morphing animation*) menjadi kartu kontrol audio lengkap.
    - Dilengkapi slider timeline (*scrub bar*) beserta penunjuk menit/detik lagu, tombol *Previous Track*, *Next Track*, *Play/Pause*, tombol perkecil (`▼`), serta tombol pintas menuju piringan hitam `/musik`.
  - **Interaksi Non-Intrusif:**
    - Mendukung deteksi klik di luar (*click outside*) dan tombol `Escape` untuk otomatis kembali ke mode kompak ramping.

---

### 📱 3. Optimalisasi Responsivitas Mobile-Friendly
- **Viewport & Theme Color:**
  - Menambahkan deklarasi `Viewport` di [`layout.tsx`](file:///d:/KULIAH%20BISDIG/SKRIPSI/UMUM/specialtou/app/app/layout.tsx) (`width=device-width, initial-scale=1, maximum-scale=1`) untuk mencegah zoom tak diinginkan pada perangkat mobile.
  - Menyetel warna browser status bar ponsel ke `#FAF3EB` (Cream Latte) agar menyatu serasi dengan warna latar website.
- **Pencegahan Konten Terpotong (*Bottom Spacing*):**
  - Memperbarui `padding-bottom` pada container utama `.page-shell` menjadi `150px`.
  - Memastikan konten paling bawah pada seluruh halaman (Cover, Beranda, Ucapan, Kejutan, Musik, Galeri, Kenangan, Balas) memiliki ruang lega dan tidak akan pernah tertutup oleh bilah navigasi maupun dynamic island.
- **Ukuran Area Sentuh (*Touch Target*):**
  - Seluruh tombol interaktif disesuaikan dengan standar minimal aksesibilitas mobile (40-44px).

---

### 🧪 4. Status Build & Verifikasi Teknis
- **TypeScript Typecheck (`npx tsc --noEmit`):**
  - Status: **Exit 0** (Tidak ada error tipe).
- **Next.js Static Build (`npm run build`):**
  - Status: **Exit 0** (Berhasil melakukan static export ke 9 rute):
    - `○ /` (Cover Countdown & Site Lock)
    - `○ /home` (Hub Menu)
    - `○ /ucapan` (Surat Parchment Klasik)
    - `○ /kejutan` (Kado Interaktif & Confetti)
    - `○ /musik` (Piringan Hitam & Dynamic Island)
    - `○ /galeri` (Album Polaroid & Cerita)
    - `○ /kenangan` (Linimasa Momen & Amplop Terkunci)
    - `○ /balas` (Form Balas WhatsApp)
    - `○ /_not-found` (Fallback 404)
- **Dev Server Status:**
  - Berjalan aktif di `http://localhost:3000`.

---

*File ini akan terus diperbarui untuk setiap penyesuaian kode atau konten selanjutnya.*
