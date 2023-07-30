import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import {CssBaseline, ThemeProvider} from '@mui/material';
import {createTheme} from '@mui/material/styles';
import { themeSettings } from "./theme";


function App() {

  const mode = useSelector((state)=>state.mode);
  const theme = useMemo(()=> createTheme(themeSettings(mode)), [mode]);

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile/:userId" element={<Profile />} />
        </Routes>
      </ThemeProvider>
    </Router>
  );
}

export default App;
