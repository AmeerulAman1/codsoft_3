document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    let currentInput = '';
    let previousInput = '';
    let operator = '';

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const action = button.getAttribute('data-action');

            if (!isNaN(action) || action === 'dot') {
                handleNumber(action);
            } else if (action === 'clear') {
                clearDisplay();
            } else if (action === 'backspace') {
                handleBackspace();
            } else if (action === 'calculate') {
                calculate();
            } else {
                handleOperator(action);
            }
            updateDisplay();
        });
    });

    function handleNumber(num) {
        if (num === 'dot' && currentInput.includes('.')) return;
        currentInput += num === 'dot' ? '.' : num;
    }

    function clearDisplay() {
        currentInput = '';
        previousInput = '';
        operator = '';
    }

    function handleBackspace() {
        currentInput = currentInput.slice(0, -1);
    }

    function handleOperator(op) {
        if (currentInput === '') return;
        if (previousInput !== '') {
            calculate();
        }
        operator = op;
        previousInput = currentInput;
        currentInput = '';
    }

    function calculate() {
        let result;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);

        if (isNaN(prev) || isNaN(current)) return;

        switch (operator) {
            case 'add':
                result = prev + current;
                break;
            case 'subtract':
                result = prev - current;
                break;
            case 'multiply':
                result = prev * current;
                break;
            case 'divide':
                result = prev / current;
                break;
            default:
                return;
        }

        currentInput = result.toString();
        operator = '';
        previousInput = '';
    }

    function updateDisplay() {
        display.textContent = currentInput || '0';
    }
});
