import './resultWindow.scss'
import {closePage, openMainPage, openPracticePage, PRACTICE_PAGE_ID} from "../../entries/index";
import {resetPracticeScore} from "../../pages/practice/practice";

const resultWindow = document.getElementById('result-window')
const contentBlock = document.getElementById('result-window__content')

const scoreElement = document.getElementById('practice__result-window__score')
const correctAnswersElement = document.getElementById('practice__result-window__correct-answers')
const wrongAnswersElement = document.getElementById('practice__result-window__wrong-answers')

const practiceTryAgainButton = document.getElementById('practice__result-window__try-again')
const practiceRecordsButton = document.getElementById('practice__result-window__records')
const practiceMenuButton = document.getElementById('practice__result-window__menu')

//const scoreElements = [scoreElement, correctAnswersElement, wrongAnswersElement]

export const openResultWindow = score => {
    resultWindow.classList.add('active')
    scoreElement.textContent = score.score
    correctAnswersElement.textContent = score.correctAnswers
    wrongAnswersElement.textContent = score.wrongAnswers
}

export const closeResultWindow = () => {
    resultWindow.classList.remove('active')
    resetPracticeScore()
    scoreElement.textContent = ''
    correctAnswersElement.textContent = ''
    wrongAnswersElement.textContent = ''
}

resultWindow.addEventListener('click', closeResultWindow)
contentBlock.addEventListener('click', e => {
    e.stopPropagation()
})

practiceTryAgainButton.addEventListener('click', () => {
    closeResultWindow()
    closePage(PRACTICE_PAGE_ID)
    openPracticePage()
})
practiceMenuButton.addEventListener('click', () => {
    closeResultWindow()
    openMainPage()
})