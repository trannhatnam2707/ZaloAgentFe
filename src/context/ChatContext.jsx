import React, { createContext, useContext, useState } from 'react'

const ChatContext = createContext()

export const ChatProvider = ({ children }) => {

    const [selectedChat, setSelectedChat] = useState(null)
    const [headerInfo, setHeaderInfo] = useState(null)
    const [showRightSidebar, setShowRightSidebar] = useState(false)

    console.log("getSelecChat:",selectedChat)
    console.log("getHeaderInfo:",headerInfo)


    return (
        <ChatContext.Provider value={{ 
            selectedChat, setSelectedChat, 
            headerInfo, setHeaderInfo,
            showRightSidebar, setShowRightSidebar
            }}>
                {children}
        </ChatContext.Provider>
    )
}

export const useChat = () => useContext(ChatContext)
