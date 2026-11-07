/**
 * ==============================================================================
 * 🍫 PANDUAN PENGATURAN KONTEN WEBSITE KEJUTAN JOICE OMASI ANGELITA HAREFA 🍫
 * ==============================================================================
 *
 * File ini adalah PUSAT KONTEN dari seluruh website sinematik bertema Dark Chocolate.
 * Anda dapat mengedit teks, mengelola foto polaroid, memilih musik, mengatur video,
 * dan mengatur tanggal buka situs di sini.
 */

export const content = {
  // ============================================================================
  // 1. DATA PENERIMA
  // ============================================================================
  recipient: {
    fullName: "Joice Omasi Angelita Harefa",
    callName: "Joice",
    birthDate: "2005-11-08",
  },

  // ============================================================================
  // 2. PENGUNCIAN SITUS & HITUNG MUNDUR MISTERIUS (SITE LOCK & COUNTDOWN)
  // ============================================================================
  siteLock: {
    enabled: true, // true: website terkunci sebelum unlockAt; false: langsung terbuka

    // Target tanggal & jam buka situs (WIB = UTC+7)
    unlockAt: "2026-11-08T00:00:00+07:00", // Tepat 8 November 2026 00:00 WIB

    // 💡 TIPS PENGUJIAN:
    // Ubah `bypassForTesting: true` saat Anda ingin mencoba klik tombol "OPEN HER GIFT"
    // dan menjelajah seluruh alur kejutan sebelum tanggal 8 November 2026.
    // Hitung mundur akan TETAP TAMPIL meskipun `bypassForTesting: true`.
    // SEBELUM DIBERIKAN KE JOICE: Pastikan kembalikan ke `bypassForTesting: false`!
    bypassForTesting: false,
  },

  // ============================================================================
  // 3. LAYAR 1 — HITUNG MUNDUR MISTERIUS (TANPA SPOILER ULTAH)
  // ============================================================================
  cover: {
    eyebrow: "✦ MENGHITUNG WAKTU ✦",
    title: "Something Special",
    titleItalic: "is Coming",
    subtitle: "For My Lovely, Sweetnest,and Adorable Girl♡",
    lockedStatus: "⏳ Menunggu detik-detik menuju waktunya... ♡",
    unlockedStatus: "✨ Hari special telah tiba! ♡",
    lockedButtonText: "TUNGGU SAMPAI WAKTUNYA",
    unlockedButtonText: "OPEN YOUR GIFT",
    lockMessage: "08 / 11 / 2026 · 00:00 WIB",
  },

  // ============================================================================
  // 4. LAYAR 2 & 3 — KOTAK KADO & SAMPUL POLAROID ("YOUR SPECIAL DAY")
  // ============================================================================
  giftScreen: {
    eyebrow: "✦ ADA SESUATU BUAT KAMU ✦",
    hint: "✨ Klik untuk membuka kado ✨",
  },

  heroScreen: {
    eyebrow: "💌 ✦ A LOVE LETTER FOR YOU ✦",
    titleTop: "Your",
    titleBottom: "Special Day",
    subtitle: "Created with love, just for you",
    buttonText: "✦ READ MY LETTER ✦",
  },

  // ============================================================================
  // 5. LAYAR 4 — SURAT ROMANTIS TYPEWRITER ("HAPPY BIRTHDAY")
  // ============================================================================
  letter: {
    pageTitle: "Happy Birthday",
    greeting: "HAPPY BIRTHDAY JOICE KESAYANGAN AKUU 🤍",
    date: "8 November 2026 · Hari yang Paling Berharga ✨",
    paragraphs: [
      "Selamat ulang tahun yang ke-21 yaa, sayangkuuuu! 🤍 Di umur yang baru ini, aku cuma mau doain semoga kamu selalu diberi kesehatan, selalu happy terus setiap hari, dan sukses pastinya. Semoga dilancarkan proses skripsinya sampai tuntas nanti, dimudahkan segala urusan dan langkahmu, serta selalu dikelilingi oleh orang-orang yang tulus dan baik sama kamu.",
      "Aku bener-bener bangga bangeeet sama kamu. Kamu itu keren banget, sayanggg! Terima kasih yaa sudah selalu bertanggung jawab atas setiap tugas-tugasmu, selalu berusaha memberikan yang terbaik, dan berjuang sejauh ini dengan hatimu yang begitu baik.",
      "Pesan aku, tolong selalu jaga kesehatan ya sayangg. Aku tahu terkadang kamu suka merasa insecure atau ngerasa belum sesempurna itu, tapi aku mau kamu selalu ingat satu hal: di mataku, kamu itu luar biasa hebattt. Kamu jauh lebih kuat, lebih hebat, dan lebih berharga dari apa yang pernah kamu pikirkan tentang dirimu sendiri. Jangan pernah ragu, karena ada banyak banget orang yang sayang sama kamu dan aku akan selalu ada di sini buat kamu.",
      "Sama seperti yang pernah kamu bilang, bertemu kamu adalah salah satu hal terbaik yang pernah terjadi di dalam hidupku. Aku mau kita bisa terus sama-sama, saling menemani, saling menguatkan, dan bertumbuh bareng melewati setiap bab cerita ke depan.",
      "Sekali lagi, happy birthday yaa sayangggku, Joice Omasi Angelita Harefa. 🤍 Semoga hari ini penuh dengan senyuman dan tawa bahagiamu.",
    ],
    closing: "I love you so much, always... and remember, I love you more. 🫶🏻✨",
    signature: "Dari seseorang yang selalu bangga atas setiap langkahmu 🤍",
    nextButtonText: "OUR MEMORIES →",
  },

  // ============================================================================
  // 6. LAYAR 5 — GALERI FOTO POLAROID ("OUR MEMORIES")
  // ============================================================================
  // Menggunakan 10 foto asli dari folder: app/public/photos/ (1.jpeg s/d 10.jpeg)
  gallery: [
    {
      src: "/photos/1.jpeg",
      story: "Momen indah yang selalu tersimpan hangat di dalam ingatan.",
    },
    {
      src: "/photos/2.jpeg",
      story: "Senyum manis yang selalu bisa menghangatkan hari-hari yang lelah.",
    },
    {
      src: "/photos/3.jpeg",
      story: "Perjalanan bersama saat kita berbagi banyak cerita dan tawa.",
    },
    {
      src: "/photos/4.jpeg",
      story: "Tawa lepas yang selalu dirindukan di setiap waktu.",
    },
    {
      src: "/photos/5.jpeg",
      story: "Tatapan hangat yang membuat waktu seolah berhenti sejenak.",
    },
    {
      src: "/photos/6.jpeg",
      story: "Langkah kecil kita menyusuri tempat-tempat penuh kenangan.",
    },
    {
      src: "/photos/7.jpeg",
      story: "Setiap detik bersamamu selalu layak untuk dikenang selamanya.",
    },
    {
      src: "/photos/8.jpeg",
      story: "Terima kasih telah menjadi bagian terindah dalam setiap musim.",
    },
    {
      src: "/photos/9.jpeg",
      story: "Kebersamaan sederhana yang selalu terasa begitu istimewa.",
    },
    {
      src: "/photos/10.jpeg",
      story: "Semoga akan ada ribuan kenangan manis lainnya untuk kita ke depan 🤍",
    },
  ] as { src: string; story: string }[],

  // ============================================================================
  // 7. LAYAR 6 — VIDEO KENANGAN ("A MOMENT FOR YOU")
  // ============================================================================
  // Terdapat 4 file video di folder: app/public/videos/ (1.mp4, 2.mp4, 3.mp4, 4.mp4)
  // Dilengkapi playlist interaktif sehingga Joice dapat menonton seluruh momen dengan mulus.
  videoMoment: {
    title: "A Moment For You",
    subtitle: "✦ a collection of special moments for you ✦",
    items: [
      {
        id: 1,
        title: "Jalan-jalan ke Brastagii",
        label: "Video 1",
        src: "/videos/4.mp4",
        poster: "/photos/7.jpeg",
        caption: "Sepotong momen manis yang selalu terekam indah untukmu 🤍",
      },
      {
        id: 2,
        title: "RUPS Dateee",
        label: "Video 2",
        src: "/videos/3.mp4",
        poster: "/photos/4.jpeg",
        caption: "Setiap tawa dan senyuman yang selalu menghangatkan hati ✨",
      },
      {
        id: 3,
        title: "Movie datee sekaligus photobooth",
        label: "Video 3",
        src: "/videos/2.mp4",
        poster: "/photos/2.jpeg",
        caption: "Cerita kecil kita yang selalu berarti lebih dari segalanya 🌸",
      },
      {
        id: 4,
        title: "Night Ride sambil menikmati Citylight Medan",
        label: "Video 4",
        src: "/videos/1.mp4",
        poster: "/photos/5.jpeg",
        caption: "Terima kasih untuk setiap detik berharga yang kita lalui bersama 🤍",
      },
    ] as {
      id: number;
      title: string;
      label: string;
      src: string;
      poster: string;
      caption: string;
    }[],
    // Fallback single-video
    videoSrc: "/videos/1.mp4",
    posterSrc: "/photos/1.jpeg",
    caption: "Sepotong momen berharga yang tersimpan khusus untuk hari spesialmu 🤍",
    nextButtonText: "BIRTHDAY WISHES →",
  },

  // ============================================================================
  // 8. LAYAR 7 — PENUTUP ("WITH ALL MY LOVE")
  // ============================================================================
  closingScreen: {
    firstTitle: "Happy Birthday",
    finalTitle: "With All My Love",
    messageLine1: "Terima kasih sudah hadir dan menjadi bagian terindah dalam hidupku, Omasi.",
    messageLine2:
      "I love you so much, and remember... I love you more. 🫶🏻✨",
    signOff: "Forever and always yours, 🤍",
    replayButtonText: "↺ REPLAY FROM START",
  },

  // ============================================================================
  // 9. MUSIK LATAR & POP-UP SUDUT KANAN BAWAH
  // ============================================================================
  // Menggunakan 3 lagu dari folder: app/public/music/ (lany.mp3, overnight.mp3, yahya.mp3)
  music: {
    autoPlayAfterEnter: true,
    tracks: [
      {
        title: "you!",
        artist: "LANY",
        src: "/music/lany.mp3",
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
    ] as { title: string; artist: string; src: string }[],
  },
};
