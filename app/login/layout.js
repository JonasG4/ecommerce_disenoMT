import "../../styles/globals.css";

export default function LoginLayout({ children }) {
  return (
    <html>
      <head />
      <body className="min-h-[100vh] flex flex-col">{children}</body>
    </html>
  );
}
