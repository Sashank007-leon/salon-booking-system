import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Services from "./pages/Services";
import Appointments from "./pages/Appointments";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />

      <main className="min-h-screen bg-[#f8f8f7]">
        <Routes>
          <Route path="/" element={<Navigate to="/appointments" replace />} />

          <Route path="/services" element={<Services />} />

          <Route path="/appointments" element={<Appointments />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
