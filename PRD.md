# PRD — Website Ucapan Ulang Tahun Joice Omasi Angelita Harefa

> **Versi:** 1.1 — FINAL
> **Status:** Siap development
> **Riwayat:** v0.1 draft → v0.2 konfirmasi awal → v1.0 konfirmasi lengkap → v1.1 final (nomor WA, kebijakan konten, target countdown)

---

## 1. Informasi Proyek

| Item | Keterangan |
|---|---|
| Nama Proyek | Website Ucapan Ulang Tahun Joice |
| Penerima | Joice Omasi Angelita Harefa |
| Tanggal Lahir | 8 November 2005 |
| Target Momen | Ulang tahun ke-21 — **8 November 2026, 00:00 WIB** |
| Tipe Website | Statis, personal, multi-halaman, tanpa proteksi login |
| Target Perangkat | Mobile-first |
| Domain | URL bawaan Vercel (usulan: `ultah-joice.vercel.app`) |
| Pemilik/Operator | Klien (edit konten manual via code) |

---

## 2. Keputusan Terkonfirmasi

| Aspek | Keputusan |
|---|---|
| Stack | Next.js (static export) + Vercel |
| Backend | Tidak ada (full statis) |
| Musik | File MP3 lokal di `/public` + player custom desain sendiri (play/pause/volume) |
| Struktur Halaman | Multi-halaman (hub + section terpisah) |
| Sampul | Hitung mundur menuju 8 Nov 2026 00:00 WIB + kunci situs sampai tanggal H |
| Pesan untuk Nanti | Dikunci per tanggal; Joice membuka sendiri di website |
| Ilustrasi | Dibuatkan (SVG/CSS nuansa coklat) |
| Atur Ucapan | Edit manual via code (file config terpusat) |
| Balas Ucapan | Deep link WhatsApp ke nomor **6281260284201** |
| Tema Visual | Coklat (mix soft/pastel coklat) |
| Jumlah Sub Fitur | 3 per fitur (diratakan) |
| Konten | Placeholder dulu; **klien isi manual sendiri** melalui config |

---

## 3. Arsitektur Teknis

- Next.js App Router dengan `output: 'export'` → deploy statis ke Vercel.
- Elemen `<audio>` global di root layout → musik tidak putus saat pindah halaman.
- Mini-player floating di semua halaman.
- Satu file config terpusat `content.config.ts` sebagai sumber seluruh konten.
- Aset foto & MP3 di `/public`; ilustrasi berupa komponen SVG.
- Pengecekan kunci tanggal dilakukan client-side (jam perangkat pengunjung), zona waktu WIB (UTC+7), dapat diubah di config.

### 3.1 Struktur Config (Final)

```ts
export const content = {
  recipient: {
    fullName: "Joice Omasi Angelita Harefa",
    callName: "Joice",
    birthDate: "2005-11-08",
  },
  siteLock: {
    enabled: true,
    unlockAt: "2026-11-08T00:00:00+07:00", // hitung mundur & buka situs
    bypassForTesting: false,               // set true saat uji coba pemilik
  },
  cover: {
    title: "PLACEHOLDER",
    subtitle: "PLACEHOLDER",
  },
  letter: {
    paragraphs: ["PLACEHOLDER"],
  },
  surprise: {
    secretMessage: "PLACEHOLDER",
  },
  music: {
    autoPlayAfterEnter: true,
    tracks: [
      // { title: "PLACEHOLDER", artist: "PLACEHOLDER", src: "/music/lagu1.mp3" }
    ],
  },
  gallery: [
    // { src: "/photos/placeholder.jpg", story: "PLACEHOLDER" }
  ],
  timeline: [
    // { date: "YYYY-MM-DD", title: "PLACEHOLDER", story: "PLACEHOLDER", isFavorite: false }
  ],
  futureMsgs: [
    // { label: "PLACEHOLDER", message: "PLACEHOLDER", unlockAt: "YYYY-MM-DDT00:00:00+07:00" }
  ],
  whatsapp: {
    number: "6281260284201",
  },
};
```

### 3.2 Kebijakan Konten

- Seluruh field konten dikirim dalam keadaan **placeholder**.
- Klien mengisi manual sendiri langsung di `content.config.ts` dan mengganti file di `/public`.
- Panduan pengisian disediakan pada Fase 4 (README langkah demi langkah).
- Tidak ada pengiriman konten tambahan ke developer setelah handover.

