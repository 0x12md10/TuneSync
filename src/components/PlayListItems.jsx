
import PlayListItem from "./PlayListItem";
import "./playlistitems.css"
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";



const PlayListItems = () => {


    const {client} = useParams()
    const {spotifyUserData} = useSelector(state =>state.spotify);
    const {youtubeUserData} = useSelector(state =>state.youtube)
  

  return (
    <div className="playListItems-container">
        {
           (client === "spotify") && !spotifyUserData.loading && spotifyUserData["userPlaylists"]?.map(item => {
                return <PlayListItem key={item.id} data={item} />
            })
        }
        {
            (client === "youtube") && !youtubeUserData.loading && youtubeUserData["userPlaylists"]?.["items"].map(
                (item)=> {
                    return <PlayListItem  key={item.id}  data={item}/>
                }
            )
        }
    </div>
  )
}

export default PlayListItems