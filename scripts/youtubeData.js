import axios from "axios";



export const getYoutubeUserDetails =async (config) => {
    const rootUrl = "https://youtube.googleapis.com/youtube/v3/channels";

    const options= {
        part : ["snippet" , "contentDetails"].join(),
        mine : true
    }

    const qs = new URLSearchParams(options);

    
    const response = await axios.get(`${rootUrl}?${qs.toString()}`,config);
    const data = response.data;
    const userObj = {
        "channels" : data.items.map((item) => {
            const obj ={
                "kind" : item.kind,
                "id" : item.id,
                "title" : item.snippet.title,
                "description" : item.snippet.description,
                "customUrl" : item.snippet.customUrl,
                "images" : item.snippet.thumbnails
            }

            return obj;
        })
        
    }

    return userObj;
    
}

 export const getYoutubePlaylists = async (config) => {
    const rootUrl = `https://youtube.googleapis.com/youtube/v3/playlists`;
  
    const options = {
        part : ["snippet" , "contentDetails" , "id", "status"].join(),
        maxResults : 50,
        mine : true
    };
  
    const qs = new URLSearchParams(options);

    const response = await axios.get(`${rootUrl}?${qs.toString()}`,config);
    const data = response.data;

    const obj =  {
        "kind" : data.kind,
        "pageInfo" : data.pageInfo,
        "items" : data.items.map((item)=> {
            const playListobj = {
                "id" : item.id,
                "title" : item.snippet.title,
                "description" : item.snippet.description,
                "images" : item.snippet.thumbnails,
                "channel" : item.snippet.channelTitle,
                "totaltracks" : item.contentDetails,
                "status" : item.status


            }
            return playListobj;
        })
    }

    return obj;
}

export const getYoutubePlaylistItems = async (config ,playlistId) => {
    const rootUrl = "https://www.googleapis.com/youtube/v3/playlistItems";

    const options= {
        part : ["snippet","contentDetails","id","status"].join(),
        maxResults : 50,
        playlistId : playlistId

    }

    const qs = new URLSearchParams(options);

    
    const response = await axios.get(`${rootUrl}?${qs.toString()}`,config);
    const data = response.data;
    const tracksObj = {
        "kind" : data.kind,
        "tracks" : data.items.map((item)=> {
            const obj = {
                "id" : item.id,
                "title" : item.snippet.title,
                "description" : item.snippet.description,
                "images" : item.snippet.thumbnails,
                "position" : item.snippet.position,
                "trackId" : item.snippet.resourceId
            }
            return obj;
        })
    }

    let pageToken = data.nextPageToken;

    while(pageToken) {
        
    const options= {
        part : ["snippet","contentDetails","id","status"].join(),
        maxResults : 50,
        playlistId : playlistId,
        pageToken : pageToken

    }

    const qs = new URLSearchParams(options);
    const response = await axios.get(`${rootUrl}?${qs.toString()}`,config);
    const data = response.data;

    data.items.map((item)=> {
        const obj = {
            "id" : item.id,
            "title" : item.snippet.title,
            "description" : item.snippet.description,
            "images" : item.snippet.thumbnails,
            "position" : item.snippet.position,
            "trackId" : item.snippet.resourceId
        }
        tracksObj.tracks.push(obj);

    })

    pageToken = data.nextPageToken;

    }


    return tracksObj;
}

