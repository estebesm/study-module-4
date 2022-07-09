import './practice.scss'
import '../../components/stopGameButton/stopGameButton'
import '../../components/resultWindow/resultWindow'
import {getSimpleQuestion} from "../../functions/generateSimpleQuestion";
import {runTimer} from "../../components/timer/timer";

const practiceTask = document.getElementById('practice__task')

const firstNumberElement = document.getElementById('practice__first-number')
const secondNumberElement = document.getElementById('practice__second-number')
const operatorElement = document.getElementById('practice__operator')
const equalsElement = document.getElementById('practice__equals')
const practiceInput = document.getElementById('practice__input')

const answerButton = document.getElementById('practice__answer-button')

const correctAnswerElement = document.getElementById('practice__correct-answer')
const wrongAnswerElement = document.getElementById('practice__wrong-answer')

const scoreElement = document.getElementById('practice__score__game')

export let mode = 'practice'

export const setMode = (type) => {
    mode = type
}

const renderTask = (question) => {
    firstNumberElement.textContent = question.firstNumber.toString()
    operatorElement.textContent = question.operator
    secondNumberElement.textContent = question.secondNumber.toString()
    equalsElement.textContent = '='
}

let gameStarted = false
let question = getSimpleQuestion()
let score = 0
let correctAnswers = 0
let wrongAnswers = 0

renderTask(question)
practiceInput.focus()

answerButton.addEventListener("click", answerToQuestion)
practiceInput.addEventListener("keypress", e => {
    if(e.key === 'Enter'){
        e.preventDefault()
        answerButton.click()
    }
})


function addPoint() {
    correctAnswerElement.classList.add('active')
    setTimeout(() => {
        correctAnswerElement.classList.remove('active')
    }, 500)
    score++
    correctAnswers++
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
    if(!gameStarted){
        runTimer()
        gameStarted = true
    }

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
}
