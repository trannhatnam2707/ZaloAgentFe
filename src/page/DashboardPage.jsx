import { Layout } from 'antd';
import SidebarLeft from "../components/layout/MainLayout/SidebarLeft";
import SidebarRight from '../components/layout/MainLayout/SidebarRight';
import CenterLayout from '../components/layout/MainLayout/CenterLayout';

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
         <Content style={{ background: '#fff', borderRight: '1px solid #f0f0f0' }}>
          <div style={{ 
            height: '100%', 
            display: 'flex'
          }}>
            <CenterLayout/>
          </div>
        </Content> 
      </Layout>

      <Sider 
        width={320} 
        style={{ background: '#fff', borderLeft: '1px solid #f0f0f0' }}
      >
        <SidebarRight />
      </Sider>

    </Layout>
  );
};

export default DashboardPage;