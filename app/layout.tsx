import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mayluapp6.0",
  description: "Nueva versión del ERP de Maylu Sushi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
      </head>
      <body>{children}</body>
    </html>
  );
}
