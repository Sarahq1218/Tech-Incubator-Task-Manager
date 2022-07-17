import React from "react"
import Signup from "./Login/Signup"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import CompSignUp from './Login/CompSignUp'
import CompLogin from './Login/CompLogin'
import Login from "./Login/Login"
import StartUpPage from "./StartUpPage/StartUpPage";
import CompDash from "./CompanyDash/CompDash";
import DevDash from "./DevDash/DevDash";





function App() {
  return (
    <BrowserRouter>



      <Routes>
        <Route exact path="/" element={<StartUpPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/CompLogin" element={<CompLogin />} />
        <Route path="/CompSignUp" element={<CompSignUp />} />
        <Route path="/login" element={<Login />} />

        <Route path="/CompDash" element={<CompDash />} />
        <Route path="/DevDash" element={<DevDash />} />
      </Routes>
    </BrowserRouter >


  );
}

export default App;
