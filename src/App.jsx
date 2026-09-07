import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Intro from "./pages/Intro/Intro";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Home from "./pages/Home/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* App Start */}
        <Route path="/" element={<Intro />} />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Main App */}
        <Route path="/home" element={<Home />} />

        {/* Unknown URL */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
