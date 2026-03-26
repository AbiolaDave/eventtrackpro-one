
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  let navigate = useNavigate();
  const register = () => {
    navigate("/register");
  };
  const login = () => {
    navigate("/selectlogin");
  };
  return (
    <nav className="navbar-modern">
      <div className="navbar-container">
        <a href="/" className="navbar-logo">
          <img src="/attendance-logo1.jpeg" alt="EventTrackPro" className="navbar-logo-img" />
          <span className="navbar-logo-text">EventTrackPro</span>
        </a>
        <button
          className="navbar-toggle"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-menu">
            <li className="navbar-item">
              <a href="/" className="navbar-link">About Us</a>
            </li>
            <li className="navbar-item">
              <a href="/" className="navbar-link">How To Register</a>
            </li>
            <li className="navbar-item">
              <a href="/" className="navbar-link">Our Team</a>
            </li>
          </ul>
          <div className="navbar-buttons">
            <button onClick={login} className="btn-navbar btn-navbar-outline">
              Log in
            </button>
            <button onClick={register} className="btn-navbar btn-navbar-primary">
              Register
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
