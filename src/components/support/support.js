import './support.scss'

const supportModals = document.querySelectorAll('.support__content')
const openButtons = document.querySelectorAll('.support__button')
const closeButtons = document.querySelectorAll('.support__close-button')

export const openSupportModal = (e) => {
    e.stopPropagation()
    document.body.style.overflow = 'hidden'
    supportModals.forEach(elem => {
        elem.classList.add('active')
    })
}

export const closeSupportModal = () => {
    document.body.style.overflow = 'visible'
    supportModals.forEach(elem => {
        elem.classList.remove('active')
    })
}

openButtons.forEach(button => {
    button.addEventListener('click', e => openSupportModal(e))
})

closeButtons.forEach(button => {
    button.addEventListener('click', closeSupportModal)
})