import { BrowserRouter, Route, Routes } from "react-router-dom";

import LoginPage from "./views/LoginPage";
import ActionPage from "./views/ActionPage";
import HomePage from "./views/HomePage";
import DetailsPage from "./views/DetailsPage";
import ContactPage from "./views/ContactPage";

import AdminSignup from "./views/AdminSignup";
import AdminHomePage from "./views/AdminHomePage";
import AdminDetailsPage from "./views/AdminDetailsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path = "/login" element={<LoginPage/>}/>
          
          <Route path = "/" element={<HomePage/>}/>
          <Route path = "/detailspage/:collectionId" element={<DetailsPage/>}/>
          <Route path = "/action" element={<ActionPage/>}/>

          <Route path = "/admindetailspage/:collectionId" element={<AdminDetailsPage/>}/>
          <Route path = "/adminsignup" element={<AdminSignup/>}/>
          <Route path = "/adminhomepage" element={<AdminHomePage/>}/>

          <Route path = "/contactadmin" element={<ContactPage/>}/>

      </Routes>
    </BrowserRouter>
  );
    }

export default App;
