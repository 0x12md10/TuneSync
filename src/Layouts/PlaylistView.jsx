import "./PlaylistView.css"
import { useParams } from 'react-router-dom';
import UserLogo from "../components/UserLogo";
import { useEffect, useState , useContext } from "react";
import { spotifyGetPlayLists, spotifyGetUser } from "../../scripts/spotifygetUser";
import { UserContext } from "../contexts/UserContext";

const PlaylistView = () => {

    const {client} = useParams();


    const [userData ,setUserData] = useState();
    const [isLoading , setIsLoading] = useState(false);
    const { spotifyAccessToken,
        ytAccessToken} = useContext(UserContext);
        

    const getSpotifyDetails = async () => {
        const spAt = JSON.parse( localStorage.getItem("spotify_tokens"))["access_token"];
        const config = {
            headers : {
                "Authorization" : `Bearer ${spAt}`
            }
        }        
        const userDetails = await spotifyGetUser(config);
        const userPlayLists = await spotifyGetPlayLists(config);
        const data = {userDetails , userPlayLists};
        setUserData(data);
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
            userData  ? 
            <div className='user-details'>
            <div className="user-dp-container">
                <img className="user-dp" src={userData["userDetails"]["images"][1]["url"]} alt="user-dp" />
            </div>
            <div className="user-container">
                <div className="username">
                    <h2>{userData["userDetails"]["display_name"]}</h2>
                    <p>{userData["userDetails"]["id"]}</p>
                </div>
                    <ul className="extra-details">
                        <li>{userData["userDetails"]["followers"]}</li>
                        <li>{userData["userDetails"]["country"]}</li>
                        <li>{userData["userDetails"]["email"]}</li>
                    </ul>
            </div>
        </div>
        : "loading"
        }
        {
            userData ? 
            <div className='playlist-items'>
            list
        </div> : "loading"
        }
    </div>
  )
}

export default PlaylistView