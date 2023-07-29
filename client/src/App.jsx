import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/profile/:userId" element={<Profile/>}/>
      </Routes>
    </Router>
  );
}

export default App;
