import "../styles/globals.css";
import Siderbar from "./shared/siderbar";
import Navbar from "./shared/navbar";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  subsets: ['latin'],
  variable: '--font-roboto',
  display: 'swap'
})

export const metadata = {
  title: "Diseños MT"
}

export default function RootLayout({ children }) {
  return (
    <html>
      <head />
      <body className={`${roboto.variable} font-sans w-full min-h-screen flex bg-gray-200 over flow-hidden`}>
        <Siderbar />
        <div className="w-full h-screen overflow-hidden">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}
