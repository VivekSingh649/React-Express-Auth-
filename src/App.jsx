import { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Profile from "./pages/Profile";
import VerifyAccount from "./pages/VerifyAccount";
import { AuthContext } from "./context/authContext";
function App() {
  const { user, isAuthenticated } = useContext(AuthContext);

  const ProtectRoutes = ({ children }) => {
    if (isAuthenticated) {
      return <Navigate to="/profile" />;
    }
    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              isAuthenticated ? (
                <Navigate to="/profile" />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="login"
            element={
              <ProtectRoutes>
                <Login />
              </ProtectRoutes>
            }
          />
          <Route
            path="register"
            element={
              <ProtectRoutes>
                <Register />
              </ProtectRoutes>
            }
          />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="profile" element={<Profile />} />
          <Route path="verify-account" element={<VerifyAccount />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
