import React, { useContext } from 'react';
import { ChatEngine } from 'react-chat-engine'
import { UserContext } from '../App';
const SupportAdmin = () => {
    const project1 = "667763ba-9530-4445-8c2e-d5baa1392a3f"
    const project2 = "403b3ad3-e2b1-493e-ab0c-574723e2eae1"
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)

    return (
        <>
            {
                loggedInUser?.projectId ?
                    <ChatEngine
                        projectID={loggedInUser?.projectId}
                        userName='tasnim'
                        userSecret='tasnim'
                        height='calc(100vh - 12px)'
                    />
                    : null}
        </>
    );
};

export default SupportAdmin;