import type { Metadata } from "next";
import "./globals.css";
import { Header } from "./components/Header"

export const metadata: Metadata = {
  title: "Nebrija Social",
  description: "Clon de red social",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}