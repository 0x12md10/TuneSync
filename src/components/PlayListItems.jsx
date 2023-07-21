import { UserContext } from "../contexts/UserContext"
import { useContext } from "react";
import PlayListItem from "./PlayListItem";
import "./playlistitems.css"

const PlayListItems = () => {
    const {spotifyAccessToken,
        ytAccessToken, spotifyUserData,setSpotifyUserData} = useContext(UserContext);
  return (
    <div className="playListItems-container">
        {
            spotifyUserData["userPlayLists"].map(item => {
                return <PlayListItem key={item.id} data={item} />
            })
        }
    </div>
  )
}

export default PlayListItems