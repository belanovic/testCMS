import react, { useState, useEffect, useContext } from 'react';
import { context } from './newsContext';
import './styleForm.css';
import {registerUser} from './getUser.js';
import {loginUser} from './getUser.js';
import Profile from './Profile.js';

export default function Form() {

    const { alphabet, isLoggedIn, setLoggedIn, loggedUser, setLoggedUser } = useContext(context);

    const [signInisActive, setSignInIsActive] = useState(true);
    const [signUpisActive, setSignUpIsActive] = useState(false);

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('');
    const [usernameSignIn, setUsernameSignIn] = useState('');
    const [usernameSignUp, setUsernameSignUp] = useState('');
    const [passwordSignUp, setPasswordSignUp] = useState('');
    const [passwordSignIn, setPasswordSignIn] = useState('');
    const [email, setEmail] = useState('');


    const handleChange = (e, setFunc) => {
        const value = e.target.value;
        setFunc(value);
    }

    const handleClickTab = (tab) => {
        if (tab === 'sign-up') {
            setSignUpIsActive(true);
            setSignInIsActive(false);
        } else if (tab === 'sign-in') {
            setSignUpIsActive(false);
            setSignInIsActive(true);
        }        
    }

    const handleClickSignIn = async (e) => {
        e.preventDefault();
        const userAndToken = await loginUser(usernameSignIn, passwordSignIn);
        if(userAndToken[0] === false) return;
        const token = userAndToken[3];
        localStorage.setItem('x-auth-token', token);

        setLoggedIn((prev) => {
             console.log(localStorage.getItem('x-auth-token'))
             const v = localStorage.getItem('x-auth-token') === 'none'? false : true;
             return v
        })
        setLoggedUser((prom) => {
            const v = localStorage.getItem('x-auth-token') === 'none'? '' : userAndToken[2];
            return v
        })
        console.log(userAndToken);
    }

    const handleClickSignUp = async (e) => {
        e.preventDefault();
        const newUser = await registerUser(firstName, lastName, usernameSignUp, passwordSignUp, email);
        console.log(newUser);
    }

    return (
        <>
            <div className="form-container">
                        {isLoggedIn?
                        <Profile loggedUser = {loggedUser}/>
                        :
                        <form className="form">
                            <div className="form-title">
                                <span 
                                    className= {`proba sign-in ${signInisActive? 'isActive' : 'notActive'}`}
                                    onClick = {() => handleClickTab('sign-in')}
                                >Prijava</span>
                                <span 
                                    className= {`sign-up ${signUpisActive? 'isActive' : 'notActive'}`}
                                    onClick = {() => handleClickTab('sign-up')}
                                >{'Registracija'}</span>
                            </div>

                            <div 
                                className="form-element 3"
                                style = {{display: signUpisActive? 'block' : 'none'}}
                            >
                                <label htmlFor="firstName" className="firstName-label">Ime</label>
                                <input 
                                    id="firstName" 
                                    className="firstName-input" 
                                    type="text"
                                    value = {firstName}
                                    onChange = {(e) => handleChange(e, setFirstName)}

                                    maxLength = "6"
                                ></input>
                            </div>

                            <div 
                                className="form-element lastName"
                                style = {{display: signUpisActive? 'block' : 'none'}}
                            >
                                <label htmlFor="lastName" className="lastName-label">Prezime</label>
                                <input 
                                    id="lastName" 
                                    className="lastName-input" 
                                    type="text" 
                                    value = {lastName}
                                    onChange = {(e) => handleChange(e, setLastName)}
                                ></input>
                            </div>

                            <div 
                                className="form-element usernameSignIn"
                                style = {{display: signInisActive? 'block' : 'none'}}
                            >
                                <label htmlFor="usernameSignIn" className="usernameSignIn-label">Korisničko ime</label>
                                <input 
                                    id="usernameSignIn" 
                                    className="usernameSignIn-input" 
                                    type="text"
                                    value = {usernameSignIn}
                                    onChange = {(e) => handleChange(e, setUsernameSignIn)}
                                ></input>
                            </div>
                            <div 
                                className="form-element usernameSignUp"
                                style = {{display: signUpisActive? 'block' : 'none'}}
                            >
                                <label htmlFor="usernameSignUp" className="usernameSignUp-label">Korisničko ime</label>
                                <input 
                                    id="usernameSignUp" 
                                    className="usernameSignUp-input" 
                                    type="text"
                                    value = {usernameSignUp}
                                    onChange = {(e) => handleChange(e, setUsernameSignUp)}
                                ></input>
                            </div>

                            <div 
                                className="form-element paswordSignIn"
                                style = {{display: signInisActive? 'block' : 'none'}}
                            >
                                <label htmlFor="passwordSignIn" className="pasword-label">Šifra</label>
                                <input 
                                    id="passwordSignIn" 
                                    className="paswordSignIn-input" 
                                    type="text" 
                                    value = {passwordSignIn}
                                    onChange = {(e) => handleChange(e, setPasswordSignIn)}
                                ></input>
                            </div>
                            <div 
                                className="form-element paswordSignUp"
                                style = {{display: signUpisActive? 'block' : 'none'}}
                            >
                                <label htmlFor="passwordSignUp" className="paswordSignUp-label">Šifra</label>
                                <input 
                                    id="passwordSignUp" 
                                    className="paswordSignUp-input" 
                                    type="text" 
                                    value = {passwordSignUp}
                                    onChange = {(e) => handleChange(e, setPasswordSignUp)}
                                ></input>
                            </div>

                            <div 
                                className="form-element email"
                                style = {{display: signUpisActive? 'block' : 'none'}}
                            >
                                <label htmlFor="username" className="email-label">e-mail</label>
                                <input 
                                    id="username" 
                                    className="email-input" 
                                    type="email"
                                    value = {email}
                                    onChange = {(e) => handleChange(e, setEmail)}
                                ></input>
                            </div>
                            <div className="form-send">
                                <button 
                                    className="form-send-button"
                                    onClick = {signInisActive? handleClickSignIn : handleClickSignUp}
                                >{`${signInisActive? 'Prijavi se' : 'Registruj se'}`}</button>
                            </div>
                        </form>}
            </div>
        </>
    )
}