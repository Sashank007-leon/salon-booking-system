# Salon Booking System

A full-stack salon appointment booking system built for managing salon services and customer appointments.

## Tech Stack

* **Frontend:** React.js, Tailwind CSS, Axios
* **Backend:** Node.js, Express.js
* **Database:** MongoDB, Mongoose

## Features

* Service CRUD (Add, View, Edit, Delete)
* Appointment booking and management
* Appointment status update and filtering
* Date and time validation
* Double-booking prevention
* Form validation and error handling

## API Endpoints

### Services

```text
GET    /api/services
POST   /api/services
PUT    /api/services/:id
DELETE /api/services/:id
```

### Appointments

```text
GET    /api/appointments
POST   /api/appointments
PATCH  /api/appointments/:id/status
DELETE /api/appointments/:id
```

## Setup

### Backend

```bash
cd backend
npm install
```

Create `.env`:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
```

Run:

```bash
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Create `.env`:

```env
VITE_API_URL=http://localhost:3000/api
```

## Business Rules

* Appointment date cannot be in the past.
* Appointment time must be between **8:00 AM and 7:00 PM**.
* The same service cannot be booked for the same date and time.
* Cancelled appointments do not block a time slot.
* Appointment status: Pending, Confirmed, Completed, Cancelled.

## Architecture

```text
React → Axios → Express REST API → Mongoose → MongoDB
```

The backend is organized into **routes, controllers, and models**, while the frontend uses **pages, reusable components, and a centralized API service**.

## Sample Data

Example services:

```text
Haircut        NPR 500    30 min
Hair Coloring  NPR 2500   120 min
Facial         NPR 1500   60 min
```

## Author

**Sashank Khadgi**
