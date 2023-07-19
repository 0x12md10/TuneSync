import { useEffect } from "react"
import authFlow, { getToken } from "../scripts/auth";
import "./App.css"
import { useState } from "react"
import { useLocation, useSearchParams } from "react-router-dom"
import { getAccessToken, getGoogleUrl } from "../scripts/youtube";



function App() {


  const [searchParams] = useSearchParams();
  const [spotifyAuthCode , setSpotifyAuthCode] = useState("");
  const [ytAuthCode , setYtAuthCode] = useState("");

  const path = useLocation();
  const [cbPath , setCbPath] = useState(path);

  useEffect(()=> {
    
    const token = async() => {
      await getToken()
  }
   
    const code =searchParams.get("code")
  if(code) {
    if(path.pathname === "/spotify-auth-callback") {
      setSpotifyAuthCode(code)
      token()
      console.log("inspide spotify token get")
    }
    if(path.pathname === "/yt-auth-callback") {
      setYtAuthCode(code);
      getAccessToken(code);
      console.log("inspide yt token get")

    }
  }
    console.log("inside useffect")


  },[cbPath])


  return (
    <div>
     <button onClick={authFlow}> <h1>Login with spotify</h1></button>
     <button onClick={getGoogleUrl}> <h1>Login with Youtube</h1></button>
    </div>
  )
}

export default App
