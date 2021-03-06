import './timer.scss'
import {openResultWindow} from "../resultWindow/resultWindow";
import {getScore} from "../../pages/game/game";

const countdownEl = document.querySelector('.countdown');
const countdownNumberEl = document.querySelector('.countdown-number');
let countdown = 90;

export const resetTimer = () => {
    countdown = 90
    countdownNumberEl.textContent = countdown
}

export const runTimer = () => {
    const practiceButton = document.getElementById('game__stop-game-button')
    countdownEl.classList.add('active')
    countdownNumberEl.textContent = countdown.toString();
    const interval = setInterval(function () {
        if(countdown<=0){
            disableTimer()
            openResultWindow(getScore())
            countdown = 90
        }
        else {
            countdown--
            countdownNumberEl.textContent = countdown.toString();
        }
    }, 1000);

    practiceButton.addEventListener('click', disableTimer)

    function disableTimer() {
        countdownEl.classList.remove('active')
        clearInterval(interval)
    }
}