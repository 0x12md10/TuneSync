import { redirect } from "react-router-dom";
import { getCookie } from "../../scripts/cookieSetup";
export const loader = () => {


    const pathname = window.location.pathname;
    const spAt = getCookie("sp_access_token");
    const ytAt = getCookie("yt_access_token")
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