import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Checkout from "./pages/Checkout";
import Confirmation from "./components/Confirmation";
import Result from "./pages/Result";
import Navbar from "./components/Navbar";
function App() {
    const [search, setSearch] = useState("");
    return (_jsxs(BrowserRouter, { children: [_jsx(Navbar, { search: search, setSearch: setSearch }), _jsx("div", { className: "pt-[72px]", children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Home, { search: search, setSearch: setSearch }) }), _jsx(Route, { path: "/details/:id", element: _jsx(Details, {}) }), _jsx(Route, { path: "/checkout", element: _jsx(Checkout, {}) }), _jsx(Route, { path: "/confirmation", element: _jsx(Confirmation, {}) }), _jsx(Route, { path: "/result", element: _jsx(Result, {}) }), _jsx(Route, { path: "*", element: _jsx("div", { children: "404 Not Found" }) })] }) })] }));
}
export default App;
