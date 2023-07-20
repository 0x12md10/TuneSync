import YoutubeLogo from "../components/YoutubeLogo"
import SpotifyLogo from "../components/SpotifyLogo"
import Button from "../components/Button"
import "./AuthConnectComponents.css"

const AuthConnectComponents = ({authState,authType , text , clickHandler}) => {
  return (
    <div className={`${authType}-auth`}>
      <div className={authType}>
          {
            authType === "spotify" ? <SpotifyLogo/> : <YoutubeLogo/>
          }
      </div>
      <Button clickHandler={clickHandler} className={"btn-auth"}>{authState ? "Disconnect" : text}</Button>
      {
        authState && <p className="authstate">&bull; Connected</p>
      }
  </div>
  )
}

export default AuthConnectComponents