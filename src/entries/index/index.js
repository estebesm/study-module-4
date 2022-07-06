import '../../styles/style.scss'
import './index.scss'

export const MAIN_PAGE_ID = 'main-page'
export const PRACTICE_PAGE_ID = 'practice-page'
export const ATTACK_PAGE_ID = 'attack-page'

const pages = [MAIN_PAGE_ID, PRACTICE_PAGE_ID, ATTACK_PAGE_ID]

import '../../pages/main/main'
import '../../pages/practice/practice'
import '../../pages/attack/attack'
import '../../components/auth/auth'

openMainPage()

export function openMainPage(){
    pages.forEach(id => {
        closePage(id)
    })
    openPage(MAIN_PAGE_ID)
}
export function openPracticePage(){
    pages.forEach(id => {
        closePage(id)
    })
    openPage(PRACTICE_PAGE_ID)
}
export function openAttackPage() {
    pages.forEach(id => {
        closePage(id)
    })
    openPage(ATTACK_PAGE_ID)
}

function openPage(id){
    document.getElementById(id).style.display = 'block'
}
export function closePage(id){
    document.getElementById(id).style.display = 'none'
}


