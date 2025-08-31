import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ThumbPic - The World's First AI Design Agent",
  description:
    "Transform prompts into masterpieces with ThumbPic, the revolutionary AI design agent.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
