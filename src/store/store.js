import { configureStore } from '@reduxjs/toolkit'
import { reducer as youtubeReducer } from '../features/youtube/youtubeSlice'
import { reducer as spotifyReducer} from '../features/spotify/spotifySlice';


const store = configureStore({
    reducer : {
        spotify : spotifyReducer,
        youtube : youtubeReducer
    }
})

export default store;