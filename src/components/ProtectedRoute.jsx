import { useContext, useEffect } from "react";
import {useNavigate, useParams} from "react-router-dom"
import { UserContext } from "../contexts/UserContext";


export const loader = () => {


    const {client} = useParams();
    const navigate = useNavigate()
    const {isSpotifyAuthenticated,isYtAuthenticated} = useContext(UserContext);
    
    if((client === "spotify") && !isSpotifyAuthenticated ) {
         navigate("/migrate")
    } 
     if((client === "youtube") && !isYtAuthenticated) {
         navigate("/migrate")
    }
}

const ProtectedRoute = ({children}) => {

        return children


};

export default ProtectedRoute;