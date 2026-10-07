import mongoose from "mongoose";
import Appointment from "../models/Appointment.js";
import Service from "../models/Service.js";

export const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("service")
      .sort({ date: 1, time: 1 });

    res.status(200).json({
      success: true,
      data: appointments,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch appointments",
    });
  }
};

export const createAppointment = async (req, res) => {
  try {
    const { customerName, customerPhone, service, date, time, notes } =
      req.body;

    if (!customerName || !customerName.trim()) {
      return res.status(400).json({
        success: false,
        message: "Customer name is required",
      });
    }

    if (!customerPhone || !customerPhone.trim()) {
      return res.status(400).json({
        success: false,
        message: "Customer phone is required",
      });
    }

    if (!service) {
      return res.status(400).json({
        success: false,
        message: "Service is required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(service)) {
      return res.status(400).json({
        success: false,
        message: "Invalid service ID",
      });
    }

    if (!date) {
      return res.status(400).json({
        success: false,
        message: "Appointment date is required",
      });
    }

    const today = new Date().toISOString().split("T")[0];

    if (date < today) {
      return res.status(400).json({
        success: false,
        message: "Appointment date cannot be in the past",
      });
    }

    if (!time) {
      return res.status(400).json({
        success: false,
        message: "Appointment time is required",
      });
    }

    if (time < "08:00" || time > "19:00") {
      return res.status(400).json({
        success: false,
        message: "Appointment time must be between 8:00 AM and 7:00 PM",
      });
    }

    const existingService = await Service.findById(service);

    if (!existingService) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    const existingAppointment = await Appointment.findOne({
      service,
      date,
      time,
      status: { $ne: "Cancelled" },
    });

    if (existingAppointment) {
      return res.status(409).json({
        success: false,
        message: "This service is already booked for this date and time",
      });
    }

    const appointment = await Appointment.create({
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      service,
      date,
      time,
      notes: notes?.trim() || "",
    });

    const populatedAppointment = await appointment.populate("service");

    res.status(201).json({
      success: true,
      message: "Appointment created successfully",
      data: populatedAppointment,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to create appointment",
    });
  }
};

export const updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = ["Pending", "Confirmed", "Completed", "Cancelled"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid appointment status",
      });
    }

    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { status },
      {
        new: true,
        runValidators: true,
      },
    ).populate("service");

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Appointment status updated successfully",
      data: appointment,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to update appointment status",
    });
  }
};

export const deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await Appointment.findByIdAndDelete(id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Appointment deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to delete appointment",
    });
  }
};
