import { Link, useNavigate } from "react-router-dom"
import { initializeApp } from "firebase/app"
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import firebaseConfig from '../firebase-config'
import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

function Menu() {
    const app = initializeApp(firebaseConfig)
    const auth = getAuth(app)
    const navigate = useNavigate()

    const [user] = useAuthState(auth)

    const logout = () => {
        signOut(auth)
        .then(() => {
            navigate('/login')
        })
    }

    return (
        <>
            <Link to={'/'}>Home</Link> |
            {
                (user) ?
                    <> 
                        <span onClick={logout}>Logout</span>
                    </> : 
                    <>
                        <Link to={'/login'}>Login</Link> |
                        <Link to={'/register'}>Register</Link>
                    </>
            }
        </>
    )
}

export default Menu