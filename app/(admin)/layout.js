import Siderbar from "@/app/shared/siderbar";
import Navbar from "@/app/shared/navbar";

export default function AdminLayout({ children }) {
  return (
    <>
      <Siderbar />
      <div className="w-full h-screen overflow-hidden">
        <Navbar />
        {children}
      </div>
    </>
  );
}
