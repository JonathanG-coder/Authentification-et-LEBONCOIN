// import { useState } from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import './App.css'
import Login from './pages/Login'
import Register from './pages/Register'
import Navbar from './components/Navbar'
import Home from './pages/Home'


import ThemeContext from './context/ThemeContext';

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/home' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </ThemeContext.Provider>
  );
}

export default App;
