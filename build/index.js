/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Eb": () => (/* binding */ openAttackPage),
  "Ve": () => (/* binding */ openPracticePage)
});

// UNUSED EXPORTS: closePage, openMainPage, openPage, pages

;// CONCATENATED MODULE: ./src/components/menu/mainMenu/mainMenu.js


const practiceButton = document.getElementById('main__menu__practice')
const startButton = document.getElementById('main__menu__start')

practiceButton.addEventListener('click', openPracticePage)
startButton.addEventListener('click', openAttackPage)

;// CONCATENATED MODULE: ./src/components/menu/menu.js




const MAIN_MENU_ID = 'main__menu'
const GAME_MENU_ID = 'game__menu'

const menuItems = [MAIN_MENU_ID]

let mainMenu = MAIN_MENU_ID
//let gameMenu = GAME_MENU_ID

menuItems.forEach(menu => {
    if(menu === mainMenu){
        enableMenu(menu)
    }
    else {
        disableMenu(menu)
    }
})

function disableMenu(menuId){
    document.getElementById(menuId).classList.add("disabled")
}
function enableMenu(menuId){
    document.getElementById(menuId).classList.remove("disabled")
}






;// CONCATENATED MODULE: ./src/pages/main/main.js


;// CONCATENATED MODULE: ./src/functions/generateSimpleQuestion.js
const MINUS_OPERATOR = '-'
const PLUS_OPERATOR = '+'
const MULTIPLICATION_OPERATOR = '*'
const DIVIDING_OPERATOR = '/'

const operators = [MINUS_OPERATOR, PLUS_OPERATOR, DIVIDING_OPERATOR, MULTIPLICATION_OPERATOR]

function getRandomOperatorIndex(){
    return Math.floor(Math.random() * operators.length)
}

function generateSimpleNumber(max= 10){
    return Math.floor(Math.random() * max)
}

function getQuestionsNumbers(operator){
    const x = generateSimpleNumber()
    const y = generateSimpleNumber()
    if(operator === MINUS_OPERATOR){
        return {
            firstNumber: x,
            secondNumber: y,
            answer: x - y
        }
    }
    if(operator === PLUS_OPERATOR){
        return {
            firstNumber: x,
            secondNumber: y,
            answer: x + y
        }
    }
    if(operator === DIVIDING_OPERATOR){
        return {
            firstNumber: (x+1) * y,
            secondNumber: x+1,
            answer: y
        }
    }
    if(operator === MULTIPLICATION_OPERATOR){
        return {
            firstNumber: x,
            secondNumber: y,
            answer: x * y
        }
    }
}


function getSimpleQuestion(){
    const operatorIndex = getRandomOperatorIndex()
    const numbers = getQuestionsNumbers(operators[operatorIndex])
    return {
        ...numbers,
        operator: operators[operatorIndex]
    }
}
;// CONCATENATED MODULE: ./src/pages/practice/practice.js



const practiceTask = document.getElementById('practice__task')

const firstNumberElement = document.getElementById('practice__first-number')
const secondNumberElement = document.getElementById('practice__second-number')
const operatorElement = document.getElementById('practice__operator')
const equalsElement = document.getElementById('practice__equals')
const practiceInput = document.getElementById('practice__input')

const answerButton = document.getElementById('practice__answer-button')

const correctAnswerElement = document.getElementById('practice__correct-answer')
const wrongAnswerElement = document.getElementById('practice__wrong-answer')

const scoreElement = document.getElementById('practice__score')


const renderTask = (question) => {
    firstNumberElement.textContent = question.firstNumber.toString()
    operatorElement.textContent = question.operator
    secondNumberElement.textContent = question.secondNumber.toString()
    equalsElement.textContent = '='
}

let question = getSimpleQuestion()
let score = 0
renderTask(question)

answerButton.addEventListener("click", () => {
    if(practiceInput.value === question.answer.toString()) {
        addPoint(score)
    } else {
        removePoint(score)
    }
    practiceTask.classList.remove('create')
    practiceTask.classList.add('remove')
    setTimeout(() => {
        practiceTask.classList.remove('remove')
        practiceTask.classList.add('create')
    }, 250)
    practiceInput.value = ''
    practiceInput.focus()
    question = getSimpleQuestion()
    renderTask(question)
})


function addPoint() {
    correctAnswerElement.classList.add('active')
    setTimeout(() => {
        correctAnswerElement.classList.remove('active')
    }, 500)
    score++
    scoreElement.textContent = `score: ${score}`
}

