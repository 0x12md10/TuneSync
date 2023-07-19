import { createContext, useState } from "react";

const UserContext = createContext();


const UserContextProvider = ({children}) => {

     {/* Spotify Contents */}
    const [spotifyAccessToken , setSpotifyAccessToken] = useState("");
    const [isSpotifyAuthenticated , setIsSpotifyAuthenticated] = useState(false);



    {/* Youtube Contents */}
    const [ytAccessToekn , setYtAccessToekn] = useState("");
    const [isYtAuthenticated , setIsYtAuthenticated] = useState(false);


     {/* overall state */}

     const userObj = {
        spotifyAccessToken,
        setSpotifyAccessToken,
        isSpotifyAuthenticated,
        setIsSpotifyAuthenticated,
        ytAccessToekn,
        setYtAccessToekn,
        isYtAuthenticated,
        setIsYtAuthenticated
     }

  return (
    <UserContext.Provider value={userObj}>
        {
            children
        }
    </UserContext.Provider>
  )
}

export default UserContextProvider;