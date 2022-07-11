import './signIn.scss'
import {authBlockSignIn} from "../../auth/auth";

const signInWindows = document.querySelectorAll('.signIn')
const signInContents = document.querySelectorAll('.sign-in__content')
const signInInputs = document.querySelectorAll('.sign-in__input')
const signInContinueButtons = document.querySelectorAll('.sign-in__continue-button')
const closeButtons = document.querySelectorAll('.sign-in__close')

export const openModal = () => {
    signInWindows.forEach(elem => elem.classList.add('active'))
}

export const closeModal = () => {
    signInWindows.forEach(elem => elem.classList.remove('active'))
}

function isUserNameValid(username) {
    const res = /^[a-z0-9\.]+$/.exec(username);
    return !!res;
}


function renderErrorInput() {
    signInInputs.forEach(input => {
        if (isUserNameValid(input.value)) {
            input.classList.remove('error')
        } else {
            input.classList.add('error')
        }
    })
}

closeButtons.forEach(elem => elem.addEventListener('click', closeModal))

signInWindows.forEach(elem => elem.addEventListener('click', () => {
    closeModal()
}))
signInContents.forEach(elem => elem.addEventListener('click', (e) => {
    e.stopPropagation()
}))

signInContinueButtons.forEach(elem => elem.addEventListener('click', () => {
    renderErrorInput()
    signInInputs.forEach(input => {
        if (isUserNameValid(input.value)) {
            authBlockSignIn(input.value)
            closeModal()
        } else {
            input.oninput = renderErrorInput
        }
    })
}))

