import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getServices = () => API.get("/services");

export const createService = (data) => API.post("/services", data);

export const updateService = (id, data) => API.put(`/services/${id}`, data);

export const deleteService = (id) => API.delete(`/services/${id}`);

export const getAppointments = () => API.get("/appointments");

export const createAppointment = (data) => API.post("/appointments", data);

export const updateAppointmentStatus = (id, status) =>
  API.patch(`/appointments/${id}/status`, { status });

export const deleteAppointment = (id) => API.delete(`/appointments/${id}`);
