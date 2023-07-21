
import { Route,Routes } from "react-router-dom";
import "./App.css"
import Navbar from "./components/navbar";
import HomeLayout from "./Layouts/HomeLayout";
import MigrateLayout from "./Layouts/MigrateLayout";
import PlaylistView from "./Layouts/PlaylistView";



function App() {


  return (

    <Routes>
      <Route path="/" element={<Navbar/>} >
        <Route index element={<HomeLayout/>} />
        <Route path="/migrate/*" element={<MigrateLayout/>} ></Route>
        <Route path="/playlist/:client" element={<PlaylistView/>}/>


      </Route>

    </Routes>

  )
}

export default App
