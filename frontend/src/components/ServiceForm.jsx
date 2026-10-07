import { useEffect, useState } from "react";
import { createService, updateService } from "../services/api";

const ServiceForm = ({ selectedService, onSuccess, onCancel }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isEditing = Boolean(selectedService);

  useEffect(() => {
    if (selectedService) {
      setName(selectedService.name);
      setPrice(selectedService.price);
      setDuration(selectedService.duration);
    } else {
      setName("");
      setPrice("");
      setDuration("");
    }

    setError("");
  }, [selectedService]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Service name is required.");
      return;
    }

    if (!price || Number(price) <= 0) {
      setError("Price must be greater than 0.");
      return;
    }

    if (!duration || Number(duration) <= 0) {
      setError("Duration must be greater than 0.");
      return;
    }

    const serviceData = {
      name: name.trim(),
      price: Number(price),
      duration: Number(duration),
    };

    try {
      setLoading(true);

      if (isEditing) {
        await updateService(selectedService._id, serviceData);
      } else {
        await createService(serviceData);
      }

      setName("");
      setPrice("");
      setDuration("");

      onSuccess();
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="h-fit rounded-md border border-gray-200 bg-white">
      <div className="border-b border-gray-200 px-5 py-4">
        <h2 className="text-base font-semibold text-gray-900">
          {isEditing ? "Edit Service" : "Add Service"}
        </h2>

        <p className="mt-1 text-xs text-gray-500">
          {isEditing
            ? "Update the service details below."
            : "Add a new service to your salon."}
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
            htmlFor="name"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            Service Name
          </label>

          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Haircut"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none transition focus:border-rose-600 focus:ring-1 focus:ring-rose-600"
          />
        </div>

        <div>
          <label
            htmlFor="price"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            Price
          </label>

          <div className="flex">
            <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
              NPR
            </span>

            <input
              id="price"
              type="number"
              min="1"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="500"
              className="w-full rounded-r-md border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none transition focus:border-rose-600 focus:ring-1 focus:ring-rose-600"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="duration"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            Duration
          </label>

          <div className="flex">
            <input
              id="duration"
              type="number"
              min="1"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="30"
              className="w-full rounded-l-md border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none transition focus:border-rose-600 focus:ring-1 focus:ring-rose-600"
            />

            <span className="inline-flex items-center rounded-r-md border border-l-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
              min
            </span>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="rounded-md bg-rose-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-rose-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? "Saving..."
              : isEditing
                ? "Update Service"
                : "Add Service"}
          </button>

          {isEditing && (
            <button
              type="button"
              onClick={onCancel}
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </section>
  );
};

export default ServiceForm;
