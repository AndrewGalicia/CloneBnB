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
import Search from "./components/NavBar/Search";
import SearchModal from "./components/modals/SearchModa";
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

  const formattedCurrentUser = currentUser ? {
    ...currentUser,
    createdAT: currentUser.createdAT.toISOString(),
    updatedAT: currentUser.updatedAT,
    emailVerified: currentUser.emailVerified ? currentUser.emailVerified : null
} : null;
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientOnly>
          <ToasterProvider />
          <SearchModal/>
          <RentModal />
          <LoginModal />
          <RegisterModal />
          <NavBar currentUser={formattedCurrentUser} />
        </ClientOnly>
        <div className="pt-40 md:pt-30 pb-20"> {/* Adjusted padding for the main content */}
          {children}
        </div>
      </body>
    </html>
  );
}
