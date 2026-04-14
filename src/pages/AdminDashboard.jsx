import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { insightAgent } from "../api/agents";

export default function AdminDashboard() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEmployees() {
      const snap = await getDocs(collection(db, "employees"));
      const data = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setEmployees(data);
      setLoading(false);
    }

    loadEmployees();
  }, []);

  const total = employees.length;
  const completed = employees.filter((emp) => emp.feedbackGenerated).length;
  const pending = total - completed;

  return (
    <div className="container mt-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start gap-3 mb-4">
        <div>
          <h2>Admin Dashboard</h2>
          <p className="text-muted">Monitor employee AI review status and navigate directly to reports.</p>
        </div>
        <Link to="/" className="btn btn-primary align-self-stretch">
          Back to Dashboard
        </Link>
      </div>

      <div className="row mb-4">
        <div className="col-md-4 mb-3">
          <div className="card admin-card p-4 h-100">
            <h5>Total Employees</h5>
            <p className="display-6 mb-0">{total}</p>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card admin-card p-4 h-100">
            <h5>Reviews Completed</h5>
            <p className="display-6 mb-0">{completed}</p>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card admin-card p-4 h-100">
            <h5>Pending Reviews</h5>
            <p className="display-6 mb-0">{pending}</p>
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <h5 className="mb-3">Employee Review Status</h5>

          {loading ? (
            <p>Loading employees...</p>
          ) : (
            <div className="table-responsive">
              <table className="table align-middle mb-0 admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Performance</th>
                    <th>Status</th>
                    <th>Review</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((employee) => (
                    <tr key={employee.id}>
                      <td>
                        <strong>{employee.name}</strong>
                        <div className="text-muted small">ID: {employee.id}</div>
                      </td>
                      <td>{insightAgent(employee)}</td>
                      <td>
                        <span className={`badge ${employee.feedbackGenerated ? "bg-success" : "bg-warning text-dark"}`}>
                          {employee.feedbackGenerated ? "Reviewed" : "Pending"}
                        </span>
                      </td>
                      <td>{employee.feedbackGenerated ? "Ready" : "Waiting"}</td>
                      <td>
                        <Link to={`/employee/${employee.id}`} className="btn btn-sm btn-outline-primary">
                          View
                        </Link>
                        <Link to={`/review/${employee.id}`} className="btn btn-sm btn-primary ms-2">
                          Review
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
