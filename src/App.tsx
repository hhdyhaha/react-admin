import './styles/App.css'
import './styles/Reset.css'
import {RouterProvider} from 'react-router-dom';
import routersList from "@/router/index.tsx"


function App() {
    return (
        <>
            <div className="h-full">
                <RouterProvider router={routersList}/>
            </div>
        </>
    )
}

export default App
