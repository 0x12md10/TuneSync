import YoutubeLogo from "../components/YoutubeLogo"
import SpotifyLogo from "../components/SpotifyLogo"
import Button from "../components/Button"
import "./AuthConnectComponents.css"

const AuthConnectComponents = ({authType , text}) => {
  return (
    <div className={`${authType}-auth`}>
      <div className={authType}>
          {
            authType === "spotify" ? <SpotifyLogo/> : <YoutubeLogo/>
          }
      </div>
      <Button className={"btn-auth"}>{text}</Button>
  </div>
  )
}

export default AuthConnectComponents