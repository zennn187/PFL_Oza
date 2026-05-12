import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex justify-between items-center bg-white p-4 shadow">
      <h1 className="font-bold text-lg">Dashboard</h1>

      <input
        onClick={() => setOpen(true)}
        type="text"
        placeholder="Search..."
        className="border px-3 py-1 rounded cursor-pointer"
        readOnly
      />

      {open && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl w-96">
            <h2 className="mb-3 font-bold">Search</h2>

            <input
              className="w-full border p-2 mb-4"
              placeholder="Type here..."
            />

            <button
              onClick={() => setOpen(false)}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}