// Layout.js
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <>
      <a>Dashboard</a>
      <div>
        <Link to="/">Home</Link>
      </div>
    </>
  );
}

export default Dashboard;