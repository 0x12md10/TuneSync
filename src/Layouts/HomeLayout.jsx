import "./homepage.css"
import logo from "../tunesync.png"

const HomeLayout = () => {
  return (
    <div className="homepage">

        <div className="homepage-logo-container">
            <img className="homepage-logo" src={logo} alt="tunesync logo" />
            <h1 className="homepage-title">TUNE SYNC</h1>
        </div>
        <div className="description-container">
            <p className="description">A playlist migration tool that seamlessly transfers playlists between streaming services.</p>
            <button className="btn-start">Get Started</button>
        </div>
    </div>
  )
}

export default HomeLayout