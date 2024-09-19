import { useState } from "react";
import LeaguesTable from "./LeagueTable";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Leagues</h1>
      <LeaguesTable />
    </>
  );
}

export default App;
