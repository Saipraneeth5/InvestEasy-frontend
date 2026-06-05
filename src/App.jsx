import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Assessment from "./pages/Assessment";
import Dashboard from "./pages/Dashboard";
import Tutor from "./pages/Tutor";
import ProtectedRoute from "./components/ProtectedRoute";
import Recommendation from "./pages/Recommendation";
import AssessmentHistory from "./pages/AssessmentHistory";
import RecommendationHistory from "./pages/RecommendationHistory";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/assessment"
          element={
            <ProtectedRoute>
              <Assessment />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tutor"
          element={
            <ProtectedRoute>
              <Tutor />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recommendation"
          element={
            <ProtectedRoute>
              <Recommendation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/assessment-history"
          element={
            <ProtectedRoute>
              <AssessmentHistory />
            </ProtectedRoute>
          }
        />

        <Route
          path="/recommendation-history"
          element={
            <ProtectedRoute>
              <RecommendationHistory />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;