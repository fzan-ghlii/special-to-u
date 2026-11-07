import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AudioProvider } from "@/components/AudioProvider";
import { MiniPlayer } from "@/components/MiniPlayer";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#1A100A",
};

export const metadata: Metadata = {
  title: "Sebuah Rahasia Kecil · Untukmu, Joice 🤍",
  description:
    "Ada sesuatu yang tersimpan rapat di balik halaman ini, dirangkai khusus untukmu. Hanya waktu yang bisa membukanya...",
  keywords: ["Joice", "rahasia kecil", "untukmu", "special to you"],
  openGraph: {
    title: "Sebuah Rahasia Kecil · Untukmu, Joice 🤍",
    description:
      "Ada sesuatu yang tersimpan rapat di balik halaman ini, khusus untukmu.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>
        <AudioProvider>
          <main>{children}</main>
          <MiniPlayer />
        </AudioProvider>
      </body>
    </html>
  );
}
