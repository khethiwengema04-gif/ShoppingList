import React from 'react'
import Navbar from '../../Navbar/Navbar'
import styles from './Home.module.css'
import { Search } from '../Search/Search'

export const Home = () => {
    return (
        <div>
            <Navbar />
            <Search />
        </div>
    )
}
