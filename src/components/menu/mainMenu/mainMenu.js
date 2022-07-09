import {openAttackPage, openPracticePage} from "../../../entries/index";
import {openRecords} from "../../records/records";

const practiceButton = document.getElementById('main__menu__practice')
const startButton = document.getElementById('main__menu__start')
const recordsButton = document.getElementById('main__menu__records')

practiceButton.addEventListener('click', openPracticePage)
startButton.addEventListener('click', openAttackPage)
recordsButton.addEventListener('click', openRecords)
