import './stopGameButton.scss'
import {openResultWindow} from "../resultWindow/resultWindow";
import {getPracticeScore, getScore, mode} from "../../pages/practice/practice";
import {getRecordsList, getUsername, setUserRecord} from "../../functions/localStorage";

const practiceButton = document.getElementById('practice__stop-game-button')

practiceButton.addEventListener('click', () => {
    openResultWindow(getPracticeScore())
})