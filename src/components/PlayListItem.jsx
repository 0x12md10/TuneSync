import React from 'react'
import "./playlistitem.css"
import TransferLogo  from "./TransferLogo"

const PlayListItem = ({data}) => {

  return (
    <div className='playlist-item-container'>
      <div className='playlist-name-container'>
       <p className='name-title'>Name</p> 
      <p className='playlist-name'>{data["name"]}</p>
      </div>
      <div className='playlist-description-container'>
       <p className='description-title'>Description</p> 
      <p  className='playlist-description'>{data["description"] ? data["description"] : "No Description"}</p>
      </div>
      <div className='total-tracks-container'>
        <p className='total-tracks-title'>Total Tracks</p>
      <p className='total-tracks'>{data["tracks"]["total"]}</p>
      </div>
      <div className='btn-container'>
      <p className='transfer-text'>Transfer</p>
      <button className='transfer-btn' ><TransferLogo/></button>
      </div>

    </div>
  )
}

export default PlayListItem