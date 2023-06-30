import {lazy,Suspense} from 'react'
import Home from '../components/views/Home'
import Login from '../components/views/login'
import {Navigate} from 'react-router-dom'

const Page1 = lazy(() => import('../components/views/Page1'))
const Page2 = lazy(() => import('../components/views/Page2'))
const Page301 = lazy(() => import('../components/views/Page301'))
const Page302 = lazy(() => import('../components/views/Page302'))
const Page303 = lazy(() => import('../components/views/Page303'))

const withLoadingComponent = (comp:JSX.Element) => {
    return(
        <Suspense fallback={<h2>Laoding....</h2>}>
            {comp}
        </Suspense>
    )
}

export default [
    {
        path:'/',
        element:<Navigate to='/page1'/>
    },
    {
        path:'/',
        element:<Home/>,
        children:[
            {
                path:'/page1',
                element:withLoadingComponent(<Page1/>)
            },
            {
                path:'/page2',
                element:withLoadingComponent(<Page2/>)
            },
            {
                path:'page3',
                /* element:withLoadingComponent(<Page302/>), */
                children:[
                    {
                        path:'page301',
                        element:withLoadingComponent(<Page301/>),
                    },
                    {
                        path:'page302',
                        element:withLoadingComponent(<Page302/>),
                    },
                    {
                        path:'page303',
                        element:withLoadingComponent(<Page303/>),
                    },

                ]
            },
        ]
    },
    {
        /* 配置login页面 */
        path:'/login',
        element:<Login/>
    },
    {
        /* 匹配其它不存在的路径 */
        path:'*',
        element:<Navigate to='/page1'/>
    }
]