import React from 'react'
import { useChat } from '../../context/ChatContext'
import { Avatar, Button } from 'antd'
import { InfoCircleFilled } from '@ant-design/icons'

const ChatHeader = ({ info }) => {
    const { headerInfo, showRightSidebar, setShowRightSidebar } = useChat()
    const displayInfo = info || headerInfo
 
    if(!displayInfo){
        return null
    }
    
    return (
        <div style={{
            padding: '10px 20px',
            width: '100%',
            borderBottom: '1px solid #f0f0f0',
            boxSizing: 'border-box',
            display:"flex",
            alignItems:'center',
            justifyContent:'space-between',
            backgroundColor:'#4c8ae5'
        }}>
            <div style={{display:"flex", alignItems:"center", gap:'12px'}}>
                <Avatar src={displayInfo.avatar || undefined} size={40} style={{border:"1px solid #f0f0f0"}}>
                    {(displayInfo.title || displayInfo.name)?.charAt(0).toUpperCase()
                    }
                </Avatar>
                <div>
                    <div style={{ fontWeight:'600', fontSize: "16px", lineHeight:'1.2'}}>
                        {displayInfo.title || displayInfo.name}
                    </div>
                    <div style={{ fontSize: '12px', color: '#52c41a' }}>
                        {displayInfo.type === 'group' ? 'Nhóm chat' : 'Đang hoạt động'}
                    </div>
                </div>
                <div style={{display:"flex", gap:'5px'}} >
                    <Button 
                        type='text'
                        shape='circle'
                        icon = {<InfoCircleFilled style={{
                            fontSize: '18px',
                            color: showRightSidebar ? '#1677ff' : "8c8c8c"
                        }}/>}
                            onClick={() => {setShowRightSidebar(!showRightSidebar)}}
                    />
                        
                </div>
            </div>
        </div>
    )
}

export default ChatHeader