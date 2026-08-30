import styles from './Registering.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../../store';
import {
    registerThunk,
    setfullNames,
    setLastName,
    setemailadress,
    setcellphone,
    setpassword,
    setverifypassword
} from '../../../Features/register';



const Register = () => {
    const { fullnames, lastname, emailadress, password, cellphone, verifypassword } = useSelector(
        (state: RootState) => state.register
    );
    const navigate = useNavigate();
    const navigateToHome = () => {
        navigate("/home")
    }

    const dispatch = useDispatch()
    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const registerUser = await dispatch(registerThunk({ fullnames, lastname, emailadress, password, cellphone, verifypassword }) as any)
        if (registerThunk.fulfilled.match(registerUser)) {
            alert('succesfully registered')
            navigate('/home')
        }

    }

    return (
        <div className={styles.container}>

            <div className="header">
                <h1 className="text">Register</h1>
                <div className="underline"></div>
            </div>
            <form onSubmit={handleFormSubmit}>
                <div className="inputs" >
                    <div className="name">
                        <p>Full Names</p>
                        <input type="text" value={fullnames} onChange={(e) => dispatch(setfullNames(e.target.value))} />
                    </div>

                    <div className="lastname">
                        <p>Lastname</p>
                        <input type="text" value={lastname} onChange={(e) => dispatch(setLastName(e.target.value))} />
                    </div>

                    <div className="email">
                        <p>Email</p>
                        <input type="text" value={emailadress} onChange={(e) => dispatch(setemailadress(e.target.value))} />
                    </div>

                    <div className="cellphone">
                        <p>Cellphone</p>
                        <input type="text" value={cellphone} onChange={(e) => dispatch(setcellphone(e.target.value))} />
                    </div>

                    <div className="password">
                        <p>Password</p>
                        <input type="text" value={password} onChange={(e) => dispatch(setpassword(e.target.value))} />
                    </div>

                    <div className="confirmPassword">
                        <p>Confirm Password</p>
                        <input type="text" value={verifypassword} onChange={(e) => dispatch(setverifypassword(e.target.value))} />
                    </div>

                    <button className={styles.registerBtn} type="submit">
                        REGISTER
                    </button>

                </div>
            </form>

        </div>
    )
}

export default Register