---

## 4. Struktur Halaman & Navigasi

| Route | Isi |
|---|---|
| `/` | Sampul Pembuka — nama Joice, hitung mundur D-H-M-S ke 8 Nov 2026 00:00 WIB, tombol "Buka Ucapan" (nonaktif saat terkunci) |
| `/home` | Hub utama — kartu menu menuju seluruh section |
| `/ucapan` | Surat & kata-kata romantis, tampilan lembut |
| `/kejutan` | Kado interaktif, pesan rahasia, efek confetti |
| `/musik` | Player musik penuh (custom design) |
| `/galeri` | Album foto, cerita tiap foto, ilustrasi dekoratif |
| `/kenangan` | Linimasa momen, momen favorit, Pesan untuk Nanti (terkunci tanggal) |
| `/balas` | Form balasan → kirim ke WhatsApp |

**Navigasi:**
- Bottom navigation bar (mobile): Beranda · Ucapan · Galeri · Kenangan · Balas
- Mini-player floating di semua halaman (tap → expand ke `/musik`)
- Kejutan & Musik terjangkau dari kartu di `/home`
- Transisi halaman halus (fade/slide)

---

## 5. Spesifikasi Fitur

### F0 — Halaman Ucapan (Core)

| Sub Fitur | Spesifikasi |
|---|---|
| Sampul Pembuka | Full-screen cover: nama Joice, tema ultah ke-21, countdown D-H-M-S menuju `siteLock.unlockAt`. Saat terkunci: tombol masuk nonaktif + pesan penahan. Flag `bypassForTesting` untuk uji pemilik. |
| Kata-kata Romantis | Halaman `/ucapan`: surat romantis bertahap dengan animasi muncul perlahan; isi dari config. |
| Tampilan Lembut | Palet coklat pastel, sudut membulat, shadow lembut, animasi halus, tipografi elegan. |

**Acceptance:** Cover tampil full-screen; countdown akurat ke 8 Nov 2026 00:00 WIB; tombol masuk aktif tepat pada tanggal H (atau saat bypass); navigasi ke hub lancar di mobile.

### F1 — Kejutan Kecil (FASE 1)

| Sub Fitur | Spesifikasi |
|---|---|
| Tombol Buka Kejutan | Kado interaktif di `/kejutan`; klik/tahan untuk membuka. |
| Pesan Rahasia | Muncul hanya setelah kado terbuka; isi dari config. |
| Efek Perayaan | Confetti/partikel nuansa coklat-cream saat terbuka. |

**Acceptance:** Klik kado → animasi terbuka → pesan rahasia tampil + confetti berjalan mulus di mobile.

### F2 — Musik Lembut (FASE 1)

| Sub Fitur | Spesifikasi |
|---|---|
| Putar & Jeda | Tombol play/pause desain sendiri + progress bar (seekable) + prev/next track. |
| Pilihan Lagu | Playlist dari config; indikator lagu aktif; ganti lagu dari mini-player maupun `/musik`. |
| Pengatur Suara | Volume slider custom + opsional mode loop. |

**Perilaku khusus:**
- Audio di root layout → musik berlanjut lintas halaman.
- `autoPlayAfterEnter: true` → musik mulai otomatis setelah tombol "Buka Ucapan" ditekan (memenuhi kebijakan autoplay browser).

**Acceptance:** Play/pause/volume/seek berfungsi; ganti lagu mulus; musik tidak restart saat pindah halaman.

### F3 — Galeri Foto (FASE 2)

| Sub Fitur | Spesifikasi |
|---|---|
| Album Foto | Grid polaroid/card di `/galeri`; lazy-loading; tap → tampil besar. |
| Cerita Tiap Foto | Cerita personal per foto (modal/detail view). |
| Gambar Ilustrasi | Ilustrasi SVG nuansa coklat sebagai dekorasi. |

**Acceptance:** Foto load lancar; cerita terbaca jelas; responsif di mobile.

### F4 — Kenangan Manis (FASE 2)

| Sub Fitur | Spesifikasi |
|---|---|
| Linimasa Momen | Timeline vertikal di `/kenangan` (tanggal, judul, cerita, opsional foto). |
| Momen Favorit | Item ber-`isFavorite: true` tampil sebagai card highlight spesial. |
| Pesan untuk Nanti | Amplop tersegel dengan `unlockAt` per pesan. Sebelum tanggal: gembok + label "Bisa dibuka pada …". Setelah tanggal: Joice klik untuk membuka (animasi unseal). |

