import React from 'react'
import { Log } from './Components/Pages/LogIn/Log'
import { Route, Routes } from 'react-router-dom'
import { Home } from './Components/Pages/Home/Home'
import Register from './Components/Pages/Registering/Registering'
// import { Profile } from './Components/Pages/Profile'

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Log />} />
                <Route path="/register" element={<Register />} />
                <Route path="/home" element={<Home />} />
            </Routes>



            {/* <Routes> */}
            {/* <Route path="/" element={<Log />} /> */}
            {/* <Route path="/profilepage" element={<Profile />} /> */}
            {/* </Routes> */}

        </>

    )
}


export default App