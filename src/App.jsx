import { useEffect } from "react"
import authFlow, { getToken } from "../scripts/auth"
import "./App.css"
import { useState } from "react"
import { useSearchParams } from "react-router-dom"



function App() {


  const [searchParams] = useSearchParams();
  const [authCode , setAuthCode] = useState(searchParams.get("code"))

  useEffect(()=> {
    setAuthCode(searchParams.get("code"));
    console.log("inside useffect")

    const token = async() => {
        await getToken()
    }

    if(authCode) {
      token()
      console.log("inside token")
    }

  },[authCode,searchParams])

  return (
    <div>
     <button onClick={authFlow}> <h1>Login with spotify</h1></button>
    </div>
  )
}

export default App
