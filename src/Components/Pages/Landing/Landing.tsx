import React from 'react'
import styles from './Landing.module.css'
import { useNavigate } from 'react-router-dom'
import shoppingIcon from '../../../Assets/shoppingIcon.png'

export const Landing = () => {

    const navigate = useNavigate();
    const handleStart = () => {
        navigate('/login')
    }
    return (
        <div className={styles.landing}>

            <img src={shoppingIcon} alt='shoppingIcon' className={styles.shoppingImg} />
            <h1>Welcome to the Shopping List</h1>
            <p>Thank you for believing in us</p>

            <button className={styles.startBtn} onClick={handleStart}>
                Get Started
            </button>
        </div>
    )
}

export default Landing