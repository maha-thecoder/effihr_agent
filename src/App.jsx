import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDetail from "./pages/EmployeeDetail";
import ReviewPage from "./pages/ReviewPage";

// Components
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <BrowserRouter>
      {/* 🔝 Top Navigation */}
      <Navbar />

      <main className="container-fluid app-container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/employee/:id" element={<EmployeeDetail />} />
          <Route path="/review/:id" element={<ReviewPage />} />
          <Route
            path="*"
            element={
              <div className="text-center mt-5">
                <h2>404 - Page Not Found</h2>
                <p>The page you are looking for does not exist.</p>
              </div>
            }
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}