import { createContext, useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom"


export const UserContext = createContext();


const UserContextProvider = ({children}) => {

  const [searchParams] = useSearchParams();
  const path = useLocation();
  const [cbPath , setCbPath] = useState(path);

     {/* Spotify Contents */}
    const [spotifyAccessToken , setSpotifyAccessToken] = useState("");
    const [isSpotifyAuthenticated , setIsSpotifyAuthenticated] = useState(false);
    const [spotifyUserData , setSpotifyUserData] = useState();



    {/* Youtube Contents */}
    const [ytAccessToken , setYtAccessToekn] = useState("");
    const [isYtAuthenticated , setIsYtAuthenticated] = useState(false);


     {/* overall state */}

     useEffect(()=> {
      const code =searchParams.get("code");
      const type = searchParams.get("type")
  if(code) {
    if(path.pathname === "/migrate/spotify-auth-callback" ||"/migrate/yt-auth-callback" && type) {
      const spAt = localStorage.getItem("spotify_tokens")
      const ytAt = localStorage.getItem("yt_tokens")
      if(spAt){
        console.log(spAt)
        setSpotifyAccessToken(JSON.parse(spAt))
        setIsSpotifyAuthenticated(true);
      }
      if(ytAt) {
        console.log(ytAt)
        setYtAccessToekn(JSON.parse(ytAt));
        setIsYtAuthenticated(true);
      }

    }
  }
     },[cbPath,searchParams])

     const userObj = {
        spotifyAccessToken,
        setSpotifyAccessToken,
        isSpotifyAuthenticated,
        setIsSpotifyAuthenticated,
        ytAccessToken,
        setYtAccessToekn,
        isYtAuthenticated,
        setIsYtAuthenticated,
        spotifyUserData,
        setSpotifyUserData
     }
     console.log(userObj)

  return (
    <UserContext.Provider value={userObj}>
        {
            children
        }
    </UserContext.Provider>
  )
}

export default UserContextProvider;