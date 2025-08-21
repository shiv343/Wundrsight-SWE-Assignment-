import { useEffect, useState } from "react";
import { apiRequest } from "../api";

export default function PatientDashboard({ auth }) {
  const [slots, setSlots] = useState([]);
  const [bookings, setBookings] = useState([]);

  async function load() {
    try {
      const today = new Date().toISOString().split("T")[0];
      const weekLater = new Date(Date.now() + 6 * 86400000)
        .toISOString()
        .split("T")[0];

      const slotsData = await apiRequest(
        `/slots?from=${today}&to=${weekLater}`,
        "GET",
        null,
        auth.token
      );
      setSlots(slotsData);

      const bookingsData = await apiRequest(
        "/my-bookings",
        "GET",
        null,
        auth.token
      );
      setBookings(bookingsData);
    } catch (err) {
      console.error(err);
    }
  }

  async function book(slotId) {
    try {
      await apiRequest("/book", "POST", { slotId }, auth.token);
      alert("Booked!");
      await load();
    } catch (e) {
      alert(e.message || "Booking failed");
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="grid md:grid-cols-2 gap-10 mt-10">
      {/* My Bookings first */}
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-6">✅ My Bookings</h2>
        <div className="w-full max-w-md space-y-4">
          {bookings.length === 0 && (
            <p className="text-gray-600 text-center">
              You haven’t booked any slots yet.
            </p>
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
            </div>
          ))}
        </div>
      </div>

      {/* Available Slots */}
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-6">📅 Available Slots</h2>
        <div className="w-full max-w-md space-y-4 overflow-y-auto max-h-[70vh] pr-2">
          {slots.map((s) => (
            <div
              key={s.id}
              className="bg-gray-100 text-gray-900 rounded-2xl shadow p-6 text-center"
            >
              <p className="text-lg font-semibold">
                {new Date(s.startAt).toLocaleDateString()} –{" "}
                {new Date(s.startAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              <button
                onClick={() => book(s.id)}
                className="mt-4 bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg transition"
              >
                Book
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
