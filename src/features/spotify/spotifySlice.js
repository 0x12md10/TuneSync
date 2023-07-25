import { createSlice } from "@reduxjs/toolkit";
import {   getToken } from "../../../scripts/auth";
import { getTrackDetails  , migrateToYoutube } from "../../../scripts/migrationScripts";
import { spotifyGetPlayLists , spotifyGetTracks,spotifyGetUser } from "../../../scripts/spotifygetUser";
import { getCookie , setCookie } from "../../../scripts/cookieSetup";


const initialState = {
    loading : false,
    spotifyUserData : {
        loading : false,
        isSpotifyAuthenticated : false,
        spotifyAccessTokens : {},
            userDetails : {},
            userPlaylists : []
    },
    spMigrate : {
        isMigrating : false,
        percentage : 0
    },
    error: ""
}

const spotifySlice = createSlice({
    name : "spotify",
    initialState : initialState,
    reducers : {
        INITIAL_CHECK : (state,action)=> {
                state.spotifyUserData.spotifyAccessTokens = action.payload;
                state.spotifyUserData.isSpotifyAuthenticated = true;
            },
        FETCH_SPOTIFY_TOKENS_REQUESTED : (state)=> {
                state.loading = "true"
        },
        FETCH_SPOTIFY_TOKENS_SUCCESS : (state,action) => {
            console.log(action.payload)
                state.loading = false
                state.spotifyUserData.isSpotifyAuthenticated = true
                state.spotifyUserData.spotifyAccessTokens = action.payload
                
        },
        FETCH_SPOTIFY_TOKENS_FAILURE : (state,action) => {
            if(state.loading === true) {
                state.loading =false,
                state.error = action.payload
            }
        },
        REMOVE_SPOTFIY_AUTH : (state) => {
            state.spotifyUserData.isSpotifyAuthenticated = false
            state.spotifyUserData.spotifyAccessTokens = {};
            setCookie("sp_access_token" ,"" , -99)
            setCookie("sp_refresh_token" , "" , -99)
        },
        TOGGLE_SPOTIFY_USER_DETAILS_REQUESTED : (state,action)=> {
                state.spotifyUserData.loading = action.payload
            },
        SPOTIFY_USER_DETAILS_SUCCESS : (state,action) => {
            const {userDetails , userPlayLists} = action.payload;
            state.spotifyUserData.userDetails = userDetails;
            state.spotifyUserData.userPlaylists = userPlayLists;
        },
        MIGRATE_TO_YOUTUBE_REQUESTED : (state) => {
            state.spMigrate.isMigrating = true;
        },
        MIGRATE_YOUTUBE_SUCCESS : (state) => {
            state.spMigrate.isMigrating = false;
            state.spMigrate.percentage = 0;
        },
        MIGRATING_STATUS : (state,action) => {
            state.spMigrate.percentage = action.payload;
        }
        }

    }
)

 const { actions } = spotifySlice;
 export const { REMOVE_SPOTFIY_AUTH,
            FETCH_SPOTIFY_TOKENS_REQUESTED, 
            FETCH_SPOTIFY_TOKENS_SUCCESS, 
            FETCH_SPOTIFY_TOKENS_FAILURE ,
            TOGGLE_SPOTIFY_USER_DETAILS_REQUESTED,
            SPOTIFY_USER_DETAILS_SUCCESS,
            MIGRATE_TO_YOUTUBE_REQUESTED,
            MIGRATE_YOUTUBE_SUCCESS,
            MIGRATING_STATUS,
            INITIAL_CHECK } = actions;
 export const {reducer} = spotifySlice;

export const fetchSpotifyToken = () => async(dispatch) => {
    dispatch(FETCH_SPOTIFY_TOKENS_REQUESTED())
     
            const response = await getToken();
            console.log(response);
            dispatch(FETCH_SPOTIFY_TOKENS_SUCCESS(response))
}

export const fetchSpotifyUserDetails = () => async(dispatch) => {
        dispatch(TOGGLE_SPOTIFY_USER_DETAILS_REQUESTED(true))
        const spAt = getCookie("sp_access_token")
        const config = {
            headers : {
                "Authorization" : `Bearer ${spAt}`
            }
        }        
        const userDetails = await spotifyGetUser(config);
        const userPlayLists = await spotifyGetPlayLists(config);
        const data = {userDetails , userPlayLists}
        dispatch(SPOTIFY_USER_DETAILS_SUCCESS(data))
        dispatch(TOGGLE_SPOTIFY_USER_DETAILS_REQUESTED(false))
}



export const migrate = (playlist)=> async(dispatch) => {

    console.log("selected playlist : " ,playlist)
    dispatch(MIGRATE_TO_YOUTUBE_REQUESTED())

    const title = playlist.name;
    const description = playlist.description;
    const id = playlist.id;
    console.log(title,description,id);

    const config = {
        headers : {
            "Authorization" : `Bearer ${getCookie("sp_access_token")}`
     
        }
    }
    const spotifyTracks = await spotifyGetTracks(config , id)
    console.log(spotifyTracks)
    // const response = await YoutubeMigrateFlow(playlist);
    const ytPlaylist = "PL2E-e34UBSXQiVDn_s9jUr7mLmJWEOSMa"
    const total = spotifyTracks.tracks.length
    if(ytPlaylist && total  >=1) {
        for(let i = 0 ;i<total;i++) {
            const name = spotifyTracks.tracks[i].name;
            const artist  = spotifyTracks.tracks[i]?.artists[0];
            const trackDetails = await getTrackDetails(name,artist);
            console.log("trackdetails" , trackDetails)
            const response = await migrateToYoutube(trackDetails.id,ytPlaylist,trackDetails.kind,trackDetails.channelId);
            console.log("result" ,response)
            const percentageOver = Math.floor(((i+1) / total)*100);
            console.log("total : ", total," i " , i," percentageover: ", percentageOver," calc1: " , (i+1/total), " calc2: ", ((i+1)/total)*100)
            dispatch(MIGRATING_STATUS(percentageOver))
        }
    }
    dispatch(MIGRATE_YOUTUBE_SUCCESS())
    

}