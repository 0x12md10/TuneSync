import AuthConnectComponents from "../components/AuthConnectComponents"
import "./MigrateLayout.css"
import { UserContext } from "../contexts/UserContext";
import { useState, useEffect , useContext } from "react";
import { useLocation, useSearchParams } from "react-router-dom"
import { getGoogleUrl , getAccessToken } from "../../scripts/youtube"
import {authFlow , getToken} from "../../scripts/auth";


const MigrateLayout = () => {

  const { spotifyAccessToken,
    setSpotifyAccessToken,
    isSpotifyAuthenticated,
    setIsSpotifyAuthenticated,
    ytAccessToken,
    setYtAccessToekn,
    isYtAuthenticated,
    setIsYtAuthenticated}  = useContext(UserContext)
  const [searchParams,setSearchParams] = useSearchParams();
  const [spotifyAuthCode , setSpotifyAuthCode] = useState("");
  const [ytAuthCode , setYtAuthCode] = useState("");

  const path = useLocation();
  const [cbPath , setCbPath] = useState(path);



  useEffect(()=> {
    
    const SpotifyToken = async() => {
      await getToken();
      setSearchParams(searchParams => {
        searchParams.set("type", "spotify");
        return searchParams;
      });
  }

  const ytToken = async() => {
    await getAccessToken(code);
    setSearchParams(searchParams => {
      searchParams.set("type", "yt");
      return searchParams;
    });
  }
   
    const code =searchParams.get("code")
  if(code) {
    if(path.pathname === "/migrate/spotify-auth-callback") {
      setSpotifyAuthCode(code);
      SpotifyToken();

      console.log("inspide spotify token get")
    }
    if(path.pathname === "/migrate/yt-auth-callback") {
      setYtAuthCode(code);
      ytToken();
    }
  }
console.log("inside useffect") 


  },[cbPath]);

  const clickHandler = (type) => {
    if(type === "spotify") {
      if(isSpotifyAuthenticated) {
        setIsSpotifyAuthenticated(false);
        setSpotifyAccessToken("");
        localStorage.removeItem("spotify_tokens");
      } else {
        authFlow()
      }

    }
    if(type === "yt") {
      if(isYtAuthenticated) {
        setIsYtAuthenticated(false);
        setYtAccessToekn("");
        localStorage.removeItem("yt_tokens");
      } else {
        getGoogleUrl()
      }
    }
  }

 
  return (
    <div className="migrate-container">
        <h2 className="migrate-title">Sign In with Spotify and Youtube to start managing and migrating your musics.</h2>
        <div className="auth">
            <AuthConnectComponents authState={isSpotifyAuthenticated} clickHandler={()=>clickHandler("spotify")} authType={"spotify"} text={"Connect with Spotify"}/>
            <AuthConnectComponents authState = {isYtAuthenticated} clickHandler={()=>clickHandler("yt")} authType={"yt"} text={"Connect with Youtube"}/>

        </div>
    </div>
  )
}

export default MigrateLayout