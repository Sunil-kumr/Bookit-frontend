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

  return (
    <BrowserRouter>
      <Navbar search={search} setSearch={setSearch} />
      <div className="pt-[72px]">
        <Routes>
          {/* Pass search to Home with either context or props if filtering should still work */}
          <Route path="/" element={<Home search={search} setSearch={setSearch} />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/result" element={<Result />} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
