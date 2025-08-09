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
      return (
        date.getFullYear() +
        pad(date.getMonth() + 1) +
        pad(date.getDate()) +
        'T' +
        pad(date.getHours()) +
        pad(date.getMinutes()) +
        pad(date.getSeconds())
      );
    };

    const startDateTime = formatDateLocal(start);
    const endDateTime = formatDateLocal(end);

    const title = encodeURIComponent("Train Ticket Booking Reminder");
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
}

export default App;
