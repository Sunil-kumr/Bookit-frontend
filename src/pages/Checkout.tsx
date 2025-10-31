import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { Booking } from "../types/Booking";

const Checkout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const booking: Booking | undefined = location.state?.booking;

  useEffect(() => {
    if (!booking) navigate("/");
  }, [booking, navigate]);
  if (!booking) return null;

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [promo, setPromo] = useState("");
  const [agree, setAgree] = useState(false);
  const [discount, setDiscount] = useState<number>(0);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Apply promo code
  const handleApplyPromo = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/promo/validate`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code: promo }),
        }
      );
      const data = await response.json();
      setDiscount(data.valid ? data.discount : 0);
    } catch {
      setDiscount(0);
    }
  };

  // Submit booking form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!fullName || !email || !agree) {
      setSubmitError("Please fill all fields and agree to the policy.");
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/bookings`,
        {
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
        }
      );

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
    } catch (error) {
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
    } finally {
      setSubmitting(false);
    }
  };

  const finalTotal = Math.max(0, booking.total - discount);

  return (
    <main className="max-w-7xl mx-auto px-4 py-10 flex flex-col md:flex-row gap-10 items-start">
      <section className="flex-1 max-w-2xl">
        <div className="mb-3 flex items-center gap-3">
          <span className="font-medium text-gray-800 text-lg">&larr; Checkout</span>
        </div>

        {/* ✅ Attach handleSubmit to the form, not button */}
        <form
          onSubmit={handleSubmit}
          className="bg-gray-100 rounded-lg p-6 space-y-6 shadow-sm flex flex-col"
          style={{ minWidth: 420, width: "100%" }}
        >
          <div className="flex gap-3">
            <div className="flex-1 flex flex-col">
              <label className="block text-xs text-gray-700 mb-1">Full name</label>
              <input
                type="text"
                className="border px-3 py-2 rounded w-full text-sm outline-none bg-white"
                placeholder="Your name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="flex-1 flex flex-col">
              <label className="block text-xs text-gray-700 mb-1">Email</label>
              <input
                type="email"
                className="border px-3 py-2 rounded w-full text-sm outline-none bg-white"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-2 items-center w-full">
            <input
              type="text"
              className="border px-3 py-2 rounded text-sm outline-none bg-white flex-1"
              placeholder="Promo code"
              value={promo}
              onChange={(e) => setPromo(e.target.value)}
            />
            <button
              type="button"
              className="px-7 py-2 bg-black text-white text-sm rounded hover:bg-gray-900"
              style={{ height: "40px", minWidth: 72 }}
              onClick={handleApplyPromo}
            >
              Apply
            </button>
          </div>

          <div className="flex items-center mt-2">
            <input
              type="checkbox"
              className="mr-2"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              id="agree"
            />
            <label htmlFor="agree" className="text-xs text-gray-600">
              I agree to the terms and safety policy
            </label>
          </div>

          {submitError && (
            <div className="text-xs text-red-600 mt-2">{submitError}</div>
          )}

          {/* ✅ Submit button is inside the form */}
          <button
            type="submit"
            className="w-full font-bold py-3 rounded transition bg-yellow-400 text-black hover:bg-yellow-500"
            disabled={submitting}
          >
            {submitting ? "Processing..." : "Pay and Confirm"}
          </button>
        </form>
      </section>

      <aside className="w-full md:w-[320px] bg-white rounded-xl p-6 border shadow space-y-3 h-fit mt-8 md:mt-0">
        <div className="text-sm font-medium flex justify-between">
          <span>Experience</span>
          <span>{booking.experience.title}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Date</span>
          <span>{booking.date}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Time</span>
          <span>{booking.time}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Qty</span>
          <span>{booking.qty}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Subtotal</span>
          <span>₹{booking.subtotal}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Taxes</span>
          <span>₹{booking.taxes}</span>
        </div>
        {!!discount && (
          <div className="flex justify-between text-sm text-green-700 font-bold">
            <span>Discount</span>
            <span>- ₹{discount}</span>
          </div>
        )}
        <hr />
        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>₹{finalTotal}</span>
        </div>
      </aside>
    </main>
  );
};

export default Checkout;
