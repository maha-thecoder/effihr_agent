import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand fw-bold">
          effiHR AI 🚀
        </Link>

        <div className="d-flex gap-2">
          <Link to="/" className="btn btn-outline-light btn-sm">
            Dashboard
          </Link>
          <Link to="/admin" className="btn btn-outline-light btn-sm">
            Admin
          </Link>
        </div>
      </div>
    </nav>
  );
}