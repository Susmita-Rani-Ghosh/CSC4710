import "@/styles/globals.css";
import Head from "next/head";
import { Inter } from "next/font/google";
import Nav from "@/comps/Nav";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "CSC4710",
  description: "Intro to Database Project",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`font-sans ${inter.variable} px-none bg-[#1c1c1c] text-white sm:px-6`}
      >
        <Nav />
        <div className="mt-4 px-2 sm:px-8">{children}</div>
      </body>
    </html>
  );
}
