import styles from './Navbar.module.css'
import { Text } from '../Text/Text'
import profile from '../../Assets/profile.png'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {
    const navigate = useNavigate();
    const navigateToProfile = () => {
        navigate('/profilepage');
    };


    return (
        <nav>
            <div className={styles.nav}>
                <Text varient={'h1'} style={{ margin: 0 }}>SHOPPING LIST</Text>
                <img onClick={navigateToProfile} src={profile} alt='profile' className={styles.profileImg} />
            </div>
        </nav>
    )
}
