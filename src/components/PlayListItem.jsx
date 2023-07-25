import "./playlistitem.css"
import TransferLogo  from "./TransferLogo"
import { useNavigate, useParams } from 'react-router-dom'
import { migrate as youtubeMigrate } from "../features/spotify/spotifySlice"
import { useDispatch } from "react-redux"

const PlayListItem = ({data }) => {

  const {client} = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const transfer= () => {
    
    dispatch(youtubeMigrate(data));
    navigate(`/${client}/migration`) ;
  }


  return (
    <div className='playlist-item-container'>
      <div className='playlist-container playlist-name-container'>
       <p className='name-title'>Name</p> 
      {
        client === "spotify" &&
        <p className='playlist-name'>{data["name"]}</p>
      }
      {client === "youtube" &&
        <p className='playlist-name'>{data["title"]}</p>
      }
      </div>
      <div className='playlist-container playlist-description-container'>
       <p className='description-title'>Description</p> 
      {client === "spotify" &&
        <p  className='playlist-description'>{data["description"] ? data["description"] : "No Description"}</p>
      }
      {client === "youtube" &&
      <p  className='playlist-description'>{data["description"] ? data["description"] : "No Description"}</p>
      }
      </div>
      <div className='playlist-container total-tracks-container'>
        <p className='total-tracks-title'>Total Tracks</p>
        {client === "spotify" &&
                <p className='total-tracks'>{data["tracks"]["total"]}</p>
        }
        {
          client === "youtube" &&
                <p className='total-tracks'>{data["totaltracks"]["itemCount"]}</p>
        }
      </div>
      <div className='playlist-container btn-container'>
      <p className='transfer-text'>Transfer</p>
      <button className='transfer-btn' onClick={transfer} ><TransferLogo/></button>
      </div>

    </div>
  )
}

export default PlayListItem