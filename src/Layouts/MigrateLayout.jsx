import YoutubeLogo from "../components/YoutubeLogo"
import SpotifyLogo from "../components/SpotifyLogo"
import "./MigrateLayout.css"

const MigrateLayout = () => {
  return (
    <div className="migrate-container">
        <h2 className="migrate-title">Sign In with Spotify and Youtube to start managing and migrating your musics.</h2>
        <div className="auth">
            <div className="spotify-auth">
                <div className="spotify">
                    <SpotifyLogo/>
                </div>
                <button className="btn-auth">Sign In With Spotify</button>
            </div>
            <div className="yt-auth">
                <div className="yt">
                    <YoutubeLogo/>
                </div>
                <button className="btn-auth">Sign In With Spotify</button>
            </div>
        </div>
    </div>
  )
}

export default MigrateLayout