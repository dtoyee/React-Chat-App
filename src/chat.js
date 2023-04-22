import MessageBox from './components/message-box'
import Menu from './components/menu'
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import firebaseConfig from './firebase-config'
import { useEffect, useState } from 'react';

function Chat() {
    const app = initializeApp(firebaseConfig)
    const auth = getAuth(app)

    const [userDetails, setUserDetails] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if(user) {
                setUserDetails(userDetails => [...userDetails, user])
            }
        })
        setLoading(false)
    }, [])

    if(loading) return <h2>Loading...</h2>

    return (
        <>
            <Menu />
            <MessageBox />
        </>
    )
}

export default Chat