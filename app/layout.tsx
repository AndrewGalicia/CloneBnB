import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar/NavBar"
import ClientOnly from "./components/ClientOnly";
import RegisterModal from "./components/modals/RegisterModal";
import LoginModal from "./components/modals/LoginModal";
import RentModal from "./components/modals/RentModal"
import ToasterProvider from "./providers/provider";
import getCurrentUser from "./actions/getCurrentUser";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CloneBnB",
  description: "AirBnB Clone",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientOnly>
          <ToasterProvider />
          <RentModal />
          <LoginModal />
          <RegisterModal />
          <NavBar currentUser={currentUser} />
        </ClientOnly>
        <div className="pt-24 pb-20"> {/* Adjusted padding for the main content */}
          {children}
        </div>
      </body>
    </html>
  );
}
