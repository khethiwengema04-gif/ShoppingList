import React from 'react'
import styles from './LogIn.module.css';
import { useNavigate } from 'react-router-dom';




export const Log = () => {
    const navigate = useNavigate();
    const navigateToHome = () => {
        navigate("/home")
    }

    return (
        <div className={styles.container}>
            <div className={styles.loginForm}>
                <h1 className={styles.tittle}>LOG IN</h1>

                <div className={styles.email}>
                    <label>Email Adress:</label>
                    <input type="email" className={styles.emailInput} />
                </div>


                <div className={styles.password}>
                    <label>Password:</label>
                    <input type="password" className={styles.passwordInput} />
                </div>

                <button className={styles.loginBtn} onClick={navigateToHome}>
                    LOGIN
                </button>
            </div>

        </div>
    )
}
