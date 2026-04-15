import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { employees } from "../data/employees";

export async function uploadEmployees() {
  for (let emp of employees) {
    try {
      await setDoc(doc(db, "employees", emp.id), emp);
      console.log("Uploaded:", emp.name);
    } catch (error) {
      console.error("Failed to upload employee", emp.name, error);
      throw error;
    }
  }
}