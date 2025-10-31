import  { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { experiences } from '../assets/experiences';

export default function Details() {
  const { id } = useParams();
  const experience = experiences.find(e => e.id === id);
  const navigate = useNavigate();

  if (!experience) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-red-50 text-red-600 text-lg font-bold px-8 py-6 rounded-lg border border-red-400">
          Experience not found.
        </div>
      </div>
    );
  }

  const [selectedDate, setSelectedDate] = useState(experience.dates?.[0] || '');
  const [selectedTime, setSelectedTime] = useState('');
  const [quantity, setQuantity] = useState(1);

  const subtotal = experience.price * quantity;
  const taxes = 59;
  const total = subtotal + taxes;

  const handleSelectTime = (time: string, soldOut: boolean) => {
    if (!soldOut) setSelectedTime(time);
  };

  const confirmEnabled = !!selectedDate && !!selectedTime && !experience.times.find(t => t.time === selectedTime)?.soldOut;

  return (
    <main className="max-w-7xl mx-auto py-8 px-4 flex flex-col md:flex-row gap-10">
      <section className="flex-1">
        <div className="overflow-hidden rounded-xl border-2 border-yellow-400 bg-white w-full mb-6" style={{ maxWidth: 600 }}>
          <img src={experience.image} alt={experience.title} className="w-full h-64 object-cover" />
        </div>
        <h2 className="font-semibold text-2xl">{experience.title}</h2>
        <div className="text-sm text-gray-600 mt-2 mb-3">{experience.description}</div>
        <section className="mb-4">
          <div className="mb-1 text-[17px] font-semibold">Choose date</div>
          <div className="flex gap-2 mb-2">
            {experience.dates?.map(date => (
              <button
                key={date}
                className={`px-4 py-1.5 rounded-[4px] border text-[15px] transition ${
                  selectedDate === date
                    ? 'bg-yellow-300 border-yellow-400 text-black font-bold'
                    : 'bg-gray-50 border-gray-200 text-gray-800 hover:bg-yellow-50'
                }`}
                onClick={() => setSelectedDate(date)}
              >
                {date}
              </button>
            ))}
          </div>
        </section>
        <section className="mb-4">
          <div className="mb-1 text-[17px] font-semibold">Choose time</div>
          <div className="flex gap-2 flex-wrap text-sm mb-1">
            {experience.times?.map(({ time, soldOut, count }) => (
              <button
                key={time}
                disabled={soldOut}
                className={`
                  px-4 py-1.5 rounded-[4px] border text-[15px] transition
                  ${soldOut ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed' : ''}
                  ${selectedTime === time && !soldOut ? 'bg-yellow-300 border-yellow-400 font-bold' : 'bg-white border-gray-300'}
                `}
                onClick={() => handleSelectTime(time, soldOut!)}
              >
                {time}
                {!soldOut && !!count && (
                  <span className="ml-2 text-xs text-red-600">{count} left</span>
                )}
                {soldOut && <span className="ml-2 text-xs text-gray-400">Sold out</span>}
              </button>
            ))}
          </div>
          <div className="text-xs text-gray-500 mt-1">All times are in IST (GMT +5:30)</div>
        </section>
        <section>
          <div className="mt-4 font-semibold mb-1">About</div>
          <div className="bg-gray-100 rounded py-2 px-4 text-[15px]">{experience.about || "Scenic routes, trained guides, and safety briefing. Minimum age 10."}</div>
        </section>
      </section>
      {/* Sidebar: Booking Summary */}
      <aside className="w-full md:w-[320px] bg-white rounded-xl p-6 border shadow space-y-3 h-fit mt-8 md:mt-0">
        <div className="text-sm flex justify-between"><span>Starts at</span><span>₹{experience.price}</span></div>
        <div className="flex justify-between items-center text-sm">
          <span>Quantity</span>
          <div className="flex items-center">
            <button className="px-2 text-lg" onClick={() => setQuantity(Math.max(1, quantity - 1))} disabled={quantity === 1}>-</button>
            <span className="px-3">{quantity}</span>
            <button className="px-2 text-lg" onClick={() => setQuantity(quantity + 1)}>+</button>
          </div>
        </div>
        <div className="flex justify-between text-sm"><span>Subtotal</span><span>₹{subtotal}</span></div>
        <div className="flex justify-between text-sm"><span>Taxes</span><span>₹{taxes}</span></div>
        <hr />
        <div className="flex justify-between font-bold text-lg"><span>Total</span><span>₹{total}</span></div>
        <button
          className={`w-full mt-2 font-bold py-2 rounded transition ${
            confirmEnabled
              ? "bg-yellow-400 text-black hover:bg-yellow-500"
              : "bg-gray-200 text-gray-500 cursor-not-allowed"
          }`}
          disabled={!confirmEnabled}
          onClick={() => {
            if (!confirmEnabled) return;
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
          }}
        >
          Confirm
        </button>
      </aside>
    </main>
  );
}
