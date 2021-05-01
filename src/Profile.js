import react, { useContext } from 'react';
import {context} from './newsContext';

export default function Profil() {

    const {setLoggedIn} = useContext(context);

    const handleSignOut = (e) => {
        e.preventDefault();
        localStorage.removeItem('x-auth-token');
        setLoggedIn(false);
    }

    return (
        <div className = "profile">
            <button 
                className = "profile-signOut"
                onClick = {(e) => handleSignOut(e)}
            >Odjavi se</button>
        </div>
    )
}