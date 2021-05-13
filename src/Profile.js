import react, { useContext, useEffect } from 'react';
import {context} from './newsContext';

export default function Profile({loggedUser}) {

    const {setLoggedIn} = useContext(context);

    const handleSignOut = (e) => {
        e.preventDefault();
        localStorage.setItem('x-auth-token', 'none');
        localStorage.setItem('loggedUsername', null);
        setLoggedIn(false);
        window.location.href = '/';
    }

    useEffect((prom) => {
        console.log(loggedUser);
    }, [])

    return (
        <div className = "profile">
            <div className = "profile-element">
                <div className = "profile-element-description">Korisničko ime</div>
                <div className = "profile-element-username">{loggedUser.username}</div>
            </div>
            <div className = "profile-element">
                <div className = "profile-element-description">Ime</div>
                <div className = "profile-element-firstname">{loggedUser.firstName}</div>
            </div>
            <div className = "profile-element">
                <div className = "profile-element-description">Prezime</div>
                <div className = "profile-element-lastname">{loggedUser.lastName}</div>
            </div>
            <div className = "profile-element">
                <div className = "profile-element-description">email</div>
                <div className = "profile-element-email">{loggedUser.email}</div>
            </div>
            <button 
                className = "profile-signOut"
                onClick = {(e) => handleSignOut(e)}
            >Odjavi se</button>
        </div>
    )
}