import React from 'react'
import styles from './Profile.module.css'
import profile from '../../../Assets/profile.png'
import { useNavigate } from 'react-router-dom'


const Profile = () => {

    const navigate = useNavigate()
    const handleBackToHomeClick = () => {
        navigate('/')
    }
    return (
        <div className={styles.container}>
            <div className={styles.loginForm}>
                <h1 className={styles.tittle}>MY PROFILE</h1>
                <img src={profile} alt='profile' className={styles.profileImg} />

                <div className={styles.email}>
                    <label>Khethy@gmail.com</label>
                </div>


                <div className={styles.password}>
                    <label>Khethiwe Amanda Ngema</label>
                </div>

                <div className={styles.email}>
                    <label>0606669273</label>
                </div>


            </div>
            <div>
                <button onClick={handleBackToHomeClick}>Back To Home</button>
            </div>


        </div>
    )
}

export default Profile