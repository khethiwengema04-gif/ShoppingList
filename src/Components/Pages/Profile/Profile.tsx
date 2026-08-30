
// import styles from './Profile.module.css'
// import profileIcon from '../../../Assets/profile.png'
// import { useNavigate } from 'react-router-dom'
// import { clearProfileStore, fetchProfileData, updateProfileData } from '../../../Features/profile'
// import { useSelector, useDispatch } from 'react-redux'
// import type { RootState } from '../../../store'

// import { useEffect, useState } from 'react'

// const profile: React.FC = () => {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     const profileState = useSelector((state: RootState) => state.profile);
//     const Session = useSelector((state: RootState) => state.login.user)
// }
// const [isEditable, setIsEditable] = useState<boolean>(false)
// const [fullnames, setFullnames] = useState<string>('');
// const [lastname, setLastname] = useState<string>('');
// const [email, setEmail] = useState<string>('');
// const [cellphone, setCellphone] = useState<string>('');
// const [password, setPassword] = useState<string>('');


// useEffect(() => {
//     if (userSession) {
//         dispatch(fetchProfileData());
//     }
// }, [dispatch]);

// useEffect(() => {
//     setFullnames(profileState.fullname);
//     setLastname(profileState.lastname);
//     setEmail(profileState.profile);
//     setCellphone(profileState.cellphone);
//     setPassword(profileState.password);
// }, [profileState]);

// const handleSubmit = () => {


//     const Profile = () => {

//         const navigate = useNavigate()
//         const handleBackToHomeClick = () => {
//             navigate('/')
//         }


//         return (
//             <div className={styles.container}>
//                 <div className={styles.loginForm}>
//                     <h1 className={styles.tittle}>MY PROFILE</h1>
//                     <img src={profileIcon} alt='profile' className={styles.profileImg} />

//                     <div className={styles.email}>09
//                         <label>Khethy@gmail.com</label>
//                     </div>


//                     <div className={styles.password}>
//                         <label>Khethiwe Amanda Ngema</label>
//                     </div>

//                     <div className={styles.email}>
//                         <label>0606669273</label>
//                     </div>


//                 </div>

//                 {/* <div>
//                 <button onClick={handleEditProfile}>EditProfile</button>
//             </div> */}

//                 <div>
//                     <button onClick={handleBackToHomeClick}>Log out</button>
//                 </div>



//             </div>
//         )
//     }
// }
// export default profile