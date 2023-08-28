import { useState } from 'react'
import './App.css'
import { Routes, Route } from "react-router-dom";
import Layout from './components/Layout/Layout';
import Transport from './components/Home/Transport';
function App() {


  return (
    
   <Routes>
        <Route path="/" element={<Layout />}>
          <Route   path="/" element={<Transport />} />
          <Route path="/home" element={<Transport />} />
         
        </Route>
         {/* <Route path="/login" element={<LoginPage/>} /> */}
      </Routes>
     
  )
}

export default App
