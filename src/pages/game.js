import '../components/stopGameButton/stopGameButton'
import '../components/resultWindow/resultWindow'
import {getSimpleQuestion} from "../functions/generateSimpleQuestion";

const tasks = document.querySelectorAll('.task')

const firstNumberElements = document.querySelectorAll('.first-number')
const secondNumberElements = document.querySelectorAll('.second-number')
const operatorElements = document.querySelectorAll('.operator')
const equalsElements = document.querySelectorAll('.equals')
const taskInputs = document.querySelectorAll('.task__input')

const answerButtons = document.querySelectorAll('.answer-button')

const correctAnswerElements = document.querySelectorAll('.correct-answer')
const wrongAnswerElements = document.querySelectorAll('.wrong-answer')

const scoreElements = document.querySelectorAll('.score')

const renderTask = (question) => {
    firstNumberElements.forEach(elem => elem.textContent = question.firstNumber.toString())
    operatorElements.forEach(elem => elem.textContent = question.operator)
    secondNumberElements.forEach(elem => elem.textContent = question.secondNumber.toString())
    equalsElements.forEach(elem => elem.textContent = '=')
}

let question = getSimpleQuestion()
let score = 0
let correctAnswers = 0
let wrongAnswers = 0

renderTask(question)

answerButtons.forEach( elem => elem.addEventListener("click", () => {

    const isAnswerCorrect = Array
        .from(taskInputs)
        .find(elem => elem.value === question.answer.toString())

    if(isAnswerCorrect) {
        addPoint(score)
    } else {
        removePoint(score)
    }
    tasks.forEach(elem => elem.classList.remove('create'))
    tasks.forEach(elem => elem.classList.add('remove'))
    setTimeout(() => {
        tasks.forEach(elem => elem.classList.remove('remove'))
        tasks.forEach(elem => elem.classList.add('create'))
    }, 250)
    taskInputs.forEach(elem => elem.value = '')
    taskInputs.forEach(elem => elem.focus())
    question = getSimpleQuestion()
    renderTask(question)
}))

function addPoint() {
    correctAnswerElements.forEach(elem => elem.classList.add('active'))
    setTimeout(() => {
        correctAnswerElements.forEach(elem => elem.classList.remove('active'))
    }, 500)
    score++
    correctAnswers++
    scoreElements.forEach(elem => elem.textContent = `score: ${score}`)
}

function removePoint() {
    wrongAnswerElements.forEach(elem => elem.classList.add('active'))
    scoreElements.forEach(elem => elem.classList.add('wrong'))
    setTimeout(() => {
        wrongAnswerElements.forEach(elem => elem.classList.remove('active'))
        scoreElements.forEach(elem => elem.classList.remove('wrong'))
    }, 500)
    score--
    wrongAnswers++
    scoreElements.forEach(elem => elem.textContent = `score: ${score}`)
}

export function resetPracticeScore(){
    score = 0
    wrongAnswers = 0
    correctAnswers = 0
    scoreElements.forEach(elem => elem.textContent = `score: ${score}`)
}

export function getPracticeScore(){
    return {
        score,
        correctAnswers,
        wrongAnswers
    }
}