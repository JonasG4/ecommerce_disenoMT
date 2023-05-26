import "../styles/globals.css";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
  display: "swap"
});

export const metadata = {
  title: "Comercial Eben-Ezer",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <head />
      <body
        className={`${roboto.className} w-full min-h-screen flex bg-gray-200 over flow-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
