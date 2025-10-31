import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
const Checkout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const booking = location.state?.booking;
    useEffect(() => {
        if (!booking)
            navigate("/");
    }, [booking, navigate]);
    if (!booking)
        return null;
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [promo, setPromo] = useState("");
    const [agree, setAgree] = useState(false);
    const [discount, setDiscount] = useState(0);
    const [submitError, setSubmitError] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    // Apply promo code
    const handleApplyPromo = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/promo/validate`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code: promo }),
            });
            const data = await response.json();
            setDiscount(data.valid ? data.discount : 0);
        }
        catch {
            setDiscount(0);
        }
    };
    // Submit booking form
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!fullName || !email || !agree) {
            setSubmitError("Please fill all fields and agree to the policy.");
            return;
        }
        setSubmitting(true);
        setSubmitError(null);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/bookings`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    experienceId: booking.experience.id, // <--- use .id instead of _id
                    date: booking.date,
                    time: booking.time,
                    qty: booking.qty,
                    userEmail: email,
                    fullName,
                    discount,
                }),
            });
            const bk = response.ok ? await response.json() : null;
            navigate("/result", {
                state: {
                    success: !!bk,
                    booking: {
                        ...booking,
                        fullName,
                        email,
                        discount,
                        confirmed: !!bk,
                        id: bk?._id,
                    },
                },
            });
        }
        catch (error) {
            console.error(error);
            navigate("/result", {
                state: {
                    success: false,
                    booking: {
                        ...booking,
                        fullName,
                        email,
                        discount,
                        confirmed: false,
                    },
                },
            });
        }
        finally {
            setSubmitting(false);
        }
    };
    const finalTotal = Math.max(0, booking.total - discount);
    return (_jsxs("main", { className: "max-w-7xl mx-auto px-4 py-10 flex flex-col md:flex-row gap-10 items-start", children: [_jsxs("section", { className: "flex-1 max-w-2xl", children: [_jsx("div", { className: "mb-3 flex items-center gap-3", children: _jsx("span", { className: "font-medium text-gray-800 text-lg", children: "\u2190 Checkout" }) }), _jsxs("form", { onSubmit: handleSubmit, className: "bg-gray-100 rounded-lg p-6 space-y-6 shadow-sm flex flex-col", style: { minWidth: 420, width: "100%" }, children: [_jsxs("div", { className: "flex gap-3", children: [_jsxs("div", { className: "flex-1 flex flex-col", children: [_jsx("label", { className: "block text-xs text-gray-700 mb-1", children: "Full name" }), _jsx("input", { type: "text", className: "border px-3 py-2 rounded w-full text-sm outline-none bg-white", placeholder: "Your name", value: fullName, onChange: (e) => setFullName(e.target.value) })] }), _jsxs("div", { className: "flex-1 flex flex-col", children: [_jsx("label", { className: "block text-xs text-gray-700 mb-1", children: "Email" }), _jsx("input", { type: "email", className: "border px-3 py-2 rounded w-full text-sm outline-none bg-white", placeholder: "Your email", value: email, onChange: (e) => setEmail(e.target.value) })] })] }), _jsxs("div", { className: "flex gap-2 items-center w-full", children: [_jsx("input", { type: "text", className: "border px-3 py-2 rounded text-sm outline-none bg-white flex-1", placeholder: "Promo code", value: promo, onChange: (e) => setPromo(e.target.value) }), _jsx("button", { type: "button", className: "px-7 py-2 bg-black text-white text-sm rounded hover:bg-gray-900", style: { height: "40px", minWidth: 72 }, onClick: handleApplyPromo, children: "Apply" })] }), _jsxs("div", { className: "flex items-center mt-2", children: [_jsx("input", { type: "checkbox", className: "mr-2", checked: agree, onChange: (e) => setAgree(e.target.checked), id: "agree" }), _jsx("label", { htmlFor: "agree", className: "text-xs text-gray-600", children: "I agree to the terms and safety policy" })] }), submitError && (_jsx("div", { className: "text-xs text-red-600 mt-2", children: submitError })), _jsx("button", { type: "submit", className: "w-full font-bold py-3 rounded transition bg-yellow-400 text-black hover:bg-yellow-500", disabled: submitting, children: submitting ? "Processing..." : "Pay and Confirm" })] })] }), _jsxs("aside", { className: "w-full md:w-[320px] bg-white rounded-xl p-6 border shadow space-y-3 h-fit mt-8 md:mt-0", children: [_jsxs("div", { className: "text-sm font-medium flex justify-between", children: [_jsx("span", { children: "Experience" }), _jsx("span", { children: booking.experience.title })] }), _jsxs("div", { className: "flex justify-between text-sm", children: [_jsx("span", { children: "Date" }), _jsx("span", { children: booking.date })] }), _jsxs("div", { className: "flex justify-between text-sm", children: [_jsx("span", { children: "Time" }), _jsx("span", { children: booking.time })] }), _jsxs("div", { className: "flex justify-between text-sm", children: [_jsx("span", { children: "Qty" }), _jsx("span", { children: booking.qty })] }), _jsxs("div", { className: "flex justify-between text-sm", children: [_jsx("span", { children: "Subtotal" }), _jsxs("span", { children: ["\u20B9", booking.subtotal] })] }), _jsxs("div", { className: "flex justify-between text-sm", children: [_jsx("span", { children: "Taxes" }), _jsxs("span", { children: ["\u20B9", booking.taxes] })] }), !!discount && (_jsxs("div", { className: "flex justify-between text-sm text-green-700 font-bold", children: [_jsx("span", { children: "Discount" }), _jsxs("span", { children: ["- \u20B9", discount] })] })), _jsx("hr", {}), _jsxs("div", { className: "flex justify-between font-bold text-lg", children: [_jsx("span", { children: "Total" }), _jsxs("span", { children: ["\u20B9", finalTotal] })] })] })] }));
};
export default Checkout;
