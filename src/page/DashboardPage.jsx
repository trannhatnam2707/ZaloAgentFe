import { Layout } from 'antd';
import SidebarLeft from "../components/layout/MainLayout/SidebarLeft";

const { Sider, Content } = Layout;

const DashboardPage = () => {
  return (
    <Layout style={{ height: '100vh' }}>
    
      <Sider 
        width={320} 
        style={{ background: '#fff', borderRight: '1px solid #f0f0f0' }}
      >
        <SidebarLeft />
      </Sider>

      <Layout>
        <Content style={{ background: '#f5f5f5' }}>
          <div style={{ 
            height: '100%', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            color: '#999'
          }}>
            Chọn một cuộc trò chuyện để bắt đầu
          </div>
        </Content>
      </Layout>

    </Layout>
  );
};

export default DashboardPage;