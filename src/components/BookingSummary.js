import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function BookingSummary({ subtotal, taxes, total }) {
    return (_jsxs("aside", { className: "bg-white w-80 p-4 rounded shadow", children: [_jsx("div", { className: "font-bold mb-4", children: "Summary" }), _jsxs("div", { className: "flex justify-between my-1", children: [_jsx("span", { children: "Subtotal:" }), _jsxs("span", { children: ["\u20B9", subtotal] })] }), _jsxs("div", { className: "flex justify-between my-1", children: [_jsx("span", { children: "Taxes:" }), _jsxs("span", { children: ["\u20B9", taxes] })] }), _jsxs("div", { className: "font-bold flex justify-between mt-4 border-t pt-2", children: [_jsx("span", { children: "Total:" }), _jsxs("span", { children: ["\u20B9", total] })] })] }));
}
