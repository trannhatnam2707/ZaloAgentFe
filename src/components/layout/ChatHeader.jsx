import React from 'react'
import { useChat } from '../../context/ChatContext'
import { Avatar, Button } from 'antd'
import { InfoCircleFilled } from '@ant-design/icons'

const ChatHeader = () => {
    const { headerInfo, showRightSidebar, setShowRightSidebar } = useChat()
 
    if(!headerInfo){
        return null
    }
    
    return (
        <div style={{
            padding: '10px 20px',
            borderRadius: '1px solid #f0f0f0',
            display:"flex",
            alignItems:'center',
            justifyContent:'space-between',
            backgroundColor:'#4c8ae5'
        }}>
            <div style={{display:"flex", alignItems:"center", gap:'12px'}}>
                <Avatar src={headerInfo.avatar} size={40} style={{border:"1px solid #f0f0f0"}}>
                    {headerInfo.title?.charAt(0).toUpperCase()}
                </Avatar>
                <div>
                    <div style={{ fontWeight:'600', fontSize: "16px", lineHeight:'1.2'}}>
                        {headerInfo.title}
                    </div>
                    <div style={{ fontSize: '12px', color: '#52c41a' }}>
                        {headerInfo.type === 'group' ? 'Nhóm chat' : 'Đang hoạt động'}
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