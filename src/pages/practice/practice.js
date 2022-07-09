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
        practiceTask.classList.remove('remove')
        practiceTask.classList.add('create')
        practiceTask.removeEventListener('animationend', createTask)
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
    practiceTask.classList.remove('create')
    practiceTask.classList.add('remove')
    practiceTask.addEventListener('animationend', createTask)
    practiceInput.value = ''
    practiceInput.focus()
    question = getSimpleQuestion()
    renderTask(question)
}
