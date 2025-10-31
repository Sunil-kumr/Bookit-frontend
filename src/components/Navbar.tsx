import { Link } from "react-router-dom";

type NavbarProps = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

const Navbar: React.FC<NavbarProps> = ({ search, setSearch }) => {
  return (
    <div className="flex bg-red-100 justify-between items-center mb-8 px-20 py-3">
      <div className="flex items-center">
        <Link to="/">
          <img
            src="/images/highway.jpg"
            alt="HD highway delite"
            className="h-16 w-auto mr-6"
          />
        </Link>
      </div>
      <div className="flex gap-2 items-center">
        <input
          type="search"
          placeholder="Search experiences"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-64 text-sm"
        />
        <button
          className="bg-yellow-400 rounded px-5 py-2 font-semibold text-white"
          onClick={() => {}}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default Navbar;
