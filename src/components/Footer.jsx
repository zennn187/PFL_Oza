export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-4 mt-auto">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400">
        <p>© 2026 E-Catering. All rights reserved.</p>
        <div className="flex gap-4 mt-2 sm:mt-0">
          <a href="#" className="hover:text-gray-600">Privacy Policy</a>
          <a href="#" className="hover:text-gray-600">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}