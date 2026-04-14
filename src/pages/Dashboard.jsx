import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import EmployeeCard from "../components/EmployeeCard";
import { uploadEmployees } from "../utils/uploadEmployees";

export default function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔄 Fetch employees
  async function fetchEmployees() {
    const snap = await getDocs(collection(db, "employees"));

    const data = snap.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    setEmployees(data);
  }

  useEffect(() => {
    fetchEmployees(); // 🔥 only fetch, no auto upload
  }, []);

  // 🔥 Upload button handler
  async function handleUpload() {
    setLoading(true);

    await uploadEmployees(); // safe upload (no duplicates)
    await fetchEmployees();      // refresh UI

    setLoading(false);
  }

  const total = employees.length;
  const completed = employees.filter(e => e.feedbackGenerated).length;

  return (
    <div className="container mt-4">
      {/* 🔥 HEADER + BUTTON */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">AI Performance Dashboard</h2>

       
      </div>

      {/* Summary */}
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="card p-3 text-center">
            <h5>Total Employees</h5>
            <h3>{total}</h3>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card p-3 text-center">
            <h5>Reviews Completed</h5>
            <h3>{completed}</h3>
          </div>
        </div>
      </div>

      {/* Employee Cards */}
      <div className="row">
        {employees.length === 0 ? (
          <p>No employees found. Click "Add Employees".</p>
        ) : (
          employees.map(emp => (
            <div className="col-md-4" key={emp.id}>
              <EmployeeCard employee={emp} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}