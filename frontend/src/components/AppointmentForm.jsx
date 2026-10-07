import { useEffect, useState } from "react";
import { createAppointment, getServices } from "../services/api";

const AppointmentForm = ({ onSuccess }) => {
  const [services, setServices] = useState([]);

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [service, setService] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");

  const [loading, setLoading] = useState(false);
  const [servicesLoading, setServicesLoading] = useState(true);
  const [error, setError] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const fetchServices = async () => {
    try {
      setServicesLoading(true);

      const response = await getServices();
      setServices(response.data.data);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to load services.");
    } finally {
      setServicesLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!customerName.trim()) {
      setError("Customer name is required.");
      return;
    }

    if (!customerPhone.trim()) {
      setError("Customer phone is required.");
      return;
    }

    if (!service) {
      setError("Please select a service.");
      return;
    }

    if (!date) {
      setError("Please select a date.");
      return;
    }

    if (!time) {
      setError("Please select a time.");
      return;
    }

    const appointmentData = {
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      service,
      date,
      time,
      notes: notes.trim(),
    };

    try {
      setLoading(true);

      await createAppointment(appointmentData);

      setCustomerName("");
      setCustomerPhone("");
      setService("");
      setDate("");
      setTime("");
      setNotes("");

      onSuccess();
    } catch (error) {
      setError(
        error.response?.data?.message || "Failed to create appointment.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="h-fit rounded-md border border-gray-200 bg-white">
      <div className="border-b border-gray-200 px-5 py-4">
        <h2 className="text-base font-semibold text-gray-900">
          Book Appointment
        </h2>

        <p className="mt-1 text-xs text-gray-500">
          Create a new customer appointment.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 p-5">
        {error && (
          <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        )}

        <div>
          <label
            htmlFor="customerName"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            Customer Name
          </label>

          <input
            id="customerName"
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Ram Nepal"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-rose-600 focus:ring-1 focus:ring-rose-600"
          />
        </div>

        <div>
          <label
            htmlFor="customerPhone"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            Phone
          </label>

          <input
            id="customerPhone"
            type="tel"
            value={customerPhone}
            onChange={(e) => setCustomerPhone(e.target.value)}
            placeholder="98XXXXXXXX"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-rose-600 focus:ring-1 focus:ring-rose-600"
          />
        </div>

        <div>
          <label
            htmlFor="service"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            Service
          </label>

          <select
            id="service"
            value={service}
            onChange={(e) => setService(e.target.value)}
            disabled={servicesLoading}
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-rose-600 focus:ring-1 focus:ring-rose-600"
          >
            <option value="">
              {servicesLoading ? "Loading services..." : "Select a service"}
            </option>

            {services.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name} - NPR {item.price}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label
              htmlFor="date"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              Date
            </label>

            <input
              id="date"
              type="date"
              min={today}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-rose-600 focus:ring-1 focus:ring-rose-600"
            />
          </div>

          <div>
            <label
              htmlFor="time"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              Time
            </label>

            <input
              id="time"
              type="time"
              min="08:00"
              max="19:00"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-rose-600 focus:ring-1 focus:ring-rose-600"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="notes"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            Notes
          </label>

          <textarea
            id="notes"
            rows="3"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Optional notes..."
            className="w-full resize-none rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-rose-600 focus:ring-1 focus:ring-rose-600"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-rose-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-rose-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Booking..." : "Book Appointment"}
        </button>
      </form>
    </section>
  );
};

export default AppointmentForm;
