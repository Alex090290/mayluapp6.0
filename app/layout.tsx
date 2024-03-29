import type { Metadata } from "next";
import "./globals.css";
import "bootswatch/dist/cyborg/bootstrap.css";
import "react-toastify/ReactToastify.css";
import TopNav from "@/components/navigation/TopNav";

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
        <link
          rel="shortcut icon"
          href="/images/favicon.ico"
          type="image/x-icon"
        />
      </head>
      <body>
        <main className="container-fluid vh-100 bg-gradient">
          <TopNav />
          <div
            style={{ height: "92vh", overflowY: "auto" }}
            id="pages-container"
            className="container-fluid main-logo"
          >
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
