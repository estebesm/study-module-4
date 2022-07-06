import './stopGameButton.scss'
import {openResultWindow} from "../resultWindow/resultWindow";
import {getPracticeScore} from "../../pages/practice/practice";

const practiceButton = document.getElementById('practice__stop-game-button')

practiceButton.addEventListener('click', () => openResultWindow(getPracticeScore()))