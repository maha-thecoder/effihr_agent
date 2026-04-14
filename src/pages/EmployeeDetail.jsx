import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { insightAgent } from "../api/agents";

export default function EmployeeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [emp, setEmp] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function fetchEmp() {
      const snap = await getDoc(doc(db, "employees", id));
      if (!snap.exists()) {
        setNotFound(true);
        setEmp(null);
        return;
      }
      setNotFound(false);
      setEmp({ id, ...snap.data() });
    }
    fetchEmp();
  }, [id]);

  if (notFound) {
    return (
      <div className="container mt-4">
        <h2>Employee not found</h2>
        <p>No employee record exists for ID: {id}</p>
      </div>
    );
  }

  if (!emp) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <h2>{emp.name}</h2>

      {/* 🔥 Insights */}
      <div className="card p-3 mb-3">
        <h5>Performance Insight</h5>
        <p>{insightAgent(emp)}</p>
      </div>

      {/* 📊 Data Section */}
      <div className="card p-3 mb-3">
        <h5>Work Data</h5>

        <p><strong>Attendance:</strong> {emp.hrms?.attendance}%</p>

        <p><strong>Jira:</strong></p>
        <ul>
          <li>Tasks Assigned: {emp.jira?.tasks_assigned}</li>
          <li>Tasks Completed: {emp.jira?.tasks_completed}</li>
          <li>In Progress: {emp.jira?.in_progress}</li>
        </ul>

        <p><strong>GitHub:</strong></p>
        <ul>
          <li>Commits: {emp.github?.commits}</li>
          <li>Pull Requests: {emp.github?.pull_requests}</li>
          <li>Code Reviews: {emp.github?.code_reviews}</li>
        </ul>

        <p><strong>Documentation:</strong> {emp.documentation?.docs_written}</p>
        <p><strong>Collaboration Score:</strong> {emp.communication?.collaboration_score}/10</p>
      </div>

      <div className="d-flex justify-content-end mt-4">
        <button className="btn btn-outline-primary" onClick={() => navigate(`/review/${id}`)}>
          AI Review
        </button>
      </div>
    </div>
  );
}