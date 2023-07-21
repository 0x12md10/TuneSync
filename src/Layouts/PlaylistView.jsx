import "./PlaylistView.css"
import { useParams } from 'react-router-dom';
import UserLogo from "../components/UserLogo";
import { useEffect, useState , useContext } from "react";
import { spotifyGetPlayLists, spotifyGetUser } from "../../scripts/spotifygetUser";
import { getYoutubeUserDetails , getYoutubePlaylists } from "../../scripts/youtubeData"
import { UserContext } from "../contexts/UserContext";
import PlayListItems from "../components/PlayListItems";
import EmailLogo from "../components/EmailLogo";
import CountryLogo from "../components/CountryLogo";

const PlaylistView = () => {

    const {client} = useParams();


    const [isLoading ,setIsLoading] = useState(false);
    const { spotifyAccessToken,
            ytAccessToken, 
            spotifyUserData,
            setSpotifyUserData,
            youtubeUserData,
            setYoutubeUserData
            } = useContext(UserContext);
        

    const getSpotifyDetails = async () => {
        setIsLoading(true)
        const spAt = JSON.parse( localStorage.getItem("spotify_tokens"))["access_token"];
        const config = {
            headers : {
                "Authorization" : `Bearer ${spAt}`
            }
        }        
        const userDetails = await spotifyGetUser(config);
        const userPlayLists = await spotifyGetPlayLists(config);
        const data = {userDetails , userPlayLists}
        setSpotifyUserData(data);
        setIsLoading(false)
    }

    const getYoutubeDetails = async() => {
        setIsLoading(true)
        const ytAt = JSON.parse( localStorage.getItem("yt_tokens"))["access_token"];
        const config = {
            headers : {
                "Authorization" : `Bearer ${ytAt}`,
                "Accept" : "application/json"
            }
        }        
        const userDetails = await getYoutubeUserDetails(config);
        const userPlayLists = await getYoutubePlaylists(config);
        const data = {userDetails , userPlayLists}
        setYoutubeUserData(data);
        setIsLoading(false)

    }

    useEffect(()=> {


        if(client === "spotify") {
            getSpotifyDetails();

        }
        if(client === "youtube") {
            getYoutubeDetails()
        }
    }, [client])

    console.log(client)

    const dummyprofile = "https://www.pngitem.com/pimgs/m/146-1468298_profile-icon-white-png-user-icon-ico-transparent.png"

    const imageUrl = () => {
        if(client === "spotify") {
            const url = spotifyUserData["userDetails"]["images"]
            return url.length > 0 ? url[1]["url"] : dummyprofile
        } 
        if(client ==="youtube") {
            const url = youtubeUserData["userDetails"]["channels"][0]["images"]
            return url  ? url["high"]["url"] : dummyprofile
        }
    }

    return (
     <div className='playlistview-container'>

        {
            !isLoading &&( (client==="youtube" && youtubeUserData )|| ( client === "spotify" && spotifyUserData)) ? 
            <div className={`user-details  ${client === "spotify" ? "user-bg-spotify" : "user-bg-youtube"}`}>
                <div className="user-dp-container">
                <img src={imageUrl()} alt="dp" className="user-dp" />

                </div>
                <div className="user-container">
                    <div className="username">
                        <h2>
                            {client === "spotify" && spotifyUserData["userDetails"]["display_name"]}
                            {client === "youtube" && youtubeUserData["userDetails"]["channels"][0]["title"]}
                            
                        </h2>
                        <p>
                            {client === "spotify" && spotifyUserData["userDetails"]["id"]}
                            {
                               client === "youtube" && youtubeUserData["userDetails"]["channels"][0]["customUrl"] 
                            }
                            
                            </p>
                    </div>
                    <div className="extra-details">
                        <div className="extra-details-item">
                            <div className="user-icons">
                                <UserLogo type={"followers"}/>
                            </div>
                            <div>
                                {client === "spotify" && spotifyUserData["userDetails"]["followers"]}
      

                            </div>
                        </div>
                        <div  className="extra-details-item">
                            <div className="user-icons">
                               <CountryLogo/>
                            </div>
                            <div className="extra-details-text">
                                {client === "spotify" && spotifyUserData["userDetails"]["country"]}
                            </div>
                        </div>
                        <div  className="extra-details-item">
                            <div className="user-icons">
                            <EmailLogo/>
                            </div>
                            <div>
                            {client === "spotify" && spotifyUserData["userDetails"]["email"]}
                            </div>
                            </div>
                    </div>
                </div>
            </div>
        : "loading"
        }
        {
             !isLoading &&( (client==="youtube" && youtubeUserData )|| ( client === "spotify" && spotifyUserData)) ? 
            <PlayListItems client={client} /> : "loading"
        }
    </div>
  )
}

export default PlaylistView