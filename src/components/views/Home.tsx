import React, {useState} from 'react';
import { Breadcrumb, Layout,theme } from 'antd';
import { Outlet} from 'react-router-dom';
//引入抽取出去的Menu组件
import MainMenu from '../MainMenu'

const { Header, Content, Footer, Sider } = Layout;

/* 
  1、MenuItem仅仅表示的是一个类型
  2、Required<MenuProps>将所有属性变为必需属性，即去除可选标记 ?
  3、['items'] 选择MenuProps中的属性items，获取其类型，根据源码看到类型是ItemType[]
  4、[number] 表示可以是任意有效的数组索引------------意义不太懂，后面再研究-------------
     去掉[number]后程序似乎可以正常使用，再观察
*/
/* type MenuItem = Required<MenuProps>['items'][number];

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
  getItem('User', 'page3', <UserOutlined />, [
    getItem('Tom', '3', <UserOutlined />),
    getItem('Bill', '4', <UserOutlined />),
    getItem('Alex', '5', <UserOutlined />),
  ]),
  getItem('Team', 'page4', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  getItem('Files', '9', <FileOutlined />),
]; */

const View: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  //const navigateTo = useNavigate()

  
  /* 通过以下代码可以看出，key就是items的key属性 
    const menuClick = (e:{key:string}) => {
      console.log('@',e);
    }
    把上方的key直接改为路径，即实现了：点击导航获取到对应路径 
  */
  /* const menuClick = (e:{key:string}) => {
    //使用编程式导航跳转路径
    navigateTo(e.key)
  } */
  
  /* 
    ----子菜单展开/回收时执行以下代码----
    1、通过官方文档查询到此事件负责处理菜单的展开/折叠onOpenChange={handleOpenChange}
    2、可以看出，每次菜单展开/折叠时，都会调用该函数
    3、openKeys:string[]  通过log可以看出，keys数组会保存当前展开的菜单的key  如：['sub2', 'sub1']
  */
  /* const [openKeys,setOpenKeys] = useState([''])
  const handleOpenChange = (openKeys:string[]) => {
    console.log('@@',openKeys,openKeys.length);
    //利用setOpenKeys，将openKeys数组设置为当前选择的子菜单
    setOpenKeys([openKeys[openKeys.length-1]])
  } */


  return (   
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical"></div>
        {/* <Menu 
          theme="dark" 
          defaultSelectedKeys={['/page1']} 
          mode="inline" 
          items={items} 
          onClick={menuClick}
          //子菜单展开/回收的事件
          onOpenChange={handleOpenChange}
          //当前展开的SubMenu菜单项key数组，此数组决定哪个菜单展开。实现同时只有一个菜单可以展开的功能
          openKeys={openKeys}
        /> */}
        <MainMenu/>
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