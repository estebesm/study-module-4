import './attack.scss'
import {getSimpleQuestion} from "../../functions/generateSimpleQuestion";

const attackTask = document.getElementById('attack__task')

const firstNumberElement = document.getElementById('attack__first-number')
const secondNumberElement = document.getElementById('attack__second-number')
const operatorElement = document.getElementById('attack__operator')
const equalsElement = document.getElementById('attack__equals')
const attackInput = document.getElementById('attack__input')

const answerButton = document.getElementById('attack__answer-button')

const correctAnswerElement = document.getElementById('attack__correct-answer')
const wrongAnswerElement = document.getElementById('attack__wrong-answer')

const scoreElement = document.getElementById('attack__score')


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
    if(attackInput.value === question.answer.toString()) {
        addPoint(score)
    } else {
        removePoint(score)
    }
    attackTask.classList.remove('create')
    attackTask.classList.add('remove')
    setTimeout(() => {
        attackTask.classList.remove('remove')
        attackTask.classList.add('create')
    }, 250)
    attackInput.value = ''
    attackInput.focus()
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