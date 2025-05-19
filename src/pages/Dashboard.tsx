// Layout.js
import { Link } from "react-router-dom";
import CourseTable from "../features/CourseTable";

function Dashboard() {
  return (
    <>
      <a>Dashboard</a>

      <div>
        <CourseTable />
      </div>
      <div>
        <Link to="/">Home</Link>
      </div>
    </>
  );
}

export default Dashboard;