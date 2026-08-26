import React from 'react'
import styles from './LogIn.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../../store';
import {
    loginThunk,


} from '../../../Features/login';
import {
    setemailadress,
    setpassword
} from '../../../Features/register'


const login = () => {

    const emailadress = useSelector((state: RootState) => state.register.emailadress)
    const password = useSelector((state: RootState) => state.register.password)


    // export const Log = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch()
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const loginUser = await dispatch(loginThunk({ emailadress, password }) as any)
        if (loginThunk.fulfilled.match(loginUser)) {
            alert('Log In')
            navigate('/home')
        }
        if (loginThunk.rejected.match(loginUser)) {
            alert(loginUser.payload as string || "Invalid password")

        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.loginForm}>
                <h1 className={styles.tittle}>LOG IN</h1>

                <form onSubmit={handleSubmit}>

                    <div className={styles.email}>
                        <label>Email Adress:</label>
                        <input type="email" className={styles.emailInput}
                            value={emailadress}
                            onChange={(e) => dispatch(setemailadress(e.target.value))} />
                    </div>


                    <div className={styles.password}>
                        <label>Password:</label>
                        <input type="password" className={styles.passwordInput}
                            value={password}
                            onChange={(e) => dispatch(setpassword(e.target.value))} />
                    </div>

                    <button className={styles.loginBtn}>
                        LOGIN
                    </button>

                    <Link className={styles.signUp} to='/register'>Don't have an account? SignUp</Link>
                </form>
            </div>

        </div >
    )
}

export default login