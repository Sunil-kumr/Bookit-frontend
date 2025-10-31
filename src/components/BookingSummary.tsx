

interface BookingSummaryProps {
  subtotal: number;
  taxes: number;
  total: number;
}

export default function BookingSummary({ subtotal, taxes, total }: BookingSummaryProps) {
  return (
    <aside className="bg-white w-80 p-4 rounded shadow">
      <div className="font-bold mb-4">Summary</div>
      <div className="flex justify-between my-1"><span>Subtotal:</span><span>₹{subtotal}</span></div>
      <div className="flex justify-between my-1"><span>Taxes:</span><span>₹{taxes}</span></div>
      <div className="font-bold flex justify-between mt-4 border-t pt-2"><span>Total:</span><span>₹{total}</span></div>
    </aside>
  );
}
