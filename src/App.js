import { Outlet } from "react-router-dom";
import Header from "./common/Header";
import "./styles/global.css";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="app-container">
        <Outlet />
      </div>
    </div>
  );
}

export default App;