import { useEffect, useState } from "react";
import { apiRequest } from "../api"; 
export default function AdminDashboard({ auth }) {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const data = await apiRequest("/all-bookings", "GET", null, auth.token);
        setBookings(data); 
      } catch (err) {
        console.error(err);
      }
    }
    load();
  }, [auth.token]);

  return (
    <div className="grid md:grid-cols-2 gap-10 mt-10">
      {/* All Bookings */}
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-6">📋 All Bookings</h2>
        <div className="w-full max-w-md space-y-4 overflow-y-auto max-h-[70vh] pr-2">
          {bookings.length === 0 && (
            <p className="text-gray-600 text-center">No bookings yet.</p>
          )}
          {bookings.map((b) => (
            <div
              key={b.id}
              className="bg-gray-100 text-gray-900 rounded-2xl shadow p-6 text-center"
            >
              <p className="text-lg font-semibold">
                {new Date(b.slot.startAt).toLocaleDateString()} –{" "}
                {new Date(b.slot.startAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              <p className="text-gray-700 mt-2">
                {b.user.name} ({b.user.email})
              </p>
            </div>
          ))}
        </div>
      </div>

      
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-6">📅 All Slots</h2>
        <div className="w-full max-w-md space-y-4 overflow-y-auto max-h-[70vh] pr-2">
          <p className="text-gray-600 text-center">Slot management coming soon...</p>
        </div>
      </div>
    </div>
  );
}
