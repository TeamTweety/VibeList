import '../styles.css';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from './Components/HomePage';
import { SecondPage } from './Components/SecondPage';

export function App() {
    return (
        <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/playlist' element={<SecondPage/>}/>
        </Routes>
    )
}