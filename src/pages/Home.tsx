// Layout.js
import { Link } from "react-router-dom";
import SearchableList from "../components/SearchableList";
import ParentChild from "../components/ParentChild";
import Tabs from "../components/Tabs";
import ThemeContext from "../components/ThemeContext";
import TodoList from "../components/TodoList";
import ToggleSwitch from "../components/ToggleSwitch";
import ToggleText from "../components/ToggleText";
import UserForm from "../components/UserForm";

function Home() {
  const items = ["A", "B", "C"]
  const tabData = [
    {
      title: "A",
      content: (
        <div>
          Data
        </div>
      )
    }
  ]

  return (
    <>
      <nav>
        <ul>
          <li style={{fontSize: 24}}>
            <Link to="/">Home</Link>
          </li>
          <li style={{fontSize: 24}}>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>

      <div>
        <ParentChild />
        <SearchableList items={items} />
        <Tabs tabData={tabData}/>
        <ThemeContext />
        <TodoList />
        <ToggleSwitch />
        <ToggleText />
        <UserForm />
      </div>
    </>
  );
}

export default Home;