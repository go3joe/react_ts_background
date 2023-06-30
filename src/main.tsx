import ReactDOM from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
//样式初始化
import "reset-css"
//UI框架的样式

//全局样式，@表示src，绝对路径。
//要让@生效，需要配置别名：在vite.config中做别名配置
//要输入@/后有提示，需要在tsconfig.json中配置
import '@/assets/style/global.scss'
//组件的样式
import App from './App.tsx'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
)
