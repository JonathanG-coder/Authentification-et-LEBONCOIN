import { useState, useContext } from 'react'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import { registerSchema } from '../validations/register.schema'
import { registerUser } from '../services/auth.service'
// import { api } from '../api/axios'
import { useNavigate } from 'react-router-dom'


import ThemeContext from "../context/ThemeContext"

const Register = () => {

    const theme = useContext(ThemeContext)


    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState('');
    const {register, handleSubmit, formState:{errors, isSubbmitted}}= useForm({resolver: zodResolver(registerSchema)})

    const onSubmit = async (data) => {
        if (loading) return; // Empêche double-click d'nvoie formulaire
    setLoading(true);
        setServerError(''); // On commence par envoyé des defaut censé etre nul pour commencer

        try {
            await registerUser(data)
            alert('User créé')
            navigate('/login')
            
        } catch (error) {
            console.log(error);  
        }
        finally {
            setLoading(false)
        }
    }

  return (


    <form onSubmit={handleSubmit(onSubmit)}>
        {/* <p>theme : {theme} </p> */}
        {serverError && <p style={{color: "red"}}>{serverError}</p>}

        <input type="text" { ...register('email')} placeholder='Veuiller entre votre email' />
        {errors.email && <p>{errors.email.message}</p>}

        <input type="password" { ...register('password')} placeholder='Mot de passe' />
        {errors.password && <p>{errors.password.message}</p>}

        <input type="password" { ...register('confirmPassword')} placeholder='Confirmer Mot de passe' />
        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}

        <input
        type="submit"
        value={loading ? "Envoi..." : "Envoyer"}
        disabled={loading} // Désactive le bouton pendant l'envoi
      />
    </form>
  )
}

export default Register