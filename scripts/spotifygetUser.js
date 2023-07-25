import axios from "axios"


export const spotifyGetUser = async (config) => {

    const response = await axios.get("https://api.spotify.com/v1/me" , config);
    const data = response.data;
    const spotifyUser = {
        "display_name" : data["display_name"],
        "id" : data["id"],
        "images" : data["images"],
        "uri" : data["uri"],
        "followers" : data["followers"]["total"],
        "country" : data["country"],
        "subscription" : data["product"],
        "email" : data["email"]

    }
    return spotifyUser;
}

export const spotifyGetPlayLists = async (config) => {

    const response = await axios.get("https://api.spotify.com/v1/me/playlists" , config);
    const data = response.data.items;
    const spotifyPlaylists= data.map(item => {
        const obj = {
            "description" : item["description"],
            "href" : item["href"],
            "id" : item["id"],
            "name" : item["name"],
            "images" : item["images"],
            "snapshot_id" : item["snapshot_id"],
            "tracks" : item["tracks"],
            "type" : item["type"],
            "uri" : item["uri"]
        }
        return obj;
    })

    return spotifyPlaylists;

}

export const spotifyGetTracks =async (config,playlistId) => {
    const response = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`,config);
    const data = response.data;
    const tracksObj = {
        "href" : data["href"],
        "limit" : data["limit"],
        "next" : data["next"],
        "offset" : data["offset"],
        "previous" : data["previous"],
        "total" : data["total"],
        "tracks" : data["items"].map((item)=> {
            const obj = {
                    "images" : item["track"]["album"]["images"],
                    "artists" : item["track"]["artists"].map((artist)=> {
                        return artist["name"];
                    }),
                    "disc_number" : item["track"]["disc_number"],
                    "duration_ms" : item["track"]["duration_ms"],
                    "spotifyUrl" : item["track"]["external_urls"]["spotify"],
                    "href" : item["track"]["href"],
                    "id" : item["track"]["id"],
                    "name" : item["track"]["name"],
                    "uri" : item["track"]["uri"],
                    "type" : item["track"]["type"]
            }
    
            return obj;
    
        })
    }

    while(tracksObj["next"]) {
        console.log("increment")
        const response = await axios.get(tracksObj["next"] , config);
        const data  = response.data;
        tracksObj["next"] = data["next"];
        data["items"].map((item)=> {
            const obj = {
                    "images" : item["track"]["album"]["images"],
                    "artists" : item["track"]["artists"].map((artist)=> {
                        return artist["name"];
                    }),
                    "disc_number" : item["track"]["disc_number"],
                    "duration_ms" : item["track"]["duration_ms"],
                    "spotifyUrl" : item["track"]["external_urls"]["spotify"],
                    "href" : item["track"]["href"],
                    "id" : item["track"]["id"],
                    "name" : item["track"]["name"],
                    "uri" : item["track"]["uri"],
                    "type" : item["track"]["type"]
            }
            tracksObj["tracks"].push(obj);

    
        })


    }

    console.log(tracksObj)
    return tracksObj;


}
