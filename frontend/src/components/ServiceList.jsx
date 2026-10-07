import { useEffect, useState } from "react";
import { deleteService, getServices } from "../services/api";

const ServiceList = ({ onEdit, refresh }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchServices = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getServices();
      setServices(response.data.data);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to load services.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [refresh]);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this service?",
    );

    if (!confirmed) return;

    try {
      await deleteService(id);

      setServices((prevServices) =>
        prevServices.filter((service) => service._id !== id),
      );
    } catch (error) {
      setError(error.response?.data?.message || "Failed to delete service.");
    }
  };

  if (loading) {
    return (
      <section className="rounded-md border border-gray-200 bg-white p-6">
        <p className="text-sm text-gray-500">Loading services...</p>
      </section>
    );
  }

  return (
    <section className="rounded-md border border-gray-200 bg-white">
      <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
        <div>
          <h2 className="text-base font-semibold text-gray-900">Services</h2>

          <p className="mt-1 text-xs text-gray-500">
            {services.length} service
            {services.length !== 1 ? "s" : ""} available
          </p>
        </div>
      </div>

      {error && (
        <div className="mx-5 mt-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      )}

      {services.length === 0 ? (
        <div className="px-5 py-10 text-center">
          <p className="text-sm font-medium text-gray-700">No services found</p>

          <p className="mt-1 text-xs text-gray-500">
            Add your first salon service using the form.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Service
                </th>

                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Price
                </th>

                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Duration
                </th>

                <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {services.map((service) => (
                <tr
                  key={service._id}
                  className="transition-colors hover:bg-gray-50"
                >
                  <td className="px-5 py-4">
                    <span className="text-sm font-medium text-gray-900">
                      {service.name}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-700">
                    NPR {service.price.toLocaleString()}
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-600">
                    {service.duration} min
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => onEdit(service)}
                        className="text-sm font-medium text-gray-600 hover:text-rose-700"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(service._id)}
                        className="text-sm font-medium text-red-600 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </div>
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

export default ServiceList;
