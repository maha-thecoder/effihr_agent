import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { generateFullAnalysis } from "../api/agents";

export default function ReviewPage() {
  const { id } = useParams();
  const [emp, setEmp] = useState(null);
  const [review, setReview] = useState("");
  const [status, setStatus] = useState("loading");
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadReview() {
      try {
        const snap = await getDoc(doc(db, "employees", id));
        if (!snap.exists()) {
          setNotFound(true);
          setStatus("done");
          return;
        }

        const employee = { id, ...snap.data() };
        setEmp(employee);

        if (employee.feedbackText) {
          setReview(employee.feedbackText);
          setStatus("done");
          return;
        }

        setStatus("generating");
        const result = await generateFullAnalysis(employee);
        setReview(result);
        await updateDoc(doc(db, "employees", id), {
          feedbackGenerated: true,
          feedbackText: result
        });
        setStatus("done");
      } catch (err) {
        console.error(err);
        setError("Unable to generate review right now. Please try again.");
        setStatus("error");
      }
    }

    loadReview();
  }, [id]);

  if (notFound) {
    return (
      <div className="container mt-4">
        <h2>Employee not found</h2>
        <p>No employee record exists for ID: {id}</p>
        <Link to="/" className="btn btn-primary mt-3">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start gap-3 mb-4">
        <div>
          <h2>AI Review</h2>
          <p className="text-muted mb-0">Review for employee ID: {id}</p>
        </div>
        <div className="d-flex gap-2">
          <Link to={`/employee/${id}`} className="btn btn-outline-secondary">
            Back to Details
          </Link>
          <Link to="/" className="btn btn-primary">
            Dashboard
          </Link>
        </div>
      </div>

      <div className="card review-card p-4 shadow-sm border-0">
        {status === "loading" && <p>Loading employee data...</p>}
        {status === "generating" && <p className="text-primary">Generating AI review... please wait.</p>}
        {status === "error" && <div className="alert alert-danger">{error}</div>}
        {status === "done" && review && (
          <>
            <h5 className="mb-3">Generated Review</h5>
            <pre className="review-text">{review}</pre>
          </>
        )}
      </div>
    </div>
  );
}
