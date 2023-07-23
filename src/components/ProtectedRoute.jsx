import { redirect } from "react-router-dom"
export const loader = () => {


    const pathname = window.location.pathname;
    const spAt = JSON.parse(localStorage.getItem("spotify_tokens"))
    const ytAt = JSON.parse(localStorage.getItem("yt_tokens"))
    if((pathname === "/playlist/spotify") && !spAt ) {
         return redirect("/migrate")
    } 
     if((pathname === "/playlist/youtube") && !ytAt) {
         return redirect("/migrate")
    }

    return null;
}

const ProtectedRoute = ({children}) => 
{

        return children


};

export default ProtectedRoute;