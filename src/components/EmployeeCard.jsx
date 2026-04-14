import { useNavigate } from "react-router-dom";
import { nudgeAgent, insightAgent } from "../api/agents";

export default function EmployeeCard({ employee }) {
  const navigate = useNavigate();

  const insight = insightAgent(employee);
  const nudge = nudgeAgent(employee);

  return (
    <div className="card employee-card p-4 shadow-sm mb-4 border-0">
      <div className="d-flex justify-content-between align-items-start mb-3">
        <div>
          <h5 className="mb-1">{employee.name}</h5>
          <small className="text-muted">ID: {employee.id}</small>
        </div>
        <span className={`badge ${employee.feedbackGenerated ? "bg-success" : "bg-warning text-dark"}`}>
          {employee.feedbackGenerated ? "Reviewed" : "Pending"}
        </span>
      </div>

      <p className="mb-2">
        <strong>Performance:</strong>{" "}
        <span
          className={
            insight.includes("High")
              ? "text-success"
              : insight.includes("Average")
              ? "text-warning"
              : "text-danger"
          }
        >
          {insight}
        </span>
      </p>

      <p className="mb-4">
        <strong>Status:</strong> {nudge}
      </p>

      <button
        className="btn btn-primary w-100"
        onClick={() => navigate(`/employee/${employee.id}`)}
      >
        Get Review
      </button>
    </div>
  );
}