import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/Context/ThemeContext";

// Import use golbal:
import Menu from "@/components/Menu";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Truyện Hoàn - Trang đọc truyện hay",
  description: "Truyện Hoàn - Trang đọc truyện hay",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${robotoMono.variable}`}>
        <ThemeProvider>
          <Menu />
          <main className="main-content">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

