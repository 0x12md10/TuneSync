import "./PlaylistView.css"
import { useParams } from 'react-router-dom';
import UserLogo from "../components/UserLogo";
import { useEffect, useState , useContext } from "react";
import { spotifyGetPlayLists, spotifyGetUser } from "../../scripts/spotifygetUser";
import { UserContext } from "../contexts/UserContext";
import PlayListItems from "../components/PlayListItems";
import EmailLogo from "../components/EmailLogo";
import CountryLogo from "../components/CountryLogo";

const PlaylistView = () => {

    const {client} = useParams();


    const [userData ,setUserData] = useState();
    const [isLoading , setIsLoading] = useState(false);
    const { spotifyAccessToken,
        ytAccessToken, spotifyUserData,setSpotifyUserData} = useContext(UserContext);
        

    const getSpotifyDetails = async () => {
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
    }

    useEffect(()=> {


        if(client === "spotify") {
            getSpotifyDetails();

        }
    }, [client])

    console.log(userData)

    return (
     <div className='playlistview-container'>

        {
            spotifyUserData  ? 
            <div className='user-details'>
                <div className="user-dp-container">
                   {spotifyUserData["userDetails"]["images"][1]["url"] ?
                    <img className="user-dp" src={spotifyUserData["userDetails"]["images"][1]["url"]} alt="user-dp" />
                    :
                    <UserLogo type={"profile"}/>
                }
                </div>
                <div className="user-container">
                    <div className="username">
                        <h2>{spotifyUserData["userDetails"]["display_name"]}</h2>
                        <p>{spotifyUserData["userDetails"]["id"]}</p>
                    </div>
                    <div className="extra-details">
                        <div className="extra-details-item">
                            <div className="user-icons">
                                <UserLogo type={"followers"}/>
                            </div>
                            <div>
                                {spotifyUserData["userDetails"]["followers"]}
                            </div>
                        </div>
                        <div  className="extra-details-item">
                            <div className="user-icons">
                               <CountryLogo/>
                            </div>
                            <div className="extra-details-text">
                                {spotifyUserData["userDetails"]["country"]}
                            </div>
                        </div>
                        <div  className="extra-details-item">
                            <div className="user-icons">
                            <EmailLogo/>
                            </div>
                            <div>
                            {spotifyUserData["userDetails"]["email"]}
                            </div>
                            </div>
                    </div>
                </div>
            </div>
        : "loading"
        }
        {
            spotifyUserData ? 
            <PlayListItems/> : "loading"
        }
    </div>
  )
}

export default PlaylistView