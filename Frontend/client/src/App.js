import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Register from './pages/Register';
import Login from './pages/Login';
import ForgotPassword from "./pages/ForgotPassword";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import GoalPage from "./pages/GoalPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ProtectedRouters><HomePage /></ProtectedRouters>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/goal" element={<GoalPage />} /> {/* Corrected to use 'element' */}
      </Routes>
    </>
  );
}

export function ProtectedRouters(props) {
  if (localStorage.getItem("user")) {
    return props.children;
  } else {
    return <Navigate to="/login" />;
  }
}

export default App;
