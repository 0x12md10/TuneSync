import { createContext, useEffect, useState } from "react";



export const UserContext = createContext();


const UserContextProvider = ({children}) => {

  console.log(window.location)


     {/* Spotify Contents */}
    const [spotifyAccessToken , setSpotifyAccessToken] = useState("");
    const [isSpotifyAuthenticated , setIsSpotifyAuthenticated] = useState(false);
    const [spotifyUserData , setSpotifyUserData] = useState();



    {/* Youtube Contents */}
    const [ytAccessToken , setYtAccessToekn] = useState("");
    const [isYtAuthenticated , setIsYtAuthenticated] = useState(false);
    const [youtubeUserData , setYoutubeUserData] = useState();


     {/* overall state */}

     useEffect(()=> {
      const pathname = window.location.pathname;
      const url = new URL(window.location);
      const code = url.searchParams.get("code");
      const type = url.searchParams.get("type");

  if(code) {
    if(pathname === "/migrate/spotify-auth-callback" ||"/migrate/yt-auth-callback" && type) {
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
     },[window.location])

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
        setSpotifyUserData,
        youtubeUserData,
        setYoutubeUserData
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