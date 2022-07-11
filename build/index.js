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
  "Tl": () => (/* binding */ GAME_PAGE_ID),
  "kx": () => (/* binding */ MAIN_PAGE_ID),
  "I3": () => (/* binding */ closePage),
  "lo": () => (/* binding */ currentPage),
  "Eb": () => (/* binding */ openAttackPage),
  "OX": () => (/* binding */ openMainPage),
  "Ve": () => (/* binding */ openPracticePage)
});

;// CONCATENATED MODULE: ./src/functions/localStorage.js
const isAuth = () => localStorage.getItem('username')

const signIn = (username) => localStorage.setItem('username', username)

const signOut = () => localStorage.removeItem('username')

const getUsername = () => localStorage.getItem('username')

const getRecordsList = (mode = 'attack') => {
    return JSON.parse(localStorage.getItem(`${mode}-records`) || '[]').sort(compare)
}

// export const getUserRecord = (mode, username) => {
//     return localStorage.getItem(`${mode}-records`)
// }

function compare( a, b ) {
    if ( a.result < b.result ){
        return 1;
    }
    if ( a.result > b.result ){
        return -1;
    }
    return 0;
}

const setUserRecord = (mode, username, result) => {
    const recordsList = getRecordsList(mode)

    const user = recordsList.find(user => username === user.username)
    if(user){
        if(user.result < result){
            recordsList.forEach(person => {
                if(person.username === username){
                    person.result = result
                }
            })
            localStorage.setItem(`${mode}-records`, JSON.stringify(recordsList))
        }
    }
    else{
        localStorage.setItem(`${mode}-records`, JSON.stringify(
            [
                ...recordsList,
                {username, result}
            ]
        ))
    }
}
;// CONCATENATED MODULE: ./src/components/records/records.js



const recordsElement = document.querySelector('.records')
const closeElement = document.querySelector('.records__close')
const recordsTable = document.querySelector('.records__table')

const practiceButton = document.getElementById('records__practice__button')
const attackButton = document.getElementById('records__attack__button')

const openRecords = (mode = 'attack') => {
    if(mode === 'attack') attackButton.classList.add('selected')
    if(mode === 'practice') practiceButton.classList.add('selected')
    recordsElement.classList.add('active')
    renderTable(mode)
}

const closeRecords = () => {
    recordsElement.classList.remove('active')
}

recordsElement.addEventListener('click', (e) => {
    e.stopPropagation()
})

closeElement.addEventListener('click', closeRecords)

practiceButton.addEventListener('click', () => {
    attackButton.classList.remove('selected')
    practiceButton.classList.add('selected')
    renderTable('practice')
})
attackButton.addEventListener('click', () => {
    practiceButton.classList.remove('selected')
    attackButton.classList.add('selected')
    renderTable('attack')
})

function renderTable(mode = 'attack'){
    clearTable()
    const records = getRecordsList(mode)
    records.forEach((record, index) => {
        let liLast = document.createElement('li');
        liLast.innerHTML =
            `<div class="table__item__name">${index+1}. ${record.username}</div>
             <div class="table__item__value">${record.result}</div>`
        recordsTable.append(liLast);
    })
}

function clearTable(){
    recordsTable.innerHTML = null
}
;// CONCATENATED MODULE: ./src/components/menu/mainMenu/mainMenu.js



const mainMenu_practiceButton = document.getElementById('main__menu__practice')
const startButton = document.getElementById('main__menu__start')
const recordsButton = document.getElementById('main__menu__records')

mainMenu_practiceButton.addEventListener('click', openPracticePage)
startButton.addEventListener('click', openAttackPage)
recordsButton.addEventListener('click', () => openRecords('attack'))

;// CONCATENATED MODULE: ./src/components/menu/menu.js



const MAIN_MENU_ID = 'main__menu'

const menuItems = [MAIN_MENU_ID]

let mainMenu = MAIN_MENU_ID

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
;// CONCATENATED MODULE: ./src/components/timer/timer.js




const countdownEl = document.querySelector('.countdown');
const countdownNumberEl = document.querySelector('.countdown-number');
let countdown = 10;

const resetTimer = () => {
    countdown = 10
    countdownNumberEl.textContent = countdown
}

