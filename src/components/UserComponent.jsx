import CountryLogo from "./CountryLogo"
import UserLogo from "./UserLogo"
import EmailLogo from "./EmailLogo"
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import "./userComponent.css"
import Loader from "./Loader";

const UserComponent = () => {

    const {client} = useParams();
    const {spotifyUserData} = useSelector(state =>state.spotify);
    const {youtubeUserData} = useSelector(state =>state.youtube);
    
    const dummyprofile = "https://www.pngitem.com/pimgs/m/146-1468298_profile-icon-white-png-user-icon-ico-transparent.png"

    const imageUrl = () => {
        if((client === "spotify") &&  spotifyUserData["userDetails"]) {
            const url = spotifyUserData["userDetails"]["images"]
            return url? url[1]["url"] : dummyprofile
        } 
        if((client ==="youtube") && youtubeUserData["userDetails"]) {
            const url = youtubeUserData["userDetails"]["channels"][0]["images"]
            return url  ? url["high"]["url"] : dummyprofile
        }
    }
  return (
    <>
            {
            ( ((client==="youtube") && youtubeUserData.userDetails &&  !youtubeUserData.loading )|| (!spotifyUserData.loading && (client === "spotify") && spotifyUserData.userDetails) ) ? 
            <div className={`user-details  ${client === "spotify" ? "user-bg-spotify" : "user-bg-youtube"}`}>
                <div className="user-dp-container">
                <img src={imageUrl()} alt="dp" className="user-dp" />

                </div>
                <div className="user-container">
                    <div className="username">
                        <h2>
                            {client === "spotify" && spotifyUserData["userDetails"]["display_name"]}
                            {client === "youtube" && youtubeUserData["userDetails"]["channels"][0]["title"]}
                            
                        </h2>
                        <p>
                            {client === "spotify" && spotifyUserData["userDetails"]["id"]}
                            {
                               client === "youtube" && youtubeUserData["userDetails"]["channels"][0]["customUrl"] 
                            }
                            
                            </p>
                    </div>
                    <div className="extra-details">
                        <div className="extra-details-item">
                            <div className="user-icons">
                                <UserLogo type={"followers"}/>
                            </div>
                            <div>
                                {client === "spotify" && spotifyUserData["userDetails"]["followers"]}
      

                            </div>
                        </div>
                        <div  className="extra-details-item">
                            <div className="user-icons">
                               <CountryLogo/>
                            </div>
                            <div className="extra-details-text">
                                {client === "spotify" && spotifyUserData["userDetails"]["country"]}
                            </div>
                        </div>
                        <div  className="extra-details-item">
                            <div className="user-icons">
                            <EmailLogo/>
                            </div>
                            <div>
                            {client === "spotify" && spotifyUserData["userDetails"]["email"]}
                            </div>
                            </div>
                    </div>
                </div>
            </div>
        : <Loader/>
        }
    </>
  )
}

export default UserComponent