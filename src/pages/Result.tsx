import { useNavigate } from "react-router-dom";

export default function Result() {
  const navigate = useNavigate();
  return (
    <main className="p-8 flex flex-col items-center justify-center h-[60vh]">
      <div className="flex flex-col gap-4 items-center">
        <div className="rounded-full bg-green-100 p-8">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold">Booking Confirmed</h1>
        <div className="text-gray-500">Ref ID: HUF56&SO</div>
        <button className="bg-gray-200 text-black px-6 py-2 rounded font-semibold" onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>
    </main>
  );
}
