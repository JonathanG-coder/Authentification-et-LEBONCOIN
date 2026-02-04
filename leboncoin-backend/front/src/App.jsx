import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import  AuthProvider  from './context/AuthProvider'
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import PrivateRoute from './routes/PrivateRoutes'
import PublicRoute from './routes/PublicRoute'
import CreateCategory  from './pages/CreateCategory'
import Navbar from './components/Navbar'
import { Navigate } from "react-router-dom";

export default function App() {

  return (
    <AuthProvider>
    <BrowserRouter>
    <Navbar/>
      <Routes>
        
        {/* Routes protégées */}
        <Route element={<PrivateRoute/>}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/createCategory" element={<CreateCategory />} />
        </Route>
        
        {/* Routes publich */}
        <Route element={<PublicRoute/>}>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        </Route>
        
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  )
}
