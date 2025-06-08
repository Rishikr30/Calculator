 document.addEventListener('DOMContentLoaded', function() {
            const calculationDisplay = document.querySelector('.calculation');
            const currentValueDisplay = document.querySelector('.current-value');
            const numberButtons = document.querySelectorAll('.number');
            const operatorButtons = document.querySelectorAll('.operator');
            const equalsButton = document.querySelector('.equals');
            const clearButton = document.querySelector('.clear');
            const deleteButton = document.querySelector('.delete');
            
            let currentInput = '0';
            let calculationString = '';
            let lastOperator = '';
            let calculationDone = false;
            
            // Update the display
            function updateDisplay() {
                currentValueDisplay.textContent = currentInput;
                calculationDisplay.textContent = calculationString;
            }
            
            // Add event listeners to number buttons
            numberButtons.forEach(button => {
                button.addEventListener('click', () => {
                    if (calculationDone) {
                        currentInput = '0';
                        calculationString = '';
                        calculationDone = false;
                    }
                    
                    const value = button.textContent;
                    
                    // Handle decimal point
                    if (value === '.' && currentInput.includes('.')) {
                        return;
                    }
                    
                    // Replace 0 if it's the only digit
                    if (currentInput === '0' && value !== '.') {
                        if (value === '00') {
                            currentInput = '0';
                        } else {
                            currentInput = value;
                        }
                    } else {
                        currentInput += value;
                    }
                    
                    updateDisplay();
                });
            });
            
            // Add event listeners to operator buttons
            operatorButtons.forEach(button => {
                button.addEventListener('click', () => {
                    if (calculationDone) {
                        calculationString = currentInput;
                        calculationDone = false;
                    }
                    
                    const operator = button.textContent;
                    
                    if (currentInput !== '0' || calculationString !== '') {
                        if (lastOperator && currentInput === '0') {
                            // Replace the last operator
                            calculationString = calculationString.slice(0, -1) + operator;
                        } else {
                            calculationString += currentInput + ' ' + operator + ' ';
                            currentInput = '0';
                        }
                        
                        lastOperator = operator;
                    }
                    
                    updateDisplay();
                });
            });
            
            // Add event listener to equals button
            equalsButton.addEventListener('click', () => {
                if (currentInput === '0' && calculationString === '') {
                    return;
                }
                
                try {
                    // Prepare the calculation string
                    let calculation = calculationString + currentInput;
                    
                    // Replace operators with JavaScript operators
                    calculation = calculation.replace(/×/g, '*').replace(/÷/g, '/').replace(/%/g, '/100*');
                    
                    // Evaluate the calculation
                    const result = eval(calculation);
                    
                    // Format the result
                    currentInput = Number.isInteger(result) ? result.toString() : result.toFixed(8).replace(/\.?0+$/, '');
                    calculationString += currentInput + ' = ';
                    calculationDone = true;
                    
                    updateDisplay();
                } catch (error) {
                    currentInput = 'Error';
                    calculationDone = true;
                    updateDisplay();
                }
            });
            
            // Add event listener to clear button
            clearButton.addEventListener('click', () => {
                currentInput = '0';
                calculationString = '';
                lastOperator = '';
                calculationDone = false;
                updateDisplay();
            });
            
            // Add event listener to delete button
            deleteButton.addEventListener('click', () => {
                if (calculationDone) {
                    currentInput = '0';
                    calculationString = '';
                    calculationDone = false;
                } else {
                    currentInput = currentInput.slice(0, -1);
                    if (currentInput === '') {
                        currentInput = '0';
                    }
                }
                updateDisplay();
            });
        });