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

const isInputValidated = () => {
    return signInInput.value.length !== 0
}

function renderErrorInput() {
    if(isInputValidated()){
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
    if(isInputValidated()){
        authBlockSignIn(signInInput.value)
        closeModal()
    }else {
        signInInput.oninput = renderErrorInput
    }
})

