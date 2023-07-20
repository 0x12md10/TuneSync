
import { Route,Routes } from "react-router-dom";
import "./App.css"
import Navbar from "./components/navbar";
import HomeLayout from "./Layouts/HomeLayout";
import MigrateLayout from "./Layouts/MigrateLayout";


function App() {


  return (

    <Routes>
      <Route path="/" element={<Navbar/>} >
        <Route index element={<HomeLayout/>} />
        <Route path="/migrate/*" element={<MigrateLayout/>} ></Route>
      </Route>
    </Routes>

  )
}

export default App
