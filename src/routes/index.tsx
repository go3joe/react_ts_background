import {lazy,Suspense} from 'react'
import About from '../components/pages/About'
import Home from '../components/pages/Home'
/* import Page1 from '../components/pages/Page1'
import Page2 from '../components/pages/Page2' */
import {Navigate} from 'react-router-dom'

/* const About = lazy(() => import('../components/pages/About')) */
/* const Home = lazy(() => import('../components/pages/Home')) */
const Page1 = lazy(() => import('../components/pages/Page1'))
const Page2 = lazy(() => import('../components/pages/Page2'))

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
            }
        ]
    },
    {
        path:'/about',
        element:<About/>
    },
]