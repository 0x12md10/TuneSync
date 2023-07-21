import { UserContext } from "../contexts/UserContext"
import { useContext } from "react";
import PlayListItem from "./PlayListItem";
import "./playlistitems.css"
import { useParams } from "react-router-dom";

const PlayListItems = () => {
    const {spotifyAccessToken,
        ytAccessToken, 
        spotifyUserData,
        setSpotifyUserData,
        youtubeUserData,
        setYoutubeUserData
    } = useContext(UserContext);

    const {client} = useParams()

  return (
    <div className="playListItems-container">
        {
           client === "spotify" && spotifyUserData["userPlayLists"].map(item => {
                return <PlayListItem key={item.id} data={item} />
            })
        }
        {
            client === "youtube" && youtubeUserData["userPlayLists"]["items"].map(
                (item)=> {
                    return <PlayListItem  key={item.id}  data={item}/>
                }
            )
        }
    </div>
  )
}

export default PlayListItems