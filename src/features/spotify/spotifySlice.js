import { createSlice } from "@reduxjs/toolkit";
import {   getToken } from "../../../scripts/auth";
import { spotifyGetUser } from "../../../scripts/spotifygetUser";
import { spotifyGetPlayLists } from "../../../scripts/spotifygetUser";
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