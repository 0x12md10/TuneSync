import axios from "axios";

const config = {
        headers : {
    "Authorization" : "Bearer ya29.a0AbVbY6PXsq1etW0Qc2q1r6o8yvWSK_Jy6McJOc4-E8HHuMKD9q7JtyjnV1VIUtBKILnp6G-LfUlJe4asRy4YVXo-ik53TtqbStxI_s5nLXYTZPcEZOSgr9ZmiAm9-Ict5QzlmaOzYgBXKDeZzTKJNqsWKoPVaCgYKAXYSARISFQFWKvPlIZfxRGovVpf81wOj2b4wxw0163",
    "Accept" : "application/json"
}
    }

const getYoutubeUserDetails =async () => {
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

    console.log(userObj)
    return userObj;
    
}

const getYoutubePlaylists = async () => {
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
    console.log(obj)
    return obj;
}

const getYoutubePlaylistItems = async (playlistId) => {
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

