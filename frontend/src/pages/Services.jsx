import { useState } from "react";

import ServiceForm from "../components/ServiceForm";
import ServiceList from "../components/ServiceList";

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const handleEdit = (service) => {
    setSelectedService(service);
  };

  const handleSuccess = () => {
    setSelectedService(null);
    setRefresh((prev) => !prev);
  };

  const handleCancel = () => {
    setSelectedService(null);
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
          Services
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Manage the services offered by your salon.
        </p>
      </div>

      {/* Content */}
      <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
        {/* Service Form */}
        <ServiceForm
          selectedService={selectedService}
          onSuccess={handleSuccess}
          onCancel={handleCancel}
        />

        {/* Service List */}
        <ServiceList onEdit={handleEdit} refresh={refresh} />
      </div>
    </div>
  );
};

export default Services;
