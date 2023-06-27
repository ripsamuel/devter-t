import "./App.css";
// import { onAuthStateChanged } from 'firebase/auth';
import { useRoutes, BrowserRouter } from "react-router-dom";

import Error_Page from "./pages/Error_Page";
import Home from "./pages/Home";
import Tuit from "./components/Tuit";


const AppRoutes = () => {
  let routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/tuit", element: <Tuit /> },
    { path: "*", element: <Error_Page /> }
  ]);

  return routes;
};

const App = () => {
  return(
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
    )
}

export default App;
