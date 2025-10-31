import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { experiences } from '../assets/experiences';
export default function Details() {
    const { id } = useParams();
    const experience = experiences.find(e => e.id === id);
    const navigate = useNavigate();
    if (!experience) {
        return (_jsx("div", { className: "flex items-center justify-center h-screen", children: _jsx("div", { className: "bg-red-50 text-red-600 text-lg font-bold px-8 py-6 rounded-lg border border-red-400", children: "Experience not found." }) }));
    }
    const [selectedDate, setSelectedDate] = useState(experience.dates?.[0] || '');
    const [selectedTime, setSelectedTime] = useState('');
    const [quantity, setQuantity] = useState(1);
    const subtotal = experience.price * quantity;
    const taxes = 59;
    const total = subtotal + taxes;
    const handleSelectTime = (time, soldOut) => {
        if (!soldOut)
            setSelectedTime(time);
    };
    const confirmEnabled = !!selectedDate && !!selectedTime && !experience.times.find(t => t.time === selectedTime)?.soldOut;
    return (_jsxs("main", { className: "max-w-7xl mx-auto py-8 px-4 flex flex-col md:flex-row gap-10", children: [_jsxs("section", { className: "flex-1", children: [_jsx("div", { className: "overflow-hidden rounded-xl border-2 border-yellow-400 bg-white w-full mb-6", style: { maxWidth: 600 }, children: _jsx("img", { src: experience.image, alt: experience.title, className: "w-full h-64 object-cover" }) }), _jsx("h2", { className: "font-semibold text-2xl", children: experience.title }), _jsx("div", { className: "text-sm text-gray-600 mt-2 mb-3", children: experience.description }), _jsxs("section", { className: "mb-4", children: [_jsx("div", { className: "mb-1 text-[17px] font-semibold", children: "Choose date" }), _jsx("div", { className: "flex gap-2 mb-2", children: experience.dates?.map(date => (_jsx("button", { className: `px-4 py-1.5 rounded-[4px] border text-[15px] transition ${selectedDate === date
                                        ? 'bg-yellow-300 border-yellow-400 text-black font-bold'
                                        : 'bg-gray-50 border-gray-200 text-gray-800 hover:bg-yellow-50'}`, onClick: () => setSelectedDate(date), children: date }, date))) })] }), _jsxs("section", { className: "mb-4", children: [_jsx("div", { className: "mb-1 text-[17px] font-semibold", children: "Choose time" }), _jsx("div", { className: "flex gap-2 flex-wrap text-sm mb-1", children: experience.times?.map(({ time, soldOut, count }) => (_jsxs("button", { disabled: soldOut, className: `
                  px-4 py-1.5 rounded-[4px] border text-[15px] transition
                  ${soldOut ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed' : ''}
                  ${selectedTime === time && !soldOut ? 'bg-yellow-300 border-yellow-400 font-bold' : 'bg-white border-gray-300'}
                `, onClick: () => handleSelectTime(time, soldOut), children: [time, !soldOut && !!count && (_jsxs("span", { className: "ml-2 text-xs text-red-600", children: [count, " left"] })), soldOut && _jsx("span", { className: "ml-2 text-xs text-gray-400", children: "Sold out" })] }, time))) }), _jsx("div", { className: "text-xs text-gray-500 mt-1", children: "All times are in IST (GMT +5:30)" })] }), _jsxs("section", { children: [_jsx("div", { className: "mt-4 font-semibold mb-1", children: "About" }), _jsx("div", { className: "bg-gray-100 rounded py-2 px-4 text-[15px]", children: experience.about || "Scenic routes, trained guides, and safety briefing. Minimum age 10." })] })] }), _jsxs("aside", { className: "w-full md:w-[320px] bg-white rounded-xl p-6 border shadow space-y-3 h-fit mt-8 md:mt-0", children: [_jsxs("div", { className: "text-sm flex justify-between", children: [_jsx("span", { children: "Starts at" }), _jsxs("span", { children: ["\u20B9", experience.price] })] }), _jsxs("div", { className: "flex justify-between items-center text-sm", children: [_jsx("span", { children: "Quantity" }), _jsxs("div", { className: "flex items-center", children: [_jsx("button", { className: "px-2 text-lg", onClick: () => setQuantity(Math.max(1, quantity - 1)), disabled: quantity === 1, children: "-" }), _jsx("span", { className: "px-3", children: quantity }), _jsx("button", { className: "px-2 text-lg", onClick: () => setQuantity(quantity + 1), children: "+" })] })] }), _jsxs("div", { className: "flex justify-between text-sm", children: [_jsx("span", { children: "Subtotal" }), _jsxs("span", { children: ["\u20B9", subtotal] })] }), _jsxs("div", { className: "flex justify-between text-sm", children: [_jsx("span", { children: "Taxes" }), _jsxs("span", { children: ["\u20B9", taxes] })] }), _jsx("hr", {}), _jsxs("div", { className: "flex justify-between font-bold text-lg", children: [_jsx("span", { children: "Total" }), _jsxs("span", { children: ["\u20B9", total] })] }), _jsx("button", { className: `w-full mt-2 font-bold py-2 rounded transition ${confirmEnabled
                            ? "bg-yellow-400 text-black hover:bg-yellow-500"
                            : "bg-gray-200 text-gray-500 cursor-not-allowed"}`, disabled: !confirmEnabled, onClick: () => {
                            if (!confirmEnabled)
                                return;
                            navigate('/checkout', {
                                state: {
                                    booking: {
                                        experience,
                                        date: selectedDate,
                                        time: selectedTime,
                                        qty: quantity,
                                        subtotal,
                                        taxes,
                                        total,
                                    }
                                }
                            });
                        }, children: "Confirm" })] })] }));
}
