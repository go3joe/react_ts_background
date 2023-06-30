import { DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import { Menu, MenuProps } from "antd";
import { useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";

type MenuItem = Required<MenuProps>['items'][number];

/* function getItem(
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
  getItem('User', '/page3', <UserOutlined />, [
    getItem('Tom', '/page3/page301', <UserOutlined />),
    getItem('Bill', '/page3/page302', <UserOutlined />),
    getItem('Alex', '/page3/page303', <UserOutlined />),
  ]),
  getItem('Team', '/page4', <TeamOutlined />, [
    getItem('Team 1', '/page4/page401',<TeamOutlined />), 
    getItem('Team 2', '/page4/page402',<TeamOutlined />)]),
  getItem('Files', '9', <FileOutlined />),
]; */


    /* 上方代码的合并形式： */
        const items: MenuItem[] = [
            {
                label: 'Option 1',
                key: '/page1',
                icon: <PieChartOutlined />,
            },
            {
                label: 'Option 2',
                key: '/page2',
                icon: <DesktopOutlined />,
            },
            {
                label: 'User',
                key: '/page3',
                icon: <UserOutlined />,
                children:[
                    {label: 'Tom',key: '/page3/page301',icon: <UserOutlined />,},
                    {label: 'Bill',key: '/page3/page302',icon: <UserOutlined />,},
                    {label: 'Alex',key: '/page3/page303',icon: <UserOutlined />,},
                ]
            },
            {
                label: 'Team',
                key: '/page4',
                icon: <TeamOutlined />,
                children:[
                    {label: 'Team 1',key: '/page4/page401',icon: <TeamOutlined />,},
                    {label: 'Team 2',key: '/page4/page402',icon: <TeamOutlined />,},
                ]
            },
            {
                label: 'Files',
                key: '9',
                icon: <FileOutlined />,
            },
        ];


const Comp: React.FC = () => {
    /* const {
        token: { colorBgContainer },
      } =  theme.useToken();*/
    
      const navigateTo = useNavigate()
      //使用useLocation取到当前路径，用于设置选中元素的高亮
      const {pathname} = useLocation();
      
      
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
      
      /* 
        ----子菜单展开/回收时执行以下代码----
        1、通过官方文档查询到此事件负责处理菜单的展开/折叠onOpenChange={handleOpenChange}
        2、可以看出，每次菜单展开/折叠时，都会调用该函数
        3、openKeys:string[]  通过log可以看出，keys数组会保存当前展开的菜单的key  如：['sub2', 'sub1']

        4、还需要实现：在刷新时，不自动折叠展开的菜单。如果初始值为空useState([''])，每次刷新页面都会折叠已展开的菜单
           解决思路：
            (1)通过useLocation，将当前的路径，判断是page3还是page4
            (2)pathname与items的每一个children的key做对比，相等则使用上一级的key
            (3)使用这个key作为初始值

      */

      let lastOpenKey:string = ''
      //利用find进行匹配。find的参数是一个回调，回调的返回值就是查找条件。
      //如果匹配到就返回匹配的对象，在判断语句中，就是true。找不到就是false
      //解决ts报错 如果findkey(obj)，则 Parameter 'obj' implicitly has an 'any' type
      function findkey(obj:{key:string}){
        return obj.key === pathname
      }
      for(let i = 0 ; i < items.length ; i++){
        //items[i]['children'] && 判断存在children，后面判断children中有元素
        //!确定前面的对象一定存在
        if(items[i]!['children'] && items[i]!['children'].length > 0 && items[i]!['children'].find(findkey)){
            lastOpenKey = items[i]!.key as string;
            break;
        }

      }
      
            
      const [openKeys,setOpenKeys] = useState([lastOpenKey])
      const handleOpenChange = (openKeys:string[]) => {
        console.log('@@',openKeys,openKeys.length);
        //利用setOpenKeys，将openKeys数组设置为当前选择的子菜单
        setOpenKeys([openKeys[openKeys.length-1]])
      }
      return(
        <Menu 
          theme="dark"
          //默认选择样式在哪个组件身上。不能写死 
          defaultSelectedKeys={[pathname]} 
          mode="inline" 
          items={items} 
          onClick={menuClick}
          //子菜单展开/回收的事件
          onOpenChange={handleOpenChange}
          //当前展开的SubMenu菜单项key数组，此数组决定哪个菜单展开。实现同时只有一个菜单可以展开的功能
          openKeys={openKeys}
        />
      )
}
export default Comp;