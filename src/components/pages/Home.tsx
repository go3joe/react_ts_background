import React, { useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';


const { Header, Content, Footer, Sider } = Layout;

/* 
  1、MenuItem仅仅表示的是一个类型
  2、Required<MenuProps>将所有属性变为必需属性，即去除可选标记 ?
  3、['items'] 选择MenuProps中的属性items，获取其类型，根据源码看到类型是ItemType[]
  4、[number] 索引访问操作符XXXXXXXXX意义还不不太懂，后面再研究XXXXXXXXX
*/
type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Option 1', '/page1', <PieChartOutlined />),
  getItem('Option 2', '/page2', <DesktopOutlined />),
  getItem('User', 'sub1', <UserOutlined />, [
    getItem('Tom', '3', <UserOutlined />),
    getItem('Bill', '4', <UserOutlined />),
    getItem('Alex', '5', <UserOutlined />),
  ]),
  getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  getItem('Files', '9', <FileOutlined />),
];

const View: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigateTo = useNavigate()

  
  /* 通过以下代码可以看出，key就是items的key属性 
    const menuClick = (e:{key:string}) => {
      console.log('@',e);
    }
    把上方的key直接改为路径，即实现了：点击导航获取到对应路径 
  */
  const menuClick = (e:{key:string}) => {
    //使用编程式导航跳转路径
    navigateTo(e.key)
  }  


  return (   
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical"></div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} onClick={menuClick}/>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Breadcrumb style={{ margin: '16px 16px' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
        </Header>
        <Content style={{ margin: '16px 16px 0'}}>
          {/* height: '100%'修改了文本框为全屏 */}
          <div style={{ padding: 24, height: '100%', background: colorBgContainer }}>
            <Outlet/>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' ,padding:0,lineHeight:'48px' }}>后台管理系统 ©2023 AD</Footer>
      </Layout>
    </Layout>
  );
};

export default View;