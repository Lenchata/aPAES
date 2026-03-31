import type { Metadata } from "next";
import { Inter, Outfit, Bowlby_One } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const bowlbyOne = Bowlby_One({ weight: "400", subsets: ["latin"], variable: "--font-bowlby" });

export const metadata: Metadata = {
  title: "aPAES | Entrenamiento Inteligente",
  description: "Procesa tus PDFs de ensayos PAES y prepárate con herramientas digitales avanzadas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} ${outfit.variable} ${bowlbyOne.variable} font-inter antialiased bg-[#dadaec] text-black`}>
        {children}
      </body>
    </html>
  );
}
