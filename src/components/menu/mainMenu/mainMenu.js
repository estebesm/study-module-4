import {openAttackPage, openPracticePage} from "../../../entries/index";

const practiceButton = document.getElementById('main__menu__practice')
const startButton = document.getElementById('main__menu__start')

practiceButton.addEventListener('click', openPracticePage)
startButton.addEventListener('click', openAttackPage)
