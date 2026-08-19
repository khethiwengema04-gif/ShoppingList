import React from 'react'
import { Log } from './Components/Pages/LogIn/Log'
import { Route, Routes } from 'react-router-dom'
import { Home } from './Components/Pages/Home/Home'

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Log />} />
                <Route path="/home" element={<Home />} />
            </Routes>

        </>

    )
}


export default App