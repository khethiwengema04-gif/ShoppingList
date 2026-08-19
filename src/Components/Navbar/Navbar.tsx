import styles from './Navbar.module.css'
import { Text } from '../Text/Text'

export default function Navbar() {

    return (
        <nav>
            <div className={styles.content}>
                <Text varient={'h1'} style={{ margin: 0 }}>SHOPPING LIST</Text>

            </div>
        </nav>
    )
}
