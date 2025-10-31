import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
const Navbar = ({ search, setSearch }) => {
    return (_jsxs("div", { className: "flex bg-red-100 justify-between items-center mb-8 px-20 py-3", children: [_jsx("div", { className: "flex items-center", children: _jsx(Link, { to: "/", children: _jsx("img", { src: "/images/highway.jpg", alt: "HD highway delite", className: "h-16 w-auto mr-6" }) }) }), _jsxs("div", { className: "flex gap-2 items-center", children: [_jsx("input", { type: "search", placeholder: "Search experiences", value: search, onChange: (e) => setSearch(e.target.value), className: "border border-gray-300 rounded px-4 py-2 w-64 text-sm" }), _jsx("button", { className: "bg-yellow-400 rounded px-5 py-2 font-semibold text-white", onClick: () => { }, children: "Search" })] })] }));
};
export default Navbar;
