import './stopGameButton.scss'
import {openResultWindow} from "../resultWindow/resultWindow";
import {getPracticeScore} from "../../pages/game/game";

const practiceButton = document.getElementById('game__stop-game-button')

practiceButton.addEventListener('click', () => {
    openResultWindow(getPracticeScore())
})