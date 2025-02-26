import "../styles/globals.css"; // ✅ Ensure global styles
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/app/context/AuthContext"; // ✅ Import AuthContext

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        <AuthProvider> {/* ✅ Wrap everything inside AuthProvider */}
          <Navbar />
          <main className="container mx-auto p-6">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
