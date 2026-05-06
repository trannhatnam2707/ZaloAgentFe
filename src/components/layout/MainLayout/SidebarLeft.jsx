import { UsergroupAddOutlined, LogoutOutlined } from '@ant-design/icons';
import { Avatar, Button, Input, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import { getMe, logout } from '../../../api/auth'; 
import ChatList from '../ChatList';
import FriendsRequestList from '../FriendsRequestList';
import FriendsList from '../FriendsList';

const SidebarLeft = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState("1")

  const handleSelectFriend = (friend) => {
    console.log("Mở chat với user:" , friend.username)

    setActiveTab("1")

    // 2. (Nâng cao) Bạn có thể gọi một hàm Global Context hoặc Redux 
    // để báo cho khung chat bên phải hiển thị tin nhắn của 'friend' này.
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getMe();
        // axiosClient của bạn trả về data trực tiếp, không cần .data trừ khi bạn bọc thêm
        setCurrentUser(res); 
      } catch (err) {
        console.error("Không lấy được thông tin user", err);
      }
    };
    fetchUser();
  }, []);

  const items = [
    {
      key: "1",
      label: "Tin nhắn",
      children: <div style={{ padding: '10px' }}><ChatList/></div>
    }, 
    {
      key:"2",
      label: "Bạn bè",
      children: <div style={{ padding: '10px' }}><FriendsList onSelectFriend={handleSelectFriend}/></div>
    },
    {
      key: "3",
      label: "Thông báo",
      children: <div style={{ padding: '10px' }}><FriendsRequestList/></div>
    },
  

  ];

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100%', 
      backgroundColor: '#FFF',
      borderRight: '1px solid #f0f0f0' 
    }}>
      
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        flexDirection:"column",
        padding: '12px 12px 10px 12px', 
        gap: 10,
        backgroundColor: '#4c8ae5'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width:"100%" }}>
          <h2 style={{ margin:0, fontSize: '20px', fontWeight: "600" ,color: "#FFF"}}>ChatAgents</h2>
        </div>
        
        <div style={{display:"flex", alignItems:"center", gap: 10, width:"100%" }}>
          <Input.Search
            placeholder='Tìm kiếm người dùng ... '
            onSearch={(value) => console.log("Search:", value)}
            style={{borderRadius:"999px", flex:1}}
            />
            <Button  shape='circle' icon={<UsergroupAddOutlined />} style={{backgroundColor:"#fff", border:"none"}} title="Tạo nhóm" />
        </div>
      </div>
      
      <div style={{ flex: 1, overflowY: "auto", width:"100%", maxWidth:"100%" }}>
        <Tabs activeKey={activeTab} onChange={(key) => setActiveTab(key)} items={items} centered  style={{width:"100%"}}/>
      </div>

      <div style={{ 
        marginTop: 'auto', 
        padding: '16px', 
        borderTop: '1px solid #f0f0f0', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        backgroundColor:"#4c8ae5"
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Avatar src={currentUser?.avatar} >
            {currentUser?.username?.charAt(0).toUpperCase()}
          </Avatar>
          <span style={{ fontWeight: '500', color:"#fff"}}>
            {currentUser?.username || "Loading..."}
          </span>
        </div>
        <Button 
          style={{color:"#fff", display:"flex", alignItems:"center", gap:"8px"}}
          type="text" 
          danger 
          icon={<LogoutOutlined style={{color:"#fff"}} />} 
          onClick={() => logout()} 
          onMouseEnter={(e)=>{
            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)'
          }}
           onMouseLeave={(e)=>{
            e.currentTarget.style.backgroundColor = 'transparent'
          }}
        >
          Đăng xuất
        </Button>
      </div>
    </div>
  );
};

export default SidebarLeft;