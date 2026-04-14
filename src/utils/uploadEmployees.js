import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { employees } from "../data/employees";

export async function uploadEmployees() {
  for (let emp of employees) {
    await setDoc(doc(db, "employees", emp.id), emp);
    console.log("Uploaded:", emp.name);
  }
}