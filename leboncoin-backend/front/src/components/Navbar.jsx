import React from 'react'
import LogoutBtn from './LogoutBtn'
import { useAuth } from '../hook/UseAuth'
import { Link } from 'react-router-dom'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


const Navbar = () => {
    const {user} =useAuth()
  return (
    <nav>
        {user && (
            <>
                <Link to="/createCategory">Créer une catégorie</Link>{" | "}
                <Link to="/dashboard">Dashboard</Link>{" | "}
                <p style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
                Bonjour {user?.email}
                {user?.avatar && (
                <img src={`${BACKEND_URL}/uploads/${user?.avatar}`} alt="avatar" style={{ width: '30px', height: '30px', borderRadius: '50%', objectFit: 'cover' }} /> )} </p>
                <LogoutBtn/>
            </>
        )}
        {!user && (
            <>
                <Link to="/register">Register</Link>{" | "}
                <Link to="/login">Login</Link>
            </>
        )}
    </nav>
  )
}

export default Navbar