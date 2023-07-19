import { Link, Outlet } from "react-router-dom"
import "./Navbar.css";
import logo from "../tunesync.png"

const Navbar = () => {
  return (
    <div className="index-container">
    <nav className="navbar">
      <div className="navbar-logo-container">
        <img className="navbar-logo" src={logo} alt="tunesync logo" />
        <h1 className="navbar-title">TUNE SYNC</h1>
      </div>
      <div className="nav-links">
        <Link to={"/"}>Home</Link>
        <Link to={"/migrate"}>Migrate</Link>
      </div>
    </nav>
    <Outlet/>
  </div>
  )
}

export default Navbar