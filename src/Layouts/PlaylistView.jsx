import "./PlaylistView.css"
import { useParams } from 'react-router-dom';
import { useEffect } from "react";
import PlayListItems from "../components/PlayListItems";
import { fetchSpotifyUserDetails} from "../features/spotify/spotifySlice";
import { useDispatch } from "react-redux";
import { fetchYoutubeUserDetails } from "../features/youtube/youtubeSlice";
import UserComponent from "../components/UserComponent";

const PlaylistView = () => {

    const {client} = useParams();
  
    const dispatch = useDispatch()
        

    const getSpotifyDetails = async () => {
        dispatch(fetchSpotifyUserDetails())
    }

    const getYoutubeDetails = async() => {
        dispatch(fetchYoutubeUserDetails())
    }

    useEffect(()=> {

        console.log(client)
        if(client === "spotify") {
            getSpotifyDetails();

        }
        if(client === "youtube") {
            getYoutubeDetails()
        }
    }, [client])



    return (
     <div className='playlistview-container'>
        <UserComponent  />

        <PlayListItems  />

    </div>
  )
}

export default PlaylistView