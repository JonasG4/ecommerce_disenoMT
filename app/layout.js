import "../styles/globals.css";
import Siderbar from "./shared/siderbar";

export default function RootLayout({ children }) {
  return (
    <html>
      <head />
      <body className="w-full min-h-[100vh] flex flex-col bg-gray-300">
        <Siderbar />
        <div>{children}</div>
      </body>
    </html>
  );
}
