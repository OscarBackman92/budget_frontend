import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import AuthProvider from "@/app/context/AuthContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        <AuthProvider>
          <Navbar />
          <main className="container mx-auto p-6">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