function removePoint() {
    wrongAnswerElement.classList.add('active')
    scoreElement.classList.add('wrong')
    setTimeout(() => {
        wrongAnswerElement.classList.remove('active')
        scoreElement.classList.remove('wrong')
    }, 500)
    score--
    scoreElement.textContent = `score: ${score}`
}

;// CONCATENATED MODULE: ./src/pages/attack/attack.js



const attackTask = document.getElementById('attack__task')

const attack_firstNumberElement = document.getElementById('attack__first-number')
const attack_secondNumberElement = document.getElementById('attack__second-number')
const attack_operatorElement = document.getElementById('attack__operator')
const attack_equalsElement = document.getElementById('attack__equals')
const attackInput = document.getElementById('attack__input')

const attack_answerButton = document.getElementById('attack__answer-button')

const attack_correctAnswerElement = document.getElementById('attack__correct-answer')
const attack_wrongAnswerElement = document.getElementById('attack__wrong-answer')

const attack_scoreElement = document.getElementById('attack__score')


const attack_renderTask = (question) => {
    attack_firstNumberElement.textContent = question.firstNumber.toString()
    attack_operatorElement.textContent = question.operator
    attack_secondNumberElement.textContent = question.secondNumber.toString()
    attack_equalsElement.textContent = '='
}

let attack_question = getSimpleQuestion()
let attack_score = 0
attack_renderTask(attack_question)

attack_answerButton.addEventListener("click", () => {
    if(attackInput.value === attack_question.answer.toString()) {
        attack_addPoint(attack_score)
    } else {
        attack_removePoint(attack_score)
    }
    attackTask.classList.remove('create')
    attackTask.classList.add('remove')
    setTimeout(() => {
        attackTask.classList.remove('remove')
        attackTask.classList.add('create')
    }, 250)
    attackInput.value = ''
    attackInput.focus()
    attack_question = getSimpleQuestion()
    attack_renderTask(attack_question)
})


function attack_addPoint() {
    attack_correctAnswerElement.classList.add('active')
    setTimeout(() => {
        attack_correctAnswerElement.classList.remove('active')
    }, 500)
    attack_score++
    attack_scoreElement.textContent = `score: ${attack_score}`
}

function attack_removePoint() {
    attack_wrongAnswerElement.classList.add('active')
    attack_scoreElement.classList.add('wrong')
    setTimeout(() => {
        attack_wrongAnswerElement.classList.remove('active')
        attack_scoreElement.classList.remove('wrong')
    }, 500)
    attack_score--
    attack_scoreElement.textContent = `score: ${attack_score}`
}
;// CONCATENATED MODULE: ./src/components/modal/signIn/signIn.js



const signInWindow = document.getElementById('sign-in__window')
const signInContent = document.getElementById('sign-in__content')
const signInInput = document.getElementById('sign-in__input')
const signInContinueButton = document.getElementById('sign-in__continue-button')

const openModal = () => {
    signInWindow.classList.add('active')
}

const closeModal = () => {
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


;// CONCATENATED MODULE: ./src/functions/localStorage.js
const isAuth = () => localStorage.getItem('username')

const signIn = (username) => localStorage.setItem('username', username)

const signOut = () => localStorage.removeItem('username')

const getUsername = () => localStorage.getItem('username')
;// CONCATENATED MODULE: ./src/components/auth/auth.js




const authBlockSignIn = (username) => {
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


;// CONCATENATED MODULE: ./src/entries/index/index.js



const MAIN_PAGE_ID = 'main-page'
const PRACTICE_PAGE_ID = 'practice-page'
const ATTACK_PAGE_ID = 'attack-page'

const pages = [MAIN_PAGE_ID, PRACTICE_PAGE_ID, ATTACK_PAGE_ID]

;




openMainPage()

function openMainPage(){
    pages.forEach(id => {
        closePage(id)
    })
    openPage(MAIN_PAGE_ID)
}
function openPracticePage(){
    pages.forEach(id => {
        closePage(id)
    })
    openPage(PRACTICE_PAGE_ID)
}
function openAttackPage() {
    pages.forEach(id => {
        closePage(id)
    })
    openPage(ATTACK_PAGE_ID)
}

function openPage(id){
    document.getElementById(id).style.display = 'block'
}
function closePage(id){
    document.getElementById(id).style.display = 'none'
}



/******/ })()
;