import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate , useParams } from "react-router-dom"
import "./progress.css"

const ProgressBar = () => {

    const navigate = useNavigate();
    const {client} = useParams()
    const {spMigrate} = useSelector(state => state.spotify);
    const {ytMigrate} = useSelector(state => state.youtube);
    const [progress , setProgress] = useState(0)
	

	const Childdiv = {
		height: '100%',
		width: `${progress}%`,
		backgroundColor: "#840C96",
	borderRadius:40,
		textAlign: 'right'
	}
	


    useEffect(()=> {
        if(client === "spotify") {
           setProgress(spMigrate.percentage);
            if(!spMigrate.isMigrating) {
                navigate(-1)
            } 
        } else if(client === "youtube"){
            setProgress(ytMigrate.percentage);
            if(!ytMigrate.isMigrating) {
                navigate(-1)
            }
        }
    },[spMigrate,ytMigrate])
		
	return (
        <div className="progress-container">
            <h3 className="progress-header">Please sit back and relax while we do the heavy lifting for you...</h3>
            <div className="parentdiv">
            <div style={Childdiv}>
                <span className="progresstext">{`${progress}%`}</span>
            </div>
            </div>
        </div>
	)
}

export default ProgressBar;
