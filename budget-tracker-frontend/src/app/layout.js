import "../styles/globals.css"; // ✅ Adjusted import for styles
import Navbar from "../components/Navbar"; // ✅ Fixed path
import Footer from "../components/Footer"; // ✅ Fixed path

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        <Navbar />
        <main className="container mx-auto p-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
