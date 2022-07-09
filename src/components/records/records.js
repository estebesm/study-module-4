import './records.scss'
import {getRecordsList} from "../../functions/localStorage";

const recordsElement = document.querySelector('.records')
const closeElement = document.querySelector('.records__close')
const recordsTable = document.querySelector('.records__table')

const practiceButton = document.getElementById('records__practice__button')
const attackButton = document.getElementById('records__attack__button')

export const openRecords = (mode = 'attack') => {
    if(mode === 'attack') attackButton.classList.add('selected')
    if(mode === 'practice') practiceButton.classList.add('selected')
    recordsElement.classList.add('active')
    renderTable(mode)
}

export const closeRecords = () => {
    recordsElement.classList.remove('active')
}

closeElement.addEventListener('click', closeRecords)
practiceButton.addEventListener('click', () => {
    attackButton.classList.remove('selected')
    practiceButton.classList.add('selected')
    renderTable('practice')
})
attackButton.addEventListener('click', () => {
    practiceButton.classList.remove('selected')
    attackButton.classList.add('selected')
    renderTable('attack')
})

function renderTable(mode = 'attack'){
    clearTable()
    const records = getRecordsList(mode)
    records.forEach((record, index) => {
        let liLast = document.createElement('li');
        liLast.innerHTML =
            `<div class="table__item__name">${index+1}. ${record.username}</div>
             <div class="table__item__value">${record.result}</div>`
        recordsTable.append(liLast);
    })
}

function clearTable(){
    recordsTable.innerHTML = null
}