const runTimer = () => {
    const practiceButton = document.getElementById('game__stop-game-button')
    countdownEl.classList.add('active')
    countdownNumberEl.textContent = countdown.toString();
    const interval = setInterval(function () {
        if(countdown<=0){
            disableTimer()
            openResultWindow(getScore())
            countdown = 10
        }
        else {
            countdown--
            countdownNumberEl.textContent = countdown.toString();
        }
    }, 1000);

    practiceButton.addEventListener('click', disableTimer)

    function disableTimer() {
        countdownEl.classList.remove('active')
        clearInterval(interval)
    }
}
;// CONCATENATED MODULE: ./src/components/resultWindow/resultWindow.js








const resultWindow = document.getElementById('result-window')
//const contentBlock = document.getElementById('result-window__content')

const scoreElement = document.getElementById('game__result-window__score')
const correctAnswersElement = document.getElementById('game__result-window__correct-answers')
const wrongAnswersElement = document.getElementById('game__result-window__wrong-answers')

const gameTryAgainButton = document.getElementById('game__result-window__try-again')
const gameRecordsButton = document.getElementById('game__result-window__records')
const gameMenuButton = document.getElementById('game__result-window__menu')

//const scoreElements = [scoreElement, correctAnswersElement, wrongAnswersElement]

const openResultWindow = score => {
    resetTimer()
    resultWindow.classList.add('active')
    scoreElement.textContent = score.score
    correctAnswersElement.textContent = score.correctAnswers
    wrongAnswersElement.textContent = score.wrongAnswers
    setUserRecord(mode, getUsername(), getScore().score)
}

const closeResultWindow = () => {
    resultWindow.classList.remove('active')
    resetPracticeScore()
    scoreElement.textContent = ''
    correctAnswersElement.textContent = ''
    wrongAnswersElement.textContent = ''
}

resultWindow.addEventListener('click', e => {
    e.stopPropagation()
})
resultWindow.addEventListener('keypress', e => {
    e.stopPropagation()
})


gameTryAgainButton.addEventListener('click', () => {
    closeResultWindow()
    const question = getSimpleQuestion()
    setFirstQuestion(question)
    renderTask(question)
    closePage(GAME_PAGE_ID)
    if(mode === 'game') openPracticePage()
    if(mode === 'attack') openAttackPage()
})
gameMenuButton.addEventListener('click', () => {
    closeResultWindow()
    openMainPage()
})
gameRecordsButton.addEventListener('click', () => {
    openRecords(mode)
})
;// CONCATENATED MODULE: ./src/components/stopGameButton/stopGameButton.js




const stopGameButton_practiceButton = document.getElementById('game__stop-game-button')

stopGameButton_practiceButton.addEventListener('click', () => {
    openResultWindow(getPracticeScore())
})
;// CONCATENATED MODULE: ./src/pages/game/game.js






const gameTask = document.getElementById('game__task')

const firstNumberElement = document.getElementById('game__first-number')
const secondNumberElement = document.getElementById('game__second-number')
const operatorElement = document.getElementById('game__operator')
const equalsElement = document.getElementById('game__equals')
const practiceInput = document.getElementById('game__input')

const answerButton = document.getElementById('game__answer-button')

const correctAnswerElement = document.getElementById('game__correct-answer')
const wrongAnswerElement = document.getElementById('game__wrong-answer')

const game_scoreElement = document.getElementById('game__score__game')

let mode = 'practice'

const setMode = (type) => {
    mode = type
}

const renderTask = (question) => {
    firstNumberElement.textContent = question.firstNumber.toString()
    operatorElement.textContent = question.operator
    secondNumberElement.textContent = question.secondNumber.toString()
    equalsElement.textContent = '='
    practiceInput.value = ''
}

function setFirstQuestion(q){
    question = q
}

let gameStarted = false
let question = getSimpleQuestion()
let score = 0
let correctAnswers = 0
let wrongAnswers = 0

practiceInput.focus()

answerButton.addEventListener("click", answerToQuestion)
practiceInput.addEventListener("keypress", e => {
    if(e.key === 'Enter'){
        e.preventDefault()
        answerButton.click()
    }
})


function addPoint() {
    function removeElement(){
        correctAnswerElement.classList.remove('active')
        correctAnswerElement.removeEventListener('click', removeElement)
    }
    correctAnswerElement.classList.add('active')
    correctAnswerElement.addEventListener('animationend', removeElement)
    score++
    correctAnswers++
    game_scoreElement.textContent = `score: ${score}`
}

