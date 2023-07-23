
import { Route,Routes , RouterProvider , createRoutesFromElements, createBrowserRouter } from "react-router-dom";
import "./App.css"
import Navbar from "./components/navbar";
import HomeLayout from "./Layouts/HomeLayout";
import MigrateLayout from "./Layouts/MigrateLayout";
import PlaylistView from "./Layouts/PlaylistView";
import ProtectedRoute , {loader as protectedRouteLoader} from "./components/ProtectedRoute";
import { useContext } from "react";
import { UserContext } from "./contexts/UserContext";





const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Navbar/>} >
    <Route index element={<HomeLayout/>} />
    <Route path="/migrate/*" element={<MigrateLayout/>} ></Route>
    <Route path="/playlist/:client" loader={protectedRouteLoader} element={<ProtectedRoute><PlaylistView/></ProtectedRoute>}/>
  </Route>
))


function App() {

  return (
    <RouterProvider router={router}/>

  )
}

export default App
