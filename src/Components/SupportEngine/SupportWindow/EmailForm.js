import React, { useContext, useState } from "react"

import { styles } from "../styles"

import axios from 'axios'

import { LoadingOutlined } from '@ant-design/icons'

import Avatar from '../Avatar'
import { ChatContext } from "../../../App"

const EmailForm = props => {    
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [chatId, setChatId] = useContext(ChatContext);
    const project1 = "667763ba-9530-4445-8c2e-d5baa1392a3f"
    const project2 = "403b3ad3-e2b1-493e-ab0c-574723e2eae1"
    const privetKey1 = "23ee575c-8b8f-4a3d-9549-119c6993fcd3"
    const privetKey2 = "42767e1c-a6ed-413e-b63c-f6671c3ec0d5"
    //     privetId
// projectId
console.log(chatId);
    function getOrCreateUser(callback) {
        axios.put(
            'https://api.chatengine.io/users/',
            {username: email, email: email, secret: email},
            {headers: {"Private-Key": chatId?.privetId}}
        )
        .then(r => callback(r.data))
        .catch(e => console.log('Get or create user error', e))
    }

    function getOrCreateChat(callback) {
        axios.put(
            'https://api.chatengine.io/chats/',
            {usernames: [email, 'Riyad hasan'], is_direct_chat: true},
            {headers: {
                "Project-ID": chatId?.projectId,
                "User-Name": email,
                "User-Secret": email,
            }}
        )
        .then(r => callback(r.data))
        .catch(e => console.log('Get or create chat error', e))
    }

    function handleSubmit(event) {
        event.preventDefault();
        setLoading(true)

        console.log('Sending Email', email)

        getOrCreateUser(
            user => {
                props.setUser && props.setUser(user)
                getOrCreateChat(chat => {
                    setLoading(false)
                    props.setChat && props.setChat(chat)
                })
            }
        )
    }

    return (
        <div 
            style={{
                ...styles.emailFormWindow,
                ...{ 
                    height: props.visible ? '100%' : '0px',
                    opacity: props.visible ? '1' : '0'
                }
            }}
        >
            <div style={{ height: '0px' }}>
                <div style={styles.stripe} />
            </div>

            <div 
                className='transition-5'
                style={{
                    ...styles.loadingDiv,
                    ...{ 
                        zIndex: loading ? '10' : '-1',
                        opacity: loading ? '0.33' : '0',
                    }
                }}
            />
            <LoadingOutlined
                className='transition-5'
                style={{
                    ...styles.loadingIcon,
                    ...{ 
                        zIndex: loading ? '10' : '-1',
                        opacity: loading ? '1' : '0',
                        fontSize: '82px',
                        top: 'calc(50% - 41px)', 
                        left: 'calc(50% - 41px)',  
                    }
                }}
            />

            <div style={{ position: 'absolute', height: '100%', width: '100%', textAlign: 'center' }}>
                <Avatar 
                    style={{ 
                        position: 'relative',
                        left: 'calc(50% - 44px)',
                        top: '10%',
                    }}
                />

                <div style={styles.topText}>
                    Welcome to my <br /> support 👋
                </div>

                <form 
                    onSubmit={e => handleSubmit(e)}
                    style={{ position: 'relative', width: '100%', top: '19.75%' }}
                >
                    <input 
                        placeholder='Your Email'
                        onChange={e => setEmail(e.target.value)}
                        style={styles.emailInput}
                    />
                </form>
                
                <div style={styles.bottomText}>
                    Enter your email <br /> to get started.
                </div>
            </div>
        </div>
    )
}

export default EmailForm;