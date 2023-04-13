import '../style/style.css'
import { initializeApp } from "firebase/app";
import { addDoc, collection, getDocs, getFirestore, limit, orderBy, query, onSnapshot} from 'firebase/firestore'
import firebaseConfig from '../firebase-config'
import { useEffect, useRef, useState } from 'react';
import Message from './message'

function MessageBox() {
    const config = firebaseConfig
    const app = initializeApp(config)
    const db = getFirestore(app)
    const message = useRef()

    const chatMessages = collection(db, 'messages')

    const [chatMessage, setChatMessage] = useState("")
    const [latestID, setLatestID] = useState("")
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(true)

    const getLatestID = async () => {
        const idQuery = query(chatMessages, orderBy('date_sent', 'desc'), limit(1))
        const latest = await getDocs(idQuery)
        latest.forEach(id =>  {
            setLatestID(id.data().id)
        })
    }

    const updateMessage = () => {
        setChatMessage(message.current.value)
    }

    const sendMessage = (e) => {
        e.preventDefault()
        // Only do something if the message box isn't empty
        if(!message == "") {
            // Will change to use user ID's once up and running
            addDoc(chatMessages, {
                id: Number(latestID+1),
                from_user: "Admin",
                to_user: "Mod",
                message: chatMessage,
                date_sent: Date()
            })
            message.current.value = ""
        }
    }

    useEffect(() => {
        getLatestID()
        setLoading(false)
        const chatQuery = query(chatMessages, orderBy('id','asc'))
        const unsubscribe = onSnapshot(chatQuery, (querySnapshot) => {
            querySnapshot.forEach((message) => {
                setMessages(messages => [...messages, message.data()])
            })
        })
        return () => unsubscribe
    }, [])

    if(loading) return <h2>Loading...</h2>

    return(
        <main className='holder'>
            <div className='message-box'>
                {
                    messages.map(message => {
                        return (
                            <>
                                <Message key={message.id} message={message} />
                            </>
                        )
                    })
                }
            </div>
            <div className='message-button-holder'>
                <textarea className='message-type-box' onChange={updateMessage} ref={message}></textarea>
                <button className='message-button' onClick={sendMessage}>Send</button>
            </div>
        </main>
    )
}

export default MessageBox