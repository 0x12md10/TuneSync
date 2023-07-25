import axios from "axios";
import { getCookie } from "./cookieSetup";






export const getTrackDetails =async (track,artist) => {


    console.log("searhed song :" ,track)
    const rootSearchUrl = "https://youtube.googleapis.com/youtube/v3/search";

    const options= {
        part : ["snippet"].join(),
        maxResults : 5,
        type : "video",
        q : `${track} ${artist}`
    }

    let query = ""
    for(let key in options) {
        query += encodeURIComponent(key) + "=" + encodeURIComponent(options[key]) + "&";
    }
    
const config = {
    headers : {
        "Authorization" : `Bearer ${getCookie("yt_access_token")}`
    }
} 

    const response = await axios.get(`${rootSearchUrl}?${query.slice(0,-1)}`,config);
    const data = response.data;    


    const searchResObj = {
        "id" : data.items[0].id.videoId,
        "kind" : data.items[0].id.kind,
        "title" : data.items[0].snippet.title,
        "images" : data.items[0].snippet.thumbnails,
        "channelId" : data.items[0].snippet.channelId
    }

    console.log("track fetched " ,searchResObj);
    return searchResObj;
}

export const createYoutubePlaylist = async(title , description) => {


    const rootSearchPlaylistUrl = "https://youtube.googleapis.com/youtube/v3/playlists";
    
    const options= {
        part : ["snippet,contentDetails,id,status"].join(",")
    }

    let query = ""
    for(let key in options) {
        query += encodeURIComponent(key) + "=" + encodeURIComponent(options[key]) + "&";
    }

    let body = {
        snippet : {
            title : title,
            description : description
        },
        status : {
            privacyStatus : "public"
        }
    }

    const config = {
        headers : {
            "Authorization" : `Bearer ${getCookie("yt_access_token")}`,
            "Accept" : "application/json",
            "Content-Type" : "application/json"
        }
    } 
    
    console.log(config)

    try {
        const response = await axios.post(`${rootSearchPlaylistUrl}?${query.slice(0,-1)}`,body,config);
        const data = response.data;
    
        const createdPlaylistObj = {
            id :data.id,
            title : data.snippet.title,
            description : data.snippet.description,
            thumbnails : data.snippet.thumbnails,
            totalTracks : data.contentDetails.itemCount,
            status : data.status.privacyStatus
    
        }
        console.log("playlist created",createdPlaylistObj)   
        return createdPlaylistObj;
    } catch (error) {
            throw new Error("error" , error)
    }

}

export const migrateToYoutube =async (trackId, playlistId,kind , SourceChannelId) => {

    const rootInserTrackUrl = "https://youtube.googleapis.com/youtube/v3/playlistItems";
    
    const options= {
        part : ["snippet,contentDetails,id,status"].join(",")
    }

    let query = ""
    for(let key in options) {
        query += encodeURIComponent(key) + "=" + encodeURIComponent(options[key]) + "&";
    }

    let body = {snippet:
                    {playlistId:playlistId,
                    resourceId:{
                        kind:kind,
                        videoId:trackId,
                        channelId:SourceChannelId
                    }
                }}


        const config = {
            headers : {
                "Authorization" : `Bearer ${getCookie("yt_access_token")}`,
                "Accept" : "application/json",
                "Content-Type" : "application/json"
            }
        } 
        
        
    const response = await axios.post(`${rootInserTrackUrl}?${query.slice(0,-1)}`,body,config);
    const data = response.data;
    console.log("migrating to youtube",data)
    return data

}

