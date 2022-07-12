import './game.scss'
import '../../components/stopGameButton/stopGameButton'
import '../../components/resultWindow/resultWindow'
import {getSimpleQuestion} from "../../functions/generateSimpleQuestion";
import {runTimer} from "../../components/timer/timer";

const gameTask = document.getElementById('game__task')

const firstNumberElement = document.getElementById('game__first-number')
const secondNumberElement = document.getElementById('game__second-number')
const operatorElement = document.getElementById('game__operator')
const equalsElement = document.getElementById('game__equals')
const practiceInput = document.getElementById('game__input')

const answerButton = document.getElementById('game__answer-button')

const correctAnswerElement = document.getElementById('game__correct-answer')
const wrongAnswerElement = document.getElementById('game__wrong-answer')

const scoreElement = document.getElementById('game__score__game')

export let mode = 'practice'

export const setMode = (type) => {
    mode = type
}

export const renderTask = (question) => {
    firstNumberElement.textContent = question.firstNumber.toString()
    operatorElement.textContent = question.operator
    secondNumberElement.textContent = question.secondNumber.toString()
    equalsElement.textContent = '='
    practiceInput.value = ''
}

export function setFirstQuestion(q){
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
    scoreElement.textContent = `score: ${score}`
}

function removePoint() {
    function removeElement(){
        wrongAnswerElement.classList.remove('active')
        scoreElement.classList.remove('wrong')
        wrongAnswerElement.removeEventListener('click', removeElement)
        scoreElement.removeEventListener('click', removeElement)
    }
    wrongAnswerElement.classList.add('active')
    scoreElement.classList.add('wrong')
    wrongAnswerElement.addEventListener('animationend', removeElement)
    scoreElement.addEventListener('animationend', removeElement)
    score--
    wrongAnswers++
    scoreElement.textContent = `score: ${score}`
}

export function resetPracticeScore(){
    gameStarted = false
    score = 0
    wrongAnswers = 0
    correctAnswers = 0
    scoreElement.textContent = `score: ${score}`
}

export function getPracticeScore(){
    return {
        score,
        correctAnswers,
        wrongAnswers
    }
}

export function getScore(){
    return {
        score,
        correctAnswers,
        wrongAnswers
    }
}

export function answerToQuestion(){
    function createTask(){
        gameTask.classList.remove('remove')
        practiceInput.value = ''
        practiceInput.focus()
        question = getSimpleQuestion()
        renderTask(question)
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
}
