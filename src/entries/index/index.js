import '../../styles/style.scss'
import './index.scss'
import '../../components/records/records'

export const MAIN_PAGE_ID = 'main-page'
export const PRACTICE_PAGE_ID = 'practice-page'

const pages = [MAIN_PAGE_ID, PRACTICE_PAGE_ID]
export let currentPage = MAIN_PAGE_ID

import '../../pages/main/main'
import '../../pages/practice/practice'
import '../../components/auth/auth'
import {setMode} from "../../pages/practice/practice";
import {runTimer} from "../../components/timer/timer";
import {disableAuthButton, enableAuthButton, setAuthButtonContent} from "../../components/auth/auth";
import {isAuth} from "../../functions/localStorage";
import {openModal} from "../../components/modal/signIn/signIn";

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
    pages.forEach(id => {
        closePage(id)
    })
    setMode('practice')
    disableAuthButton()
    currentPage = PRACTICE_PAGE_ID
    setAuthButtonContent(currentPage)
    openPage(PRACTICE_PAGE_ID)
}

export function openAttackPage(){
    if(isAuth()) {
        pages.forEach(id => {
            closePage(id)
        })
        setMode('attack')
        disableAuthButton()
        currentPage = PRACTICE_PAGE_ID
        setAuthButtonContent(currentPage)
        openPage(PRACTICE_PAGE_ID)
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


