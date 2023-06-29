/* import { Suspense } from 'react' */
/* import { Button, Space } from 'antd';
import {VerticalAlignBottomOutlined} from '@ant-design/icons' */
import { useRoutes} from 'react-router-dom';
/* import Home from './components/pages/Home';
import About from './components/pages/About'; */
import routes from './routes'


/* function App() {
  const [count, setCount] = useState(0) */
//React.FC 类型 React function component



const App:React.FC =()=>{
  const element = useRoutes(routes)
  return (
    <>
      {/* Suspense定义在这，页面跳转是会闪动。直接定义到路由表中 */}
      {/* <Suspense fallback={<h2>Laoding....</h2>}> */}
        {element}
      {/* </Suspense> */}
    </>
  )
}

export default App
