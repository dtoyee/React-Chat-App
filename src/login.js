import { useEffect, useState } from "react"
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import firebaseConfig from './firebase-config'
import Menu from './components/menu'
import { useNavigate } from 'react-router-dom'
import { useAuthState } from "react-firebase-hooks/auth";

function Login() {
    const navigate = useNavigate()
    const app = initializeApp(firebaseConfig)
    const auth = getAuth(app)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [user] = useAuthState(auth)

    const login = (e) => {
        e.preventDefault()
        signInWithEmailAndPassword(auth, email.target.value, password.target.value)
            .then(() => {
                navigate('/')
            })
            .catch((error) => {
                console.log(error.message)
            })
    }

    useEffect(() => {
        if(user) {
            navigate('/')
        }
    }, [])

    return(
        <>
            <Menu />
            <h2>Login</h2>
            <div>
                <input type="email" placeholder="Email..." onChange={setEmail}></input>
                <input type="password" placeholder="Password..." onChange={setPassword}></input>
                <button onClick={login}>Login</button>
            </div>
        </>
    )
}

export default Login