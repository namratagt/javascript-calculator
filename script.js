class Calculator{
    constructor(previousopearndTextElement,currentopearndTextElement){
        this.previousopearndTextElement = previousopearndTextElement
        this.currentopearndTextElement = currentopearndTextElement
        this.clear()
    }



    clear(){
        this.currentoperand = ''
        this.previousoperand = ''
        this.operation = undefined
    }

    delete(){
        this.currentoperand = this.currentoperand.toString().slice(0, -1)
    }

    appendnumber(number){
        if(number === '.' && this.currentoperand.includes('.')) return
        this.currentoperand = this.currentoperand.toString() + number.toString()
    }

    chooseoperation(operation){
        if(this.currentoperand === '')return
        if(this.previousoperand !== ''){
            this.compute()
        }
        this.operation = operation
        this.previousoperand = this.currentoperand
        this.currentoperand = ''
    }

    compute(){
        let computation 
        const prev = parseFloat(this.previousoperand)
        const current = parseFloat(this.currentoperand)
        if(isNaN(prev) || isNaN(current))return
        switch(this.operation){
            case '+':
                computation = prev + current
                break

            case '-':
                computation = prev - current
                break

            case '×':
                computation = prev * current
                break

            case '÷':
                computation = prev / current
                break
            default:
                return
        }
        this.currentoperand = computation
        this.operation = undefined
        this.previousoperand = ''

    }

    getdisplaynumber(number){
        const stringnumber = number.toString()
        const integerdigits = parseFloat(stringnumber.split('.')[0])
        const decimaldigits = stringnumber.split('.')[1]
        let integerdisplay
        if(isNaN(integerdigits)){
            integerdisplay = ''
        }
        else{
            integerdisplay = integerdigits.toLocaleString('en',{maximumFractionDigits: 0})
        }
        if(decimaldigits != null){
            return `${integerdisplay}.${(decimaldigits)}`
        }else{
            return integerdisplay
        }
    }

    updatedisplay(){
        this.currentopearndTextElement.innerText = this.getdisplaynumber(this.currentoperand)
        if(this.operation != null){
            this.previousopearndTextElement.innerText = `${this.getdisplaynumber(this.previousoperand)} ${(this.operation)}`
        }else{
            this.previousopearndTextElement.innerText = ''
        }   
    }

}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement,currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendnumber(button.innerText)
        calculator.updatedisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseoperation(button.innerText)
        calculator.updatedisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updatedisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updatedisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updatedisplay()
})