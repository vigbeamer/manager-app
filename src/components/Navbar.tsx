import { Home, Settings } from "lucide-react";
import { Link } from "react-router-dom";

interface NavbarProps {
  currentPage: "home" | "settings";
}

export function Navbar({ currentPage }: NavbarProps) {
  return (
    <nav className="bg-gray-900 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <div className="text-xl font-bold text-white">IManage</div>
            <div className="flex gap-1">
              <Link
                to="/"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  currentPage === "home"
                    ? "bg-gray-800 text-white"
                    : "text-gray-400 hover:text-white hover:bg-gray-800"
                }`}
              >
                <Home size={18} />
                <span>Home</span>
              </Link>
              <Link
                to="/settings"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  currentPage === "settings"
                    ? "bg-gray-800 text-white"
                    : "text-gray-400 hover:text-white hover:bg-gray-800"
                }`}
              >
                <Settings size={18} />
                <span>Settings</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
