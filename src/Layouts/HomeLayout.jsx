import "./homepage.css"
import logo from "../tunesync.png"
import Button from "../components/Button"
import {  useNavigate } from "react-router-dom"
const HomeLayout = () => {

  const navigate = useNavigate()
  const route = () => {
     return navigate("/migrate")
  }

  return (
    <div className="homepage">

        <div className="homepage-logo-container">
            <img className="homepage-logo" src={logo} alt="tunesync logo" />
            <h1 className="homepage-title">TUNE SYNC</h1>
        </div>
        <div className="description-container">
            <p className="description">A playlist migration tool that seamlessly transfers playlists between streaming services.</p>
            <Button clickHandler={route}  className={"btn-start"}>
              Get Started
            </Button>
        </div>
    </div>
  )
}

export default HomeLayout