**Acceptance:** Timeline scroll mulus; favorit terlihat menonjol; amplop terkunci sebelum tanggalnya dan terbuka setelahnya.

### F5 — Balas Ucapan (FASE 3)

| Sub Fitur | Spesifikasi |
|---|---|
| Tulis Balasan | Textarea di `/balas`. |
| Reaksi Cepat | Pill emoji (❤️ 🥹 😭 🎉 dll.) yang menempel pada pesan. |
| Ucapan Terkirim | Tombol kirim → buka `https://wa.me/6281260284201?text=…` (pesan + reaksi terisi otomatis) → UI menampilkan state "Terkirim ✓". |

**Acceptance:** Tulis balasan + pilih emoji → kirim → WhatsApp terbuka dengan teks terisi ke nomor 6281260284201 → UI menampilkan status terkirim.

### F6 — Atur Ucapan (FASE 4)

| Sub Fitur | Spesifikasi |
|---|---|
| Ganti Kata-kata | Edit seluruh teks via `content.config.ts`. |
| Kelola Foto | Ganti file `/public` + update config. |
| Pilih Lagu | Ganti/tambah MP3 di `/public/music` + update config. |

**Deliverable:** README panduan editing lengkap (teks, foto, lagu, tanggal kunci, bypass testing) agar klien dapat mengisi konten manual secara mandiri.

---

## 6. Design System

**Palet coklat:**

| Peran | Nama | Kode |
|---|---|---|
| Background | Cream Latte | `#FAF3EB` |
| Card | Soft Milk | `#FFF9F3` |
| Primary | Mocha | `#8B5E3C` |
| Secondary | Caramel | `#C89F7B` |
| Deep | Cocoa | `#5C4033` |
| Teks | Espresso | `#3B2A20` |

**Tipografi:** Playfair Display (judul) + Plus Jakarta Sans (isi).
**Gaya:** Sudut membulat, shadow lembut, animasi fade/float perlahan, aksen ilustrasi garis tipis coklat.

**Ilustrasi (dibuatkan, SVG nuansa coklat):**
1. Kado & balon — cover
2. Amplop surat & bunga — ucapan
3. Kue & confetti — kejutan
4. Piringan hitam / not — musik
5. Polaroid & rangka bunga — galeri
6. Pohon linimasa — kenangan
7. Pesawat kertas — balas

---

## 7. Roadmap

| Fase | Cakupan | Output |
|---|---|---|
| Fase 0 | Setup proyek, skeleton multi-halaman, navigasi, layout audio global, design system, cover + countdown + site-lock | Skeleton ter-deploy di Vercel |
| Fase 1 | Kejutan Kecil + Musik Lembut (player custom + mini-player) | Interaksi & musik berfungsi |
| Fase 2 | Galeri Foto + Kenangan Manis (timeline + pesan terkunci tanggal) | Konten visual & kenangan lengkap |
| Fase 3 | Balas Ucapan (integrasi WA 6281260284201) | Alur balasan berfungsi |
| Fase 4 | Atur Ucapan: rapikan config + README panduan editing manual | Handover mandiri ke klien |

---

## 8. Batasan & Risiko

1. **Autoplay browser:** audio hanya mulai setelah interaksi pengguna → diakali via tombol "Buka Ucapan".
2. **Ukuran MP3:** disarankan total < ±20 MB (bitrate 128 kbps cukup) agar deploy Vercel ringan.
3. **Lock tanggal client-side:** bersifat simbolis (dapat diakali user teknis) — diterima untuk penggunaan personal.
4. **Zona waktu:** default WIB (UTC+7); configurable.
5. **Tanpa backend:** balasan tidak tersimpan di situs; status "Terkirim" = konfirmasi UI setelah tombol kirim ditekan.
6. **Konten manual:** kelengkapan isi website bergantung pada pengisian config oleh klien setelah handover.

---

## 9. Status Akhir

- Seluruh keputusan produk telah dikonfirmasi dan dikunci.
- Nomor WhatsApp tujuan: **6281260284201** (final).
- Target countdown & buka situs: **8 November 2026, 00:00 WIB** (final).
- Konten: placeholder; klien isi manual via `content.config.ts` mengikuti README Fase 4.
- Development dapat dimulai dari **Fase 0**.

---

*Akhir dokumen — PRD v1.1 FINAL*