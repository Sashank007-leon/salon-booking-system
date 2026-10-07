import { useState } from "react";
import AppointmentForm from "../components/AppointmentForm";
import AppointmentTable from "../components/AppointmentTable";

const Appointments = () => {
  const [refresh, setRefresh] = useState(false);

  const handleSuccess = () => {
    setRefresh((prev) => !prev);
  };

  return (
    <main className="min-h-[calc(100vh-65px)] bg-[#f8f8f7]">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
            Appointments
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage customer appointments and bookings.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
          <AppointmentForm onSuccess={handleSuccess} />

          <AppointmentTable refresh={refresh} />
        </div>
      </div>
    </main>
  );
};

export default Appointments;
