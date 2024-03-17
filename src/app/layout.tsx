import "@/styles/globals.css";
import { Inter } from "next/font/google";
import Nav from "@/comps/Nav";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

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
        className={`font-sans ${inter.variable} px-none min-h-screen bg-[#1c1c1c] text-white sm:px-6`}
      >
        <ToastContainer
          position="top-right"
          autoClose={5000}
          draggable
          pauseOnHover
          theme="dark"
        />
        <Nav />
        <div className="mt-4 px-2 sm:px-8">{children}</div>
      </body>
    </html>
  );
}
