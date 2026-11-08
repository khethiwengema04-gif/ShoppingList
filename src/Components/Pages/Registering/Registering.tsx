
import styles from './Registering.module.css';
import { useNavigate } from 'react-router-dom';
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

    const {
        fullnames,
        lastname,
        emailadress,
        password,
        cellphone,
        verifypassword
    } = useSelector((state: RootState) => state.register);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const registerUser = await dispatch(
            registerThunk({
                fullnames,
                lastname,
                emailadress,
                password,
                cellphone,
                verifypassword
            }) as any
        );

        if (registerThunk.fulfilled.match(registerUser)) {
            alert('Successfully registered');
            navigate('/home');
        }
    };

    return (
        <div className={styles.container}>

            <div className={styles.registerForm}>

                <div className={styles.header}>
                    <h1 className={styles.text}>REGISTER</h1>
                    <div className={styles.underline}></div>
                </div>

                <form
                    onSubmit={handleFormSubmit}
                    className={styles.form}
                >

                    <div className={styles.inputs}>

                        <div className={styles.field}>
                            <p>Full Names</p>
                            <input
                                type="text"
                                value={fullnames}
                                onChange={(e) =>
                                    dispatch(setfullNames(e.target.value))
                                }
                            />
                        </div>

                        <div className={styles.field}>
                            <p>Last Name</p>
                            <input
                                type="text"
                                value={lastname}
                                onChange={(e) =>
                                    dispatch(setLastName(e.target.value))
                                }
                            />
                        </div>

                        <div className={styles.field}>
                            <p>Email</p>
                            <input
                                type="email"
                                value={emailadress}
                                onChange={(e) =>
                                    dispatch(setemailadress(e.target.value))
                                }
                            />
                        </div>

                        <div className={styles.field}>
                            <p>Cellphone</p>
                            <input
                                type="tel"
                                value={cellphone}
                                onChange={(e) =>
                                    dispatch(setcellphone(e.target.value))
                                }
                            />
                        </div>

                        <div className={styles.field}>
                            <p>Password</p>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) =>
                                    dispatch(setpassword(e.target.value))
                                }
                            />
                        </div>

                        <div className={styles.field}>
                            <p>Confirm Password</p>
                            <input
                                type="password"
                                value={verifypassword}
                                onChange={(e) =>
                                    dispatch(setverifypassword(e.target.value))
                                }
                            />
                        </div>

                        <button
                            className={styles.registerBtn}
                            type="submit"
                        >
                            REGISTER
                        </button>

                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
