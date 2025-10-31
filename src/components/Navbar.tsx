import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

type NavbarProps = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

const Navbar: React.FC<NavbarProps> = ({ search, setSearch }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-green-100 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src="/images/delite.webp"
            alt="HD highway delite"
            className="h-14 w-auto"
          />
        </Link>

        {/* Desktop Search */}
        <div className="hidden md:flex gap-2 items-center">
          <input
            type="search"
            placeholder="Search experiences"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 w-64 text-sm"
          />
          <button className="bg-yellow-400 rounded px-5 py-2 font-semibold text-white">
            Search
          </button>
        </div>

        {/* Mobile Menu Icon */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-3">
          <input
            type="search"
            placeholder="Search experiences"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 w-full mb-2 text-sm"
          />
          <button
            className="bg-yellow-400 w-full rounded px-5 py-2 font-semibold text-white"
            onClick={() => setMenuOpen(false)}
          >
            Search
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
