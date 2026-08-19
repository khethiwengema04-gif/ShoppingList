import React from 'react'
import styles from './Profile.module.css'
import profile from '../../../Assets/profile.png'

const Profile = () => {
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


        </div>
    )
}

export default Profile