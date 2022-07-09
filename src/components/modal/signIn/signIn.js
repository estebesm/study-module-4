import './signIn.scss'
import {authBlockSignIn} from "../../auth/auth";

const signInWindow = document.getElementById('sign-in__window')
const signInContent = document.getElementById('sign-in__content')
const signInInput = document.getElementById('sign-in__input')
const signInContinueButton = document.getElementById('sign-in__continue-button')

export const openModal = () => {
    signInWindow.classList.add('active')
}

export const closeModal = () => {
    signInWindow.classList.remove('active')
}

function isUserNameValid(username) {
    const res = /^[a-z0-9\.]+$/.exec(username);
    return !!res;
}


function renderErrorInput() {
    if(isUserNameValid(signInInput.value)){
        signInInput.classList.remove('error')
    } else{
        signInInput.classList.add('error')
    }
}

signInWindow.addEventListener('click', () => {
    closeModal()
})
signInContent.addEventListener('click', (e) => {
    e.stopPropagation()
})

signInContinueButton.addEventListener('click', () => {
    renderErrorInput()
    if(isUserNameValid(signInInput.value)){
        authBlockSignIn(signInInput.value)
        closeModal()
    }else {
        signInInput.oninput = renderErrorInput
    }
})

