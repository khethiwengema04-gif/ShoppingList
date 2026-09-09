import styles from './Profile.module.css'
import profileIcon from '../../../Assets/profile.png'
import { useNavigate } from 'react-router-dom'
import { fetchProfileData, updateProfileData, clearProfileStore } from '../../../Features/profile'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState, AppDispatch } from '../../../store'
import { useEffect, useState } from 'react'

const Profile: React.FC = () => {
    const navigate = useNavigate();
    // Use AppDispatch to avoid TypeScript middleware type errors
    const dispatch = useDispatch<AppDispatch>();

    // Grab authentication session and profile data from global state
    const Session = useSelector((state: RootState) => state.login.user);
    const profileState = useSelector((state: RootState) => state.profile);

    // Edit state toggle
    const [isEditable, setIsEditable] = useState<boolean>(false);

    // Local form states synced with Redux data
    const [fullnames, setFullnames] = useState<string>('');
    const [lastname, setLastname] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [cellphone, setCellphone] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    // 1. Fetch Profile Data dynamically when the user session exists
    useEffect(() => {
        if (Session?.id) {
            // Pass the logged-in user id to retrieve their corresponding profile
            dispatch(fetchProfileData());
        }
    }, [dispatch, Session?.id]);

    // 2. Hydrate local states once the Redux profile data is fetched
    useEffect(() => {
        if (profileState) {
            setFullnames(profileState.fullname || '');
            setLastname(profileState.lastname || '');
            setEmail(profileState.email || Session?.emailadress || '');
            setCellphone(profileState.cellphone || '');
            setPassword(profileState.password || '');
        }
    }, [profileState, Session]);

    // Save changes back to database via slice thunk
    const handleSaveChanges = () => {
        if (Session?.id) {
            const updatedData = {
                userId: Session.id,
                fullname: fullnames,
                lastname: lastname,
                email: email,
                cellphone: cellphone,
                password: password
            };
            dispatch(updateProfileData(updatedData));
            setIsEditable(false); // Close edit view
        }
    };

    const handleLogout = () => {
        // Clear profile storage from Redux on logout if necessary
        dispatch(clearProfileStore());
        navigate('/');
    };

    return (
        <div className={styles.container}>
            <div className={styles.loginForm}>
                <h1 className={styles.tittle}>MY PROFILE</h1>
                <img src={profileIcon} alt='profile' className={styles.profileImg} />

                {/* Form fields display dynamically based on whether edit state is active */}
                <div className={styles.fieldGroup}>
                    <label>First Names:</label>
                    {isEditable ? (
                        <input type="text" value={fullnames} onChange={(e) => setFullnames(e.target.value)} />
                    ) : (
                        <p>{fullnames || 'Not provided'}</p>
                    )}
                </div>

                <div className={styles.fieldGroup}>
                    <label>Last Name:</label>
                    {isEditable ? (
                        <input type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} />
                    ) : (
                        <p>{lastname || 'Not provided'}</p>
                    )}
                </div>

                <div className={styles.fieldGroup}>
                    <label>Email Address:</label>
                    {isEditable ? (
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    ) : (
                        <p>{email || Session?.emailadress}</p>
                    )}
                </div>

                <div className={styles.fieldGroup}>
                    <label>Cellphone Number:</label>
                    {isEditable ? (
                        <input type="text" value={cellphone} onChange={(e) => setCellphone(e.target.value)} />
                    ) : (
                        <p>{cellphone || 'Not provided'}</p>
                    )}
                </div>
            </div>

            {/* Action Buttons */}
            <div className={styles.actions}>
                {isEditable ? (
                    <>
                        <button onClick={handleSaveChanges} className={styles.saveBtn}>Save Changes</button>
                        <button onClick={() => setIsEditable(false)} className={styles.cancelBtn}>Cancel</button>
                    </>
                ) : (
                    <button onClick={() => setIsEditable(true)} className={styles.editBtn}>Edit Profile</button>
                )}

                <button onClick={handleLogout} className={styles.logoutBtn}>Log out</button>
            </div>
        </div>
    );
};

export default Profile;
