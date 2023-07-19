import "./homepage.css"
import logo from "../tunesync.png"
import Button from "../components/Button"
import { Link } from "react-router-dom"
const HomeLayout = () => {


  return (
    <div className="homepage">

        <div className="homepage-logo-container">
            <img className="homepage-logo" src={logo} alt="tunesync logo" />
            <h1 className="homepage-title">TUNE SYNC</h1>
        </div>
        <div className="description-container">
            <p className="description">A playlist migration tool that seamlessly transfers playlists between streaming services.</p>
            <Button  className={"btn-start"}>
              <Link to={"/migrate"}>
                Get Started
              </Link>
            </Button>
        </div>
    </div>
  )
}

export default HomeLayout