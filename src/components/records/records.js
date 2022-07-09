import './records.scss'
import {getRecordsList} from "../../functions/localStorage";

const recordsElement = document.querySelector('.records')
const closeElement = document.querySelector('.records__close')
const recordsTable = document.querySelector('.records__table')


export const openRecords = (mode = 'attack') => {
    recordsElement.classList.add('active')
    renderTable(mode)
}

export const closeRecords = () => {
    recordsElement.classList.remove('active')
    clearTable()
}

closeElement.addEventListener('click', closeRecords)

function renderTable(mode = 'attack'){
    const records = getRecordsList()
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