function removePoint() {
    function removeElement(){
        wrongAnswerElement.classList.remove('active')
        game_scoreElement.classList.remove('wrong')
        wrongAnswerElement.removeEventListener('click', removeElement)
        game_scoreElement.removeEventListener('click', removeElement)
    }
    wrongAnswerElement.classList.add('active')
    game_scoreElement.classList.add('wrong')
    wrongAnswerElement.addEventListener('animationend', removeElement)
    game_scoreElement.addEventListener('animationend', removeElement)
    score--
    wrongAnswers++
    game_scoreElement.textContent = `score: ${score}`
}

function resetPracticeScore(){
    gameStarted = false
    score = 0
    wrongAnswers = 0
    correctAnswers = 0
    game_scoreElement.textContent = `score: ${score}`
}

function getPracticeScore(){
    return {
        score,
        correctAnswers,
        wrongAnswers
    }
}

function getScore(){
    return {
        score,
        correctAnswers,
        wrongAnswers
    }
}

function answerToQuestion(){
    function createTask(){
        gameTask.classList.remove('remove')
        gameTask.classList.add('create')
        gameTask.removeEventListener('animationend', createTask)
    }
    if(!gameStarted && mode === 'attack'){
        runTimer()
        gameStarted = true
    }

    if(practiceInput.value === question.answer.toString()) {
        addPoint(score)
    } else {
        removePoint(score)
    }
    gameTask.classList.remove('create')
    gameTask.classList.add('remove')
    gameTask.addEventListener('animationend', createTask)
    practiceInput.value = ''
    practiceInput.focus()
    question = getSimpleQuestion()
    renderTask(question)
}

;// CONCATENATED MODULE: ./src/components/modal/signIn/signIn.js



const signInWindow = document.getElementById('sign-in__window')
const signInContent = document.getElementById('sign-in__content')
const signInInput = document.getElementById('sign-in__input')
const signInContinueButton = document.getElementById('sign-in__continue-button')
const closeButton = document.getElementById('sign-in__close')

const openModal = () => {
    signInWindow.classList.add('active')
}

const closeModal = () => {
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

closeButton.addEventListener('click', closeModal)

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


;// CONCATENATED MODULE: ./src/components/auth/auth.js





const authBlockSignIn = (username) => {
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

function setAuthButtonContent(currentPage){
    if(currentPage === MAIN_PAGE_ID){
        authButtons.forEach(elem => {
            elem.textContent = isAuth() ? getUsername() : 'login'
        })
    }
    if(currentPage === GAME_PAGE_ID){
        authButtons.forEach(elem => {
            elem.textContent = isAuth() ? getUsername() : ''
        })
    }
}

function disableAuthButton(){
    authButtons.forEach(button => {
        button.disabled = true
    })
}

function enableAuthButton(){
    authButtons.forEach(button => {
        button.disabled = false
    })
}


;// CONCATENATED MODULE: ./src/entries/index/index.js




const MAIN_PAGE_ID = 'main-page'
const GAME_PAGE_ID = 'game-page'

const pages = [MAIN_PAGE_ID, GAME_PAGE_ID]
let currentPage = MAIN_PAGE_ID
;








openMainPage()

function openMainPage(){
    pages.forEach(id => {
        closePage(id)
    })
    enableAuthButton()
    currentPage = MAIN_PAGE_ID
    setAuthButtonContent(currentPage)
    openPage(MAIN_PAGE_ID)
}
function openPracticePage(){
    if(isAuth()) {
        pages.forEach(id => {
            closePage(id)
        })
        setMode('practice')
        disableAuthButton()
        currentPage = GAME_PAGE_ID
        setAuthButtonContent(currentPage)
        openPage(GAME_PAGE_ID)
        const question = getSimpleQuestion()
        setFirstQuestion(question)
        renderTask(question)
    }
    else {
        openModal()
    }
}

function openAttackPage(){
    if(isAuth()) {
        pages.forEach(id => {
            closePage(id)
        })
        setMode('attack')
        disableAuthButton()
        currentPage = GAME_PAGE_ID
        setAuthButtonContent(currentPage)
        openPage(GAME_PAGE_ID)
        const question = getSimpleQuestion()
        setFirstQuestion(question)
        renderTask(question)
    }
    else {
        openModal()
    }
}

function openPage(id){
    document.getElementById(id).style.display = 'block'
}
function closePage(id){
    document.getElementById(id).style.display = 'none'
}



/******/ })()
;