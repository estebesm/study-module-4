import './attack.scss'
import '../../components/timer/timer'
import '../../components/resultWindow/resultWindow'
import '../game'

import {runTimer} from "../../components/timer/timer";

let isGameStarted = false

const startButton = document.getElementById('attack__answer-button')

startButton.onclick = () => {
    if(!isGameStarted){
        isGameStarted = true
        runTimer()
    }

}

export const finishGame = () => {
    isGameStarted = false
}



