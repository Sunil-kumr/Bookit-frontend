import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
export default function Result() {
    const navigate = useNavigate();
    return (_jsx("main", { className: "p-8 flex flex-col items-center justify-center h-[60vh]", children: _jsxs("div", { className: "flex flex-col gap-4 items-center", children: [_jsx("div", { className: "rounded-full bg-green-100 p-8", children: _jsx("svg", { className: "w-8 h-8 text-green-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 12l2 2 4-4" }) }) }), _jsx("h1", { className: "text-2xl font-bold", children: "Booking Confirmed" }), _jsx("div", { className: "text-gray-500", children: "Ref ID: HUF56&SO" }), _jsx("button", { className: "bg-gray-200 text-black px-6 py-2 rounded font-semibold", onClick: () => navigate("/"), children: "Back to Home" })] }) }));
}
