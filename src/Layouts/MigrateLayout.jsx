import AuthConnectComponents from "../components/AuthConnectComponents"
import "./MigrateLayout.css"

const MigrateLayout = () => {
  return (
    <div className="migrate-container">
        <h2 className="migrate-title">Sign In with Spotify and Youtube to start managing and migrating your musics.</h2>
        <div className="auth">
            <AuthConnectComponents authType={"spotify"} text={"Connect with Spotify"}/>
            <AuthConnectComponents authType={"yt"} text={"Connect with Youtube"}/>

        </div>
    </div>
  )
}

export default MigrateLayout