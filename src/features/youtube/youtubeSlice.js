import { createSlice } from "@reduxjs/toolkit";
import {  getAccessToken } from "../../../scripts/youtube";
import { getYoutubePlaylists,getYoutubeUserDetails } from "../../../scripts/youtubeData";
import { getCookie , setCookie } from "../../../scripts/cookieSetup";


const initialState = {
    loading : false,
    youtubeUserData : {
        loading :false,
        isYoutubeAuthenticated : false,
        youtubeAccessTokens : {},
            UserDetails : {},
            UserPlaylists : []
    },
    error: ""
}

const youtubeSlice = createSlice({
    name : "youtube",
    initialState : initialState,
    reducers : {
        INITIAL_CHECK : (state,action)=> {
                state.youtubeUserData.youtubeAccessTokens = action.payload;
                state.youtubeUserData.isYoutubeAuthenticated = true;
            },
        FETCH_YOUTUBE_TOKENS_REQUESTED : (state)=> {

                state.loading = "true"
        },
        FETCH_YOUTUBE_TOKENS_SUCCESS : (state,action) => {
            console.log(action.payload)
                state.loading = false
                state.youtubeUserData.isYoutubeAuthenticated = true
                state.youtubeUserData.youtubeAccessTokens = action.payload
        },
        FETCH_YOUTUBE_TOKENS_FAILURE : (state,action) => {
            if(state.loading === true) {
                state.loading =false
                state.error = action.payload
            }
        },
        REMOVE_YOUTUBE_AUTH : (state) => {
            state.youtubeUserData.isYoutubeAuthenticated = false
            state.youtubeUserData.youtubeAccessTokens = {}
            setCookie("yt_access_token" , "" , -99)
            setCookie("yt_refresh_token" , "" , -99)
        },
        TOGGLE_YOUTUBE_USER_DETAILS_REQUESTED : (state,action)=> {
            state.youtubeUserData.loading = action.payload
        },
        YOUTUBE_USER_DETAILS_SUCCESS : (state,action) => {
            const {userDetails , userPlayLists} = action.payload;
            state.youtubeUserData.userDetails = userDetails;
            state.youtubeUserData.userPlaylists = userPlayLists;
        }
    }

 })

 const { actions } = youtubeSlice;
 export const { REMOVE_YOUTUBE_AUTH,
            FETCH_YOUTUBE_TOKENS_REQUESTED, 
            FETCH_YOUTUBE_TOKENS_SUCCESS, 
            FETCH_YOUTUBE_TOKENS_FAILURE ,
            TOGGLE_YOUTUBE_USER_DETAILS_REQUESTED,
            YOUTUBE_USER_DETAILS_SUCCESS,
            INITIAL_CHECK } = actions;
 export const {reducer} = youtubeSlice;

export const fetchyoutubeToken = (code) => async(dispatch) => {
        dispatch(FETCH_YOUTUBE_TOKENS_REQUESTED())
        console.log("inside dispatch")
            const response = await getAccessToken(code);
            console.log(response);
            dispatch(FETCH_YOUTUBE_TOKENS_SUCCESS(response))
}

export const fetchYoutubeUserDetails = () => async(dispatch) => {
    dispatch(TOGGLE_YOUTUBE_USER_DETAILS_REQUESTED(true))
    const ytAt = getCookie("yt_access_token");
    const config = {
        headers : {
            "Authorization" : `Bearer ${ytAt}`,
            "Accept" : "application/json"
        }
    }        
    const userDetails = await getYoutubeUserDetails(config);
    const userPlayLists = await getYoutubePlaylists(config);
    const data = {userDetails , userPlayLists}
    console.log(data)
    dispatch(YOUTUBE_USER_DETAILS_SUCCESS(data))
    dispatch(TOGGLE_YOUTUBE_USER_DETAILS_REQUESTED(false))
}