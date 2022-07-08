import './auth.scss'
import {openModal} from "../modal/signIn/signIn";
import {getUsername, isAuth, signIn, signOut} from "../../functions/localStorage";
import {currentPage, MAIN_PAGE_ID, PRACTICE_PAGE_ID} from "../../entries/index";

export const authBlockSignIn = (username) => {
    signIn(username)
    authButtons.forEach(elem => {
        elem.textContent = getUsername()
    })
}

const authButtons = document.querySelectorAll('.auth__button')

authButtons.forEach(button => {
    button.addEventListener('click', () => {
        if(isAuth()){
            signOut()
            setAuthButtonContent(currentPage)
        }
        else {
            openModal()
        }
    })
})

export function setAuthButtonContent(currentPage){
    if(currentPage === MAIN_PAGE_ID){
        authButtons.forEach(elem => {
            elem.textContent = isAuth() ? getUsername() : 'login'
        })
    }
    if(currentPage === PRACTICE_PAGE_ID){
        authButtons.forEach(elem => {
            elem.textContent = isAuth() ? getUsername() : ''
        })
    }
}

export function disableAuthButton(){
    authButtons.forEach(button => {
        button.disabled = true
    })
}

export function enableAuthButton(){
    authButtons.forEach(button => {
        button.disabled = false
    })
}

