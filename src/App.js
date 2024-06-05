import { BrowserRouter, Route, Routes } from "react-router-dom";

import LoginPage from "./views/LoginPage";
import ActionPage from "./views/ActionPage";
import HomePage from "./views/HomePage";
import DetailsPage from "./views/DetailsPage";
import AdminDetailsPage from "./views/AdminDetailsPage";
import ContactPage from "./views/ContactPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path = "/login" element={<LoginPage/>}/>
          <Route path = "/" element={<HomePage/>}/>
          <Route path = "/collection/:id" element={<DetailsPage/>}/>
          <Route path = "/action" element={<ActionPage/>}/>
          <Route path = "/admincollection/:id" element={<AdminDetailsPage/>}/>
          <Route path = "/contactadmin" element={<ContactPage/>}/>
      </Routes>
    </BrowserRouter>
  );
    }

export default App;
