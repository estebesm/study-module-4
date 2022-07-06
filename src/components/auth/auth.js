import './auth.scss'
import {openModal} from "../modal/signIn/signIn";
import {getUsername, isAuth, signIn, signOut} from "../../functions/localStorage";

export const authBlockSignIn = (username) => {
    signIn(username)
    authButton.textContent = getUsername()
}

const authButton = document.getElementById('auth__button')

if(isAuth()){
    authButton.textContent = getUsername()
}


authButton.addEventListener('click', () => {
    if(isAuth()){
        signOut()
        authButton.textContent = 'login'
    }
    else {
        openModal()
    }
})

