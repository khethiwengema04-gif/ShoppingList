import styles from './Registering.module.css';
import { Link, useNavigate } from 'react-router-dom';


const Register = () => {
    const navigate = useNavigate();
    const navigateToHome = () => {
        navigate("/home")
    }
    return (
        <div className={styles.container}>

            <div className="header">
                <h1 className="text">Register</h1>
                {/* <div className="underline"></div> */}
            </div>
            <div className="inputs" >
                <div className="name">
                    <p>Full Names</p>
                    <input type="text" />
                </div>

                <div className="lastname">
                    <p>Lastname</p>
                    <input type="text" />
                </div>

                <div className="email">
                    <p>Email</p>
                    <input type="text" />
                </div>

                <div className="cellphone">
                    <p>Cellphone</p>
                    <input type="text" />
                </div>

                <div className="password">
                    <p>Password</p>
                    <input type="text" />
                </div>

                <div className="confirmPassword">
                    <p>Confirm Password</p>
                    <input type="text" />
                </div>

                <button className={styles.registerBtn} onClick={navigateToHome}>
                    REGISTER
                </button>

            </div>


        </div>
    )
}

export default Register