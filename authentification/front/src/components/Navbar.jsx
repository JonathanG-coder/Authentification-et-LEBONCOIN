import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };


  return (
    <>
    <nav>
        <Link to="/"> Inscription</Link>
        <Link to="/login"> Connexion</Link>
    </nav>
    <button onClick={handleLogout}>Se deconnecter</button>
    </>
  )
}

export default Navbar