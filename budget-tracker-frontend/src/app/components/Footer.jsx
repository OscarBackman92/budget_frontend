export default function Footer() {
    return (
      <footer className="bg-gray-800 text-white text-center p-4 mt-10">
        <p>&copy; {new Date().getFullYear()} Budget Tracker. All Rights Reserved.</p>
      </footer>
    );
  }