import { useEffect, useState } from "react";
import {
  deleteAppointment,
  getAppointments,
  updateAppointmentStatus,
} from "../services/api";

const AppointmentTable = ({ refresh }) => {
  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState("All");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAppointments();
      setAppointments(response.data.data);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to load appointments.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [refresh]);

  const handleStatusChange = async (id, status) => {
    try {
      const response = await updateAppointmentStatus(id, status);

      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === id ? response.data.data : appointment,
        ),
      );
    } catch (error) {
      setError(error.response?.data?.message || "Failed to update status.");
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this appointment?",
    );

    if (!confirmed) return;

    try {
      await deleteAppointment(id);

      setAppointments((prevAppointments) =>
        prevAppointments.filter((appointment) => appointment._id !== id),
      );
    } catch (error) {
      setError(
        error.response?.data?.message || "Failed to delete appointment.",
      );
    }
  };

  const filteredAppointments =
    filter === "All"
      ? appointments
      : appointments.filter((appointment) => appointment.status === filter);

  const getStatusClass = (status) => {
    const statusClasses = {
      Pending: "bg-amber-50 text-amber-700",
      Confirmed: "bg-blue-50 text-blue-700",
      Completed: "bg-green-50 text-green-700",
      Cancelled: "bg-red-50 text-red-700",
    };

    return statusClasses[status] || "bg-gray-50 text-gray-700";
  };

  if (loading) {
    return (
      <section className="rounded-md border border-gray-200 bg-white p-6">
        <p className="text-sm text-gray-500">Loading appointments...</p>
      </section>
    );
  }

  return (
    <section className="rounded-md border border-gray-200 bg-white">
      <div className="flex flex-col gap-4 border-b border-gray-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-semibold text-gray-900">
            Appointments
          </h2>

          <p className="mt-1 text-xs text-gray-500">
            Manage customer appointments and their status.
          </p>
        </div>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 outline-none focus:border-rose-600 focus:ring-1 focus:ring-rose-600"
        >
          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {error && (
        <div className="mx-5 mt-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      )}

      {filteredAppointments.length === 0 ? (
        <div className="px-5 py-10 text-center">
          <p className="text-sm font-medium text-gray-700">
            No appointments found
          </p>

          <p className="mt-1 text-xs text-gray-500">
            There are no appointments matching this filter.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Customer
                </th>

                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Service
                </th>

                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Date
                </th>

                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Time
                </th>

                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Status
                </th>

                <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredAppointments.map((appointment) => (
                <tr key={appointment._id} className="hover:bg-gray-50">
                  <td className="px-5 py-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {appointment.customerName}
                      </p>

                      <p className="mt-0.5 text-xs text-gray-500">
                        {appointment.customerPhone}
                      </p>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-700">
                    {appointment.service?.name || "N/A"}
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-700">
                    {appointment.date}
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-700">
                    {appointment.time}
                  </td>

                  <td className="px-5 py-4">
                    <select
                      value={appointment.status}
                      onChange={(e) =>
                        handleStatusChange(appointment._id, e.target.value)
                      }
                      className={`rounded-full border-0 px-2.5 py-1 text-xs font-medium outline-none ${getStatusClass(
                        appointment.status,
                      )}`}
                    >
                      <option value="Pending">Pending</option>

                      <option value="Confirmed">Confirmed</option>

                      <option value="Completed">Completed</option>

                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>

                  <td className="px-5 py-4 text-right">
                    <button
                      type="button"
                      onClick={() => handleDelete(appointment._id)}
                      className="text-sm font-medium text-red-600 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default AppointmentTable;
