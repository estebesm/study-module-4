import './resultWindow.scss'
import {closePage, openAttackPage, openMainPage, openPracticePage, GAME_PAGE_ID} from "../../entries/index";
import {getScore, mode, renderTask, resetPracticeScore, setFirstQuestion} from "../../pages/game/game";
import {getUsername, setUserRecord} from "../../functions/localStorage";
import {openRecords} from "../records/records";
import {getSimpleQuestion} from "../../functions/generateSimpleQuestion";
import {resetTimer} from "../timer/timer";

const resultWindow = document.getElementById('result-window')
//const contentBlock = document.getElementById('result-window__content')

const scoreElement = document.getElementById('game__result-window__score')
const correctAnswersElement = document.getElementById('game__result-window__correct-answers')
const wrongAnswersElement = document.getElementById('game__result-window__wrong-answers')

const gameTryAgainButton = document.getElementById('game__result-window__try-again')
const gameRecordsButton = document.getElementById('game__result-window__records')
const gameMenuButton = document.getElementById('game__result-window__menu')

//const scoreElements = [scoreElement, correctAnswersElement, wrongAnswersElement]

export const openResultWindow = score => {
    resetTimer()
    resultWindow.classList.add('active')
    scoreElement.textContent = score.score
    correctAnswersElement.textContent = score.correctAnswers
    wrongAnswersElement.textContent = score.wrongAnswers
    setUserRecord(mode, getUsername(), getScore().score)
}

export const closeResultWindow = () => {
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