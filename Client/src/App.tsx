import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import SignInSide from "./components/Auth/SignIn/SignIn";
import ProtectedRoute from "./components/Auth/protectedRoute";
import SignUp from "./components/Auth/SignUp/SignUp";


// import Dashboard from "./components/Dashboard/dashboard/Dashboard";
// import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignInSide />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
