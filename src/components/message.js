import { useEffect, useRef } from "react"

function Message({ message }) {
    const ref = useRef()
    const username = useRef()
    useEffect(() => {
        if(ref.current.className === "message-right") {
            username.current.innerHTML = message.from_user + ":"
        } else {
            username.current.innerHTML = message.to_user + ":"
        }
    })
    return(
        <>
            <div className="message-holder">
                <div className={(message.from_user === 'Admin') ? 'message-right' : 'message-left'} key={message.id} ref={ref}>
                    <div className="user">
                        <img src="https://placehold.co/20x20" className="user-image"></img>
                        <span ref={username}></span>
                    </div>
                        {message.message}
                </div>
            </div>
        </>
    )
}

export default Message