import "./App.css";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import Home from "./Components/Home/Home";
import Alert from "./Components/Alerts/Alert";
import LogIn from "./Components/Login/LogIn";

function App() {
  return (
    <div className="App">
    <Router>
      <div className="App-header">
        <p>Stock Alert</p>
      </div>
      <div className="App-header">
        <Link className="App-link" to="/">Home</Link>
        <Link className="App-link" to="/alerts">Alerts</Link>
        <Link className="App-link" to="/logIn">LogIn/SignUp</Link>
      </div>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/alerts" element={<Alert />} />
        <Route path="/logIn" element={<LogIn />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
