
import { useNavigate } from "react-router-dom";

export default function Confirmation() {
  const navigate = useNavigate();

  // Generate a reference ID (for demo: use random or static)
  const refId = "HUF56&S0"; // Replace with real logic if needed

  return (
    <main className="max-w-7xl mx-auto py-24 flex flex-col items-center justify-center">
      <div className="mb-4">
        {/* Use an SVG check for green */}
        <svg width={60} height={60} viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="12" fill="#34d399" />
          <path d="M9 12l2 2 4-4" stroke="#fff" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </svg>
      </div>
      <div className="text-2xl font-semibold text-gray-900 mb-2">Booking Confirmed</div>
      <div className="text-gray-500 text-base mb-8">Ref ID: {refId}</div>
      <button
        onClick={() => navigate("/")}
        className="px-5 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm font-medium transition"
      >
        Back to Home
      </button>
    </main>
  );
}
