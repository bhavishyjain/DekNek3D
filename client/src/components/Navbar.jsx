import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const Navbar = ({ onOpenAuth }) => {
  const { user, logout } = useAuth();

  return (
    <header className="navbar">
      <Link className="brand" to="/">
        DekNek3D
      </Link>

      <div className="nav-copy">
        <span>3D Production Workspace</span>
        <div className="nav-actions">
          {user ? (
            <button className="ghost-button" onClick={logout} type="button">
              Logout
            </button>
          ) : (
            <>
              <button className="ghost-button" onClick={() => onOpenAuth("login")} type="button">
                Login
              </button>
              <button
                className="primary-button nav-primary"
                onClick={() => onOpenAuth("signup")}
                type="button"
              >
                Signup
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
