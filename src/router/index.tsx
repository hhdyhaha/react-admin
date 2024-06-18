import {createBrowserRouter} from "react-router-dom";
import HomePage from '@/pages/home/HomePage'
import ErrorPage from '@/pages/error/ErrorPage.tsx'

const routersList = createBrowserRouter([
    {
        path: '/',
        element: <HomePage/>,
        errorElement: <ErrorPage/>
    },
    {
        path: '*', // 除了上面的路径,显示错误页面
        element: <ErrorPage/>,
    },

])
export default routersList
