import React, { useContext, useEffect, useState } from "react";

import { ChatEngineWrapper, Socket, ChatFeed } from 'react-chat-engine'
import { ChatContext } from "../../../App";

const ChatEngine = props => {
    const [chatId, setChatId] = useContext(ChatContext);

console.log(chatId);
    const [showChat, setShowChat] = useState(false)
    const project1 = "667763ba-9530-4445-8c2e-d5baa1392a3f"
    const project2 = "403b3ad3-e2b1-493e-ab0c-574723e2eae1"
    useEffect(() => {
        if (props.visible) {
            setTimeout(() => {
                setShowChat(true)
            }, 500)
        }
    })

    return (
        <div
            className='transition-5'
            style={{
                ...styles.chatEngineWindow,
                ...{ 
                    height: props.visible ? '100%' : '0px',
                    zIndex: props.visible ? '100' : '0',
                }
            }}
        >
            {
                showChat &&
                <ChatEngineWrapper>
                    <Socket 
                        projectID={chatId?.projectId}
                        userName={props.user.email}
                        userSecret={props.user.email}
                    />
                    <ChatFeed activeChat={props.chat.id} />
                </ChatEngineWrapper>
            }
        </div>
    )
}

export default ChatEngine;

const styles = {
    chatEngineWindow: {
        width: '100%',  
        backgroundColor: '#fff',
    }
}
