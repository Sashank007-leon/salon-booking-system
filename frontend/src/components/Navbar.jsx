import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-xl font-bold text-gray-900">
          Salon Booking
        </Link>

        <div className="flex gap-6">
          <Link to="/services" className="text-gray-600 hover:text-gray-900">
            Services
          </Link>

          <Link
            to="/appointments"
            className="text-gray-600 hover:text-gray-900"
          >
            Appointments
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
