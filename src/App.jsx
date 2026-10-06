import { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Student from "./pages/HandsOn1/Student.jsx";
import StudentMarks from "./pages/HandsOn1/StudentMarks.jsx";
import LoginForm from "./pages/HandsOn1/LoginForm.jsx";
import Users from "./pages/HandsOn2/Users.jsx";

const TABS = [
  { id: "profile", label: "H1 · Student Profile" },
  { id: "marks", label: "H1 · Student Marks" },
  { id: "login", label: "H1 · Login" },
  { id: "users", label: "H2 · Users" },
];

export default function App() {
  const [page, setPage] = useState("profile");

  return (
    <div className="app">
      <Navbar tabs={TABS} activeId={page} onChange={setPage} />

      <main className="main">
        {page === "profile" && (
          <Student name="Rahul" rollNo={101} course="BCA" college="ABC College" />
        )}
        {page === "marks" && <StudentMarks name="Rahul" subject="Java" />}
        {page === "login" && <LoginForm />}
        {page === "users" && <Users />}
      </main>

      <footer className="footer">Module 4 · React Hands-On</footer>
    </div>
  );
}
