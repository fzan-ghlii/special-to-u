# 🍫 Website Kejutan Sinematik — Joice Omasi Angelita Harefa

Website kejutan ulang tahun interaktif bergaya **Cinematic Dark Chocolate & Golden Starlight** untuk merayakan ulang tahun ke-21 **Joice Omasi Angelita Harefa** pada **8 November 2026, 00:00 WIB**.

Seluruh pengalaman dirancang dalam **7 Layar Interaktif Berurutan** di halaman utama (`/`), dilengkapi **partikel bintang & kilau emas 60fps**, **foto Polaroid melayang**, **surat cinta efek ketik (*typewriter*)**, **pemutar video/momen**, serta **pop-up musik di sudut kanan bawah**.

---

## 📑 Daftar Isi
1. [Alur 7 Layar Sinematik](#-alur-7-layar-sinematik)
2. [Cara Menjalankan di Komputer (Lokal)](#-cara-menjalankan-di-komputer-lokal)
3. [Pusat Pengaturan Konten (`app/content.config.ts`)](#-pusat-pengaturan-konten-appcontentconfigts)
   - [1. Mengatur Kunci Tanggal & Mode Uji Coba (Countdown)](#1-mengatur-kunci-tanggal--mode-uji-coba-countdown)
   - [2. Mengedit Kata-Kata di Setiap Layar](#2-mengedit-kata-kata-di-setiap-layar)
   - [3. Mengedit & Mengganti Foto Polaroid](#3-mengedit--mengganti-foto-polaroid)
   - [4. Mengedit & Mengganti Musik (Pop-up Sudut Kanan Bawah)](#4-mengedit--mengganti-musik-pop-up-sudut-kanan-bawah)
   - [5. Menambahkan atau Mengganti Video (*A Moment For You*)](#5-menambahkan-atau-mengganti-video-a-moment-for-you)
   - [6. Mengubah Judul Tab Browser & Preview Link WhatsApp](#6-mengubah-judul-tab-browser--preview-link-whatsapp)
4. [Panduan Deploy ke Vercel](#-panduan-deploy-ke-vercel)

---

## 🎬 Alur 7 Layar Sinematik

1. **Layar 1 — Hitung Mundur Misterius (*Her Special Day is Coming*)**
   Menampilkan 4 kotak hitung mundur kaca (`HARI : JAM : MENIT : DETIK`) tanpa membocorkan kejutan ulang tahun. Saat waktu habis (atau mode uji coba aktif), tombol berubah menjadi **`✦ OPEN HER GIFT 🎁 ✦`**.
2. **Layar 2 — Kotak Kado Berpendar (*Ada Sesuatu Untukmu*)**
   Kotak kado coklat-emas berpendar di tengah layar yang membuka tutupnya dengan ledakan partikel bintang & hati saat diklik, sekaligus otomatis memutar musik latar.
3. **Layar 3 — Sampul *Your Special Day***
   Dikelilingi **6 foto Polaroid yang bergerak melayang lembut** di sisi kiri dan kanan judul, dilengkapi tombol **`✦ READ MY LETTER ✦`**.
4. **Layar 4 — Surat Cinta Efek Ketik (*Happy Birthday*)**
   Kartu kaca gelap (*frosted glass*) yang mengetikkan paragraf ucapan ulang tahun secara otomatis karakter demi karakter, dilengkapi tombol **`OUR MEMORIES →`**.
5. **Layar 5 — Dinding Polaroid Kenangan (*Our Memories*)**
   Menampilkan seluruh **10 foto Polaroid** dalam susunan miring estetik. Setiap Polaroid dapat diklik untuk membuka *Lightbox* beserta cerita di balik foto.
6. **Layar 6 — Pemutar Video / Momen Spesial (*A Moment For You*)**
   Memutar video spesial (`/videos/moment.mp4`) dengan tombol *Play* bundar di tengah dan *timeline bar*. Jika file video belum dimasukkan, otomatis memutar *Slideshow Sinematik* dari ke-10 foto galeri.
7. **Layar 7 — Penutup (*With All My Love*)**
   Animasi judul ketik yang berubah dari *"Happy Birthday"* menjadi **"With All My Love"**, pesan penutup *"Forever yours, 🤍"*, dan tombol **`↺ REPLAY FROM START`**.

---

## 💻 Cara Menjalankan di Komputer (Lokal)

Buka terminal pada folder proyek ini (`d:\KULIAH BISDIG\SKRIPSI\UMUM\specialtou`), lalu jalankan:

```bash
npm run dev
```

Buka browser dan akses:
👉 **[http://localhost:3000](http://localhost:3000)**

---

## 🛠️ Pusat Pengaturan Konten (`app/content.config.ts`)

Hampir seluruh isi website diatur dari **satu file utama**:
📂 **[`app/content.config.ts`](file:///d:/KULIAH%20BISDIG/SKRIPSI/UMUM/specialtou/app/content.config.ts)**

Cukup buka file tersebut di VS Code, ubah teks di dalam tanda petik ganda `"..."`, lalu tekan **`Ctrl + S`** untuk menyimpan. Browser akan otomatis memperbarui tampilannya!

---

### 1. Mengatur Kunci Tanggal & Mode Uji Coba (Countdown)

Buka [`app/content.config.ts`](file:///d:/KULIAH%20BISDIG/SKRIPSI/UMUM/specialtou/app/content.config.ts#L22-L35) pada bagian `siteLock`:

```ts
siteLock: {
  enabled: true,
  unlockAt: "2026-11-08T00:00:00+07:00", // Target waktu buka (WIB)
  bypassForTesting: true, // true = tombol OPEN HER GIFT langsung aktif untuk pengetesan
},
```
- **Saat Anda sedang mencoba/mengedit website:** Biarkan `bypassForTesting: true`. Kotak hitung mundur akan **tetap tampil**, dan tombol **`✦ OPEN HER GIFT 🎁 ✦`** langsung bisa diklik.
- **Sebelum link dikirim ke Joice:** Ubah menjadi `bypassForTesting: false` lalu simpan (`Ctrl + S`). Tombol akan terkunci (`🔒 TUNGGU SAMPAI WAKTUNYA 🔒`) sampai tepat 8 November 2026 pukul 00:00 WIB.

---

### 2. Mengedit Kata-Kata di Setiap Layar

Semua teks per layar ada di [`app/content.config.ts`](file:///d:/KULIAH%20BISDIG/SKRIPSI/UMUM/specialtou/app/content.config.ts#L40-L82):

#### A. Kata-kata Layar 1 (Hitung Mundur Misterius)
```ts
cover: {
  eyebrow: "✦ MENGHITUNG WAKTU ✦",
  title: "Her Special Day",
  titleItalic: "is Coming",
  subtitle: "Sesuatu yang indah sedang menunggumu untukmu ♡",
  lockedStatus: "⏳ Menunggu detik-detik menuju waktunya... ♡",
  unlockedStatus: "✨ Hari yang ditunggu telah tiba! ♡",
  lockedButtonText: "TUNGGU SAMPAI WAKTUNYA",
  unlockedButtonText: "OPEN HER GIFT",
  lockMessage: "08 / 11 / 2026 · 00:00 WIB",
},
```

#### B. Kata-kata Layar 2 & 3 (Kotak Kado & *Your Special Day*)
```ts
giftScreen: {
  eyebrow: "✦ ADA SESUATU UNTUKMU ✦",
  hint: "✨ Klik untuk membuka kado ✨",
},

heroScreen: {
  eyebrow: "💌 ✦ A LOVE LETTER FOR YOU ✦",
  titleTop: "Your",
  titleBottom: "Special Day",
  subtitle: "Created with love, just for you",
  buttonText: "✦ READ MY LETTER ✦",
},
```

#### C. Kata-kata Layar 4 (Surat Cinta *Happy Birthday*)
Ubah sapaan dan paragraf surat pada bagian `letter`:
```ts
letter: {
  pageTitle: "Happy Birthday",
  greeting: "HAPPY BIRTHDAY JOICE SAYANGKUUU 🤍",
  paragraphs: [
    "Paragraf 1...",
    "Paragraf 2...",
    "Paragraf 3...",
  ],
  closing: "I love you, today, tomorrow, and always. 🤍",
  nextButtonText: "OUR MEMORIES →",
},
```
> 💡 Anda bebas menambah atau mengurangi jumlah paragraf di dalam `paragraphs: [ ... ]`.

#### D. Kata-kata Layar 7 (Penutup *With All My Love*)
```ts
closingScreen: {
  firstTitle: "Happy Birthday",       // Teks pertama yang diketik lalu dihapus
  finalTitle: "With All My Love",     // Teks akhir yang ditampilkan
  messageLine1: "Thank you for being part of my life, Joice.",
  messageLine2: "I hope this little gift can make your special day even more beautiful.",
  signOff: "Forever yours, 🤍",
  replayButtonText: "↺ REPLAY FROM START",
},
```

---

### 3. Mengedit & Mengganti Foto Polaroid

Saat ini terdapat **10 foto** (`1.jpeg` s/d `10.jpeg`) di dalam folder:
📂 **`app/public/photos/`**

- **6 foto pertama (`1.jpeg` – `6.jpeg`)** otomatis tampil melayang & bergerak di **Layar 3 (*Your Special Day*)**.
- **Kesepuluh foto (`1.jpeg` – `10.jpeg`)** tampil di **Layar 5 (*Our Memories*)** dan di *Lightbox* saat foto diklik.

#### Cara mengganti foto atau mengubah cerita di bawah foto:
1. Taruh file foto baru Anda di folder `app/public/photos/` (bisa menimpa nama `1.jpeg` s/d `10.jpeg` atau menggunakan nama file baru).
2. Buka [`app/content.config.ts`](file:///d:/KULIAH%20BISDIG/SKRIPSI/UMUM/specialtou/app/content.config.ts#L88-L139) pada bagian `gallery`, lalu sesuaikan `src` dan `story` (cerita singkat untuk masing-masing foto):
   ```ts
   gallery: [
     {
       src: "/photos/1.jpeg",
       story: "Tulis cerita kenangan untuk foto pertama di sini...",
     },
     {
       src: "/photos/2.jpeg",
       story: "Tulis cerita kenangan untuk foto kedua di sini...",
     },
     // ...dst
   ],
   ```

---

### 4. Mengedit & Mengganti Musik (Pop-up Sudut Kanan Bawah)

File lagu MP3 disimpan di dalam folder:
📂 **`app/public/music/`**

Saat ini sudah terdaftar 3 lagu:
1. `lany.mp3` — **you!** (*LANY*)
2. `overnight.mp3` — **Kita Lewati Berdua** (*Overnight*)
3. `yahya.mp3` — **keepyousafe** (*Yahya*)

#### Cara menambah, mengganti, atau mengubah urutan lagu:
1. Masukkan file `.mp3` Anda ke folder `app/public/music/`.
2. Buka [`app/content.config.ts`](file:///d:/KULIAH%20BISDIG/SKRIPSI/UMUM/specialtou/app/content.config.ts#L168-L186) pada bagian `music.tracks`:
   ```ts
   music: {
     autoPlayAfterEnter: true,
     tracks: [
       {
         title: "you!",
         artist: "LANY",
         src: "/music/lany.mp3", // Lagu urutan pertama otomatis diputar saat buka kado
       },
       {
         title: "Kita Lewati Berdua",
         artist: "Overnight",
         src: "/music/overnight.mp3",
       },
       {
         title: "keepyousafe",
         artist: "Yahya",
         src: "/music/yahya.mp3",
       },
     ],
   },
   ```
> 💡 Lagu pada urutan paling atas (`tracks[0]`) adalah lagu yang otomatis berputar pertama kali ketika tombol **`OPEN HER GIFT`** diklik.

---

### 5. Menambahkan, Mengganti, atau Mengatur Video (*A Moment For You*)

Pada **Layar 6 (*A Moment For You*)**, website mendukung **playlist video interaktif** yang dapat memutar banyak video sekaligus:

1. Taruh file video Anda di folder:
   📂 **`app/public/videos/`** (contoh: `1.mp4`, `2.mp4`, `3.mp4`, `4.mp4`).
2. Konfigurasikan daftar video di [`app/content.config.ts`](file:///d:/KULIAH%20BISDIG/SKRIPSI/UMUM/specialtou/app/content.config.ts#L140-L190) pada bagian `videoMoment.items`:
   ```ts
   videoMoment: {
     title: "A Moment For You",
     subtitle: "✦ a collection of special moments for you ✦",
     items: [
       {
         id: 1,
         title: "Momen 01",
         label: "Video 1",
         src: "/videos/1.mp4",
         poster: "/photos/1.jpeg", // Foto poster thumbnail
         caption: "Sepotong momen manis yang selalu terekam indah untukmu 🤍",
       },
       {
         id: 2,
         title: "Momen 02",
         label: "Video 2",
         src: "/videos/2.mp4",
         poster: "/photos/2.jpeg",
         caption: "Setiap tawa dan senyuman yang selalu menghangatkan hati ✨",
       },
       {
         id: 3,
         title: "Momen 03",
         label: "Video 3",
         src: "/videos/3.mp4",
         poster: "/photos/3.jpeg",
         caption: "Cerita kecil kita yang selalu berarti lebih dari segalanya 🌸",
       },
       {
         id: 4,
         title: "Momen 04",
         label: "Video 4",
         src: "/videos/4.mp4",
         poster: "/photos/4.jpeg",
         caption: "Terima kasih untuk setiap detik berharga yang kita lalui bersama 🤍",
       },
     ],
     nextButtonText: "BIRTHDAY WISHES →",
   },
   ```
> ✨ **Fitur Pemutar Video:**
> - **Playlist Selector Tab:** Joice dapat memilih `01 Momen 01`, `02 Momen 02`, dll langsung lewat tombol kapsul di atas video.
> - **Tombol Skip Sebelumnya & Selanjutnya (`⏮` / `⏭`):** Memudahkan berpindah antar video langsung di kontrol bar.
> - **Otomatis Lanjut (*Auto-Next*):** Saat video selesai diputar, video selanjutnya otomatis diputar berurutan.
> - **Klik Linimasa (*Timeline Scrubbing*):** Menggeser durasi video dengan mengeklik bar progres.
> - **Fallback Aman:** Jika salah satu file video belum siap, otomatis memutar *Slideshow Polaroid Sinematik* sehingga tampilan tetap estetik tanpa error!

---

### 6. Mengubah Judul Tab Browser & Preview Link WhatsApp

Jika Anda ingin mengubah judul yang tampil di tab browser atau saat link dikirim lewat chat WhatsApp, buka file:
📂 **[`app/app/layout.tsx`](file:///d:/KULIAH%20BISDIG/SKRIPSI/UMUM/specialtou/app/app/layout.tsx#L13-L24)**

```ts
export const metadata: Metadata = {
  title: "Sebuah Rahasia Kecil · Untukmu, Joice 🤍",
  description:
    "Ada sesuatu yang tersimpan rapat di balik halaman ini, dirangkai khusus untukmu. Hanya waktu yang bisa membukanya...",
};
```

---

## 🚀 Panduan Deploy ke Vercel

1. Pastikan di [`app/content.config.ts`](file:///d:/KULIAH%20BISDIG/SKRIPSI/UMUM/specialtou/app/content.config.ts#L34) nilai `bypassForTesting` sudah dikembalikan ke **`false`** jika ingin mengunci situs sampai 8 November 2026 pukul 00:00 WIB.
2. Upload proyek ini ke repositori GitHub Anda.
3. Buka **[vercel.com](https://vercel.com)** → klik **"Add New Project"** → pilih repositori GitHub Anda.
4. Pada bagian **Root Directory**, klik **Edit** lalu pilih folder **`app`**.
5. Klik **Deploy** — selesai! Website kejutan siap dibagikan ke Joice. 🍫✨
