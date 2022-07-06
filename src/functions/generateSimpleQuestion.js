const MINUS_OPERATOR = '-'
const PLUS_OPERATOR = '+'
const MULTIPLICATION_OPERATOR = '*'
const DIVIDING_OPERATOR = '/'

const operators = [MINUS_OPERATOR, PLUS_OPERATOR, DIVIDING_OPERATOR, MULTIPLICATION_OPERATOR]

export function getRandomOperatorIndex(){
    return Math.floor(Math.random() * operators.length)
}

export function generateSimpleNumber(max= 10){
    return Math.floor(Math.random() * max)
}

export function getQuestionsNumbers(operator){
    const x = generateSimpleNumber()
    const y = generateSimpleNumber()
    if(operator === MINUS_OPERATOR){
        return {
            firstNumber: x,
            secondNumber: y,
            answer: x - y
        }
    }
    if(operator === PLUS_OPERATOR){
        return {
            firstNumber: x,
            secondNumber: y,
            answer: x + y
        }
    }
    if(operator === DIVIDING_OPERATOR){
        return {
            firstNumber: (x+1) * y,
            secondNumber: x+1,
            answer: y
        }
    }
    if(operator === MULTIPLICATION_OPERATOR){
        return {
            firstNumber: x,
            secondNumber: y,
            answer: x * y
        }
    }
}


export function getSimpleQuestion(){
    const operatorIndex = getRandomOperatorIndex()
    const numbers = getQuestionsNumbers(operators[operatorIndex])
    return {
        ...numbers,
        operator: operators[operatorIndex]
    }
}