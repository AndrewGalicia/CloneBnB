
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar/NavBar"
import ClientOnly from "./components/ClientOnly";
import Modal from "./components/modals/Modal";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CloneBnB",
  description: "AirBnB Clone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientOnly>
          <Modal isOpen/>
          <NavBar/>
        </ClientOnly>
        {children}
      </body>
    </html>
  );
}
