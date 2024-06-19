import {createHashRouter, Navigate} from "react-router-dom";
import HomePage from '@/pages/Home/HomePage'
import ErrorPage from '@/pages/Error/ErrorPage'
import LayoutPage from '@/layout/LayoutPage'
import HtmlPage from '@/pages/HtmlPage/HtmlPage'
import CssPage from '@/pages/CssPage/CssPage'
import JsPage from '@/pages/JsPage/JsPage'

const routersList = createHashRouter([
    {
        path: '/',
        element: <LayoutPage/>,
        children: [
            {
                path: '/home',
                element: <HomePage/>
            },
            {
                path:'/html-page',
                element: <HtmlPage/>
            },
            {
                path:'/css-page',
                element: <CssPage/>
            },
            {
                path:'/js-page',
                element: <JsPage/>
            },
            {
                path: '/',
                element: <Navigate to="/home"/>,
            },
            {
                path: '*', // 除了上面的路径,显示错误页面
                // element: <ErrorPage/>, 嵌套在/里面的错误页面
                // 单独的错误页面
                element: <Navigate to="/error"/>,
            },
        ],
    },
    {
        path: 'error',
        element: <ErrorPage/>
    }
])
export default routersList
