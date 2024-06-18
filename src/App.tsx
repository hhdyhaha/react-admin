import LayoutPage from '@/layout/LayoutPage'
import './styles/App.css'
import './styles/Reset.css'
import {BrowserRouter} from 'react-router-dom';

function App() {
    return (
        <>
            <div className="h-full">
                <BrowserRouter>
                    <LayoutPage/>
                </BrowserRouter>
            </div>
        </>
    )
}

export default App
