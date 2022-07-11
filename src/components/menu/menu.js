import './menu.scss'
import './mainMenu/mainMenu.js'

const MAIN_MENU_ID = 'main__menu'

const menuItems = [MAIN_MENU_ID]

let mainMenu = MAIN_MENU_ID

menuItems.forEach(menu => {
    if(menu === mainMenu){
        enableMenu(menu)
    }
    else {
        disableMenu(menu)
    }
})

export function disableMenu(menuId){
    document.getElementById(menuId).classList.add("disabled")
}
export function enableMenu(menuId){
    document.getElementById(menuId).classList.remove("disabled")
}





