import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthForm } from "./components/AuthForm";
import { Navbar } from "./components/Navbar";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";
import { AuthPage } from "./pages/AuthPage";
import { DashboardPage } from "./pages/DashboardPage";

function App() {
  const { user } = useAuth();
  const [authMode, setAuthMode] = useState("login");
  const [authOpen, setAuthOpen] = useState(false);

  const openAuth = (mode) => {
    setAuthMode(mode);
    setAuthOpen(true);
  };

  return (
    <div className="app-shell">
      <Navbar onOpenAuth={openAuth} />
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <AuthPage onOpenAuth={openAuth} />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
      </Routes>

      {!user && authOpen ? (
        <div className="auth-overlay" onClick={() => setAuthOpen(false)} role="presentation">
          <div className="auth-modal card" onClick={(event) => event.stopPropagation()}>
            <div className="auth-modal-header">
              <div>
                <p className="eyebrow">Member Access</p>
                <h2>{authMode === "signup" ? "Create your account" : "Welcome back"}</h2>
              </div>
              <button
                aria-label="Close authentication form"
                className="close-button"
                onClick={() => setAuthOpen(false)}
                type="button"
              >
                ×
              </button>
            </div>

            <div className="mode-switch">
              <button
                className={authMode === "login" ? "switch-active" : ""}
                onClick={() => setAuthMode("login")}
                type="button"
              >
                Login
              </button>
              <button
                className={authMode === "signup" ? "switch-active" : ""}
                onClick={() => setAuthMode("signup")}
                type="button"
              >
                Signup
              </button>
            </div>

            <AuthForm mode={authMode} />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default App;
