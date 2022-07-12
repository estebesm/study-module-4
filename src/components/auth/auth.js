import './auth.scss'
import {openModal} from "../modal/signIn/signIn";
import {getUsername, isAuth, signIn, signOut} from "../../functions/localStorage";
import {currentPage, MAIN_PAGE_ID, GAME_PAGE_ID} from "../../entries/index";
const authButtons = document.querySelectorAll('.auth__button')
const authImages = document.querySelectorAll('.auth__image')
const authTexts = document.querySelectorAll('.auth__text')

export const authBlockSignIn = (username) => {
    signIn(username)
    authTexts.forEach(elem => {
        elem.textContent = getUsername()
    })
    authImages.forEach(elem => {
        elem.style.display = 'block'
    })
}

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
        authTexts.forEach(elem => {
            elem.textContent = isAuth() ? getUsername() : 'login'
        })
        authImages.forEach(elem => {
            elem.style.display = isAuth() ? 'block' : 'none'
        })
    }
    if(currentPage === GAME_PAGE_ID){
        authTexts.forEach(elem => {
            elem.textContent = isAuth() ? getUsername() : ''
        })
        authImages.forEach(elem => {
            elem.style.display = 'none'
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

