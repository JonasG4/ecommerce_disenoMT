import Navbar from "@/components/navs/navbar";
import Footer from "@/components/navs/footer";
export default function ClienteLayout({ children }) {
  return (
  <main className="flex flex-col min-h-full w-full justify-between bg-white">
  <Navbar />
  {children}
  <Footer />
  </main>);
}
