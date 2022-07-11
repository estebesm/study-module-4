import '../../styles/style.scss'
import './index.scss'
import '../../components/records/records'

export const MAIN_PAGE_ID = 'main-page'
export const GAME_PAGE_ID = 'game-page'

const pages = [MAIN_PAGE_ID, GAME_PAGE_ID]
export let currentPage = MAIN_PAGE_ID
import '../../pages/main/main'
import '../../pages/game/game'
import '../../components/auth/auth'
import {renderTask, setFirstQuestion, setMode} from "../../pages/game/game";
import {disableAuthButton, enableAuthButton, setAuthButtonContent} from "../../components/auth/auth";
import {isAuth} from "../../functions/localStorage";
import {openModal} from "../../components/modal/signIn/signIn";
import {getSimpleQuestion} from "../../functions/generateSimpleQuestion";

openMainPage()

export function openMainPage(){
    pages.forEach(id => {
        closePage(id)
    })
    enableAuthButton()
    currentPage = MAIN_PAGE_ID
    setAuthButtonContent(currentPage)
    openPage(MAIN_PAGE_ID)
}
export function openPracticePage(){
    if(isAuth()) {
        pages.forEach(id => {
            closePage(id)
        })
        setMode('practice')
        disableAuthButton()
        currentPage = GAME_PAGE_ID
        setAuthButtonContent(currentPage)
        openPage(GAME_PAGE_ID)
        const question = getSimpleQuestion()
        setFirstQuestion(question)
        renderTask(question)
    }
    else {
        openModal()
    }
}

export function openAttackPage(){
    if(isAuth()) {
        pages.forEach(id => {
            closePage(id)
        })
        setMode('attack')
        disableAuthButton()
        currentPage = GAME_PAGE_ID
        setAuthButtonContent(currentPage)
        openPage(GAME_PAGE_ID)
        const question = getSimpleQuestion()
        setFirstQuestion(question)
        renderTask(question)
    }
    else {
        openModal()
    }
}

function openPage(id){
    document.getElementById(id).style.display = 'block'
}
export function closePage(id){
    document.getElementById(id).style.display = 'none'
}


