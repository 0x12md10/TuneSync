import AuthConnectComponents from "../components/AuthConnectComponents"
import "./MigrateLayout.css"
import { useState, useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom"
import { getGoogleUrl  } from "../../scripts/youtube"
import {authFlow } from "../../scripts/auth";
import { useDispatch, useSelector } from "react-redux";
import { fetchSpotifyToken,INITIAL_CHECK as SP_INITIAL_CHECK ,REMOVE_SPOTFIY_AUTH} from "../features/spotify/spotifySlice";
import { fetchyoutubeToken ,INITIAL_CHECK as YT_INITIAL_CHECK ,REMOVE_YOUTUBE_AUTH } from "../features/youtube/youtubeSlice";


const MigrateLayout = () => {

  const {spotifyUserData} = useSelector(state =>state.spotify);
  const {youtubeUserData} = useSelector(state =>state.youtube)

  const dispatch = useDispatch()

  const [searchParams,setSearchParams] = useSearchParams();
  const [spotifyAuthCode , setSpotifyAuthCode] = useState("");
  const [ytAuthCode , setYtAuthCode] = useState("");

  const path = useLocation();
  const [cbPath , setCbPath] = useState(path);



  useEffect(()=> {
    
    const SpotifyToken = async() => {
      dispatch(fetchSpotifyToken())
      setSearchParams(searchParams => {
        searchParams.set("type", "spotify");
        return searchParams;
      });
  }

  const ytToken = async() => {
    dispatch(fetchyoutubeToken(code));
    console.log("inside token fetch")
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

  if(localStorage.getItem("spotify_tokens")) {
    dispatch(SP_INITIAL_CHECK(JSON.parse(localStorage.getItem("spotify_tokens"))))
  }

  if(localStorage.getItem("yt_tokens")) {
    dispatch(YT_INITIAL_CHECK(JSON.parse(localStorage.getItem("yt_tokens"))))
  }
console.log("inside useffect") 


  },[cbPath]);

  const clickHandler = (type) => {
    if(type === "spotify") {
      if(spotifyUserData.isSpotifyAuthenticated) {
        dispatch(REMOVE_SPOTFIY_AUTH())
      } else {
        authFlow()
      }

    }
    if(type === "yt") {
      if(youtubeUserData.isYoutubeAuthenticated) {
        dispatch(REMOVE_YOUTUBE_AUTH())
      } else {
        getGoogleUrl()
      }
    }
  }

 
  return (
    <div className="migrate-container">
        <h2 className="migrate-title">Sign In with Spotify and Youtube to start managing and migrating your musics.</h2>
        <div className="auth">
            <AuthConnectComponents authState={spotifyUserData.isSpotifyAuthenticated} clickHandler={()=>clickHandler("spotify")} authType={"spotify"} text={"Connect with Spotify"}/>
            <AuthConnectComponents authState = {youtubeUserData.isYoutubeAuthenticated} clickHandler={()=>clickHandler("yt")} authType={"yt"} text={"Connect with Youtube"}/>

        </div>
    </div>
  )
}

export default MigrateLayout