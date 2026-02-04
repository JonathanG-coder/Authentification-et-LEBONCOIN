import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchemaLogin } from '../validations/login.schema'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../services/auth.service'

const Login = () => {

    const navigate= useNavigate()
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState('');
    const {register, handleSubmit, formState:{errors, isSubmitted}}= useForm({resolver: zodResolver(registerSchemaLogin)})

    const onSubmit = async (data) => {
        if (loading) return; // Empêche double-click d'nvoie formulaire
    setLoading(true);
        setServerError('');

        try {
            await loginUser(data)
            alert('User connecté')
            navigate('/home')
            
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        {serverError && <p style={{color: "red"}}>{serverError}</p>}

        <input type="text" { ...register('email')} placeholder='Veuiller entre votre email' />
        {errors.email && <p>{errors.email.message}</p>}

        <input type="password" { ...register('password')} placeholder='Mot de passe' />
        {errors.password && <p>{errors.password.message}</p>}

        <input type='submit'
        value={loading ? "Connexion" : "Se connecter"}
        disabled={loading}     
    />

    </form>
    
  )
}

export default Login