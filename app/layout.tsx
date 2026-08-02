import { DM_Sans, Instrument_Sans, JetBrains_Mono, Space_Grotesk, Syne } from "next/font/google";
import type { Metadata } from "next";
import { ConfirmProvider } from "@/components/ui/ConfirmDialog";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700", "800"],
});

const instrument = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Studio Infografías LinkedIn",
  description: "Carruseles 1080×1080 con estilo propio y export PDF",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${syne.variable} ${instrument.variable} ${jetbrains.variable} ${spaceGrotesk.variable} ${dmSans.variable} h-full`}
    >
      <body
        className="min-h-full bg-[#0b1015] font-[family-name:var(--font-body)] text-[#e8eef4] antialiased"
        suppressHydrationWarning
      >
        <ConfirmProvider>{children}</ConfirmProvider>
      </body>
    </html>
  );
}
