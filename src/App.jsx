import { useState } from 'react';
import './App.css';

// 📌 Google Calendar Reminder Component
function CalendarReminder({ bookingDate }) {
  const createGoogleCalendarLink = () => {
    const start = new Date(bookingDate);
    start.setHours(7, 45, 0, 0); // 7:45 AM local
    const end = new Date(start.getTime() + 30 * 60 * 1000); // 30 mins later

    const formatDateLocal = (date) => {
      const pad = (num) => String(num).padStart(2, '0');
      const year = date.getFullYear();
      const month = pad(date.getMonth() + 1);
      const day = pad(date.getDate());
      const hours = pad(date.getHours());
      const minutes = pad(date.getMinutes());
      const seconds = pad(date.getSeconds());

      // Calculate timezone offset in ±HHMM
      const tzOffset = -date.getTimezoneOffset();
      const sign = tzOffset >= 0 ? "+" : "-";
      const tzHours = pad(Math.floor(Math.abs(tzOffset) / 60));
      const tzMinutes = pad(Math.abs(tzOffset) % 60);

      return `${year}${month}${day}T${hours}${minutes}${seconds}${sign}${tzHours}${tzMinutes}`;
    };

    const startDateTime = formatDateLocal(start);
    const endDateTime = formatDateLocal(end);

    const title = encodeURIComponent("Tain Ticket Booking Reminder");
    const details = encodeURIComponent(
      "Reminder: Booking opens for your journey date."
    );

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDateTime}/${endDateTime}&details=${details}`;
  };

  return (
    <a
      href={createGoogleCalendarLink()}
      target="_blank"
      rel="noopener noreferrer"
    >
      <button style={{ marginTop: "10px" }}>Add to Google Calendar</button>
    </a>
  );
}

function App() {
  const [travelDate, setTravelDate] = useState("");

  // 📌 Calculate booking date (60 days before travel date)
  const getBookingDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    date.setDate(date.getDate() - 60);
    return date;
  };

  return (
    <div className="container">
      <h1 className="heading">Train Ticket Booking Date Calculator</h1>
      <label htmlFor="travel-date">Select your travel date:</label>
      <input
        type="date"
        id="travel-date"
        value={travelDate}
        onChange={(e) => setTravelDate(e.target.value)}
      />
      {travelDate &&
        (() => {
          const bookingDate = getBookingDate(travelDate);
          const today = new Date();
          // Remove time for comparison
          today.setHours(0, 0, 0, 0);
          bookingDate.setHours(0, 0, 0, 0);

          if (bookingDate < today) {
            return (
              <div className="result" style={{ color: '#c00' }}>
                <p>
                  <strong>You missed it!</strong> Booking opened on:{" "}
                  {bookingDate.toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            );
          } else {
            return (
              <div className="result">
                <p>
                  <strong>Booking opens on:</strong>{" "}
                  {bookingDate.toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
                {/* 📌 Add Google Calendar Button */}
                <CalendarReminder bookingDate={bookingDate} />
              </div>
            );
          }
        })()}
      <p className="info">
        IRCTC allows booking 60 days in advance from the travel date.
      </p>
    </div>
  );
}

export default App;
