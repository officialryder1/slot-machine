// 1. Deposit some money
// 2. Determine number of line to  bet
// 3. Collect bet amount
// 4. Spin slot machine
// 5. Check if user won
// 6. Give user their winnings
// 7. Play again.

// function deposit(){

// }

// Deposit some money

const prompt = require("prompt-sync")();

// slot machine details
const ROWS = 3;
const COLS = 3

const SYMBOLS_COUNT = {
    "A": 2,
    "B": 4,
    "C": 6,
    'D': 8,
}

const SYMBOLS_VALUES = {
    'A': 5,
    'B': 4,
    'C': 3,
    'D': 2
}

const deposit = () =>{
    while(true){
        const depositAmount = prompt("Enter a deposit amount: ");
        // We have to convert depositAmount to a number
        const numberDepositAmount = parseFloat(depositAmount);

        if (isNaN(numberDepositAmount) || numberDepositAmount <= 0){
            console.log('Invalid Deposit Amount, try again ..');
        }
        else{
            return numberDepositAmount;
        }
    };

};

// The number of lines user want to bet on

const getNumberOfLines = () => {
    while(true){
        const lines = prompt("Enter number of lines to bet on (1 - 3) : ");
        // We have to convert depositAmount to a number
        const numberOfLines = parseFloat(lines);

        if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3){
            console.log('Invalid Entry Amount, try again ..');
        }
        else{
            return numberOfLines;
        }
    };
};

//  Collect the bet amount

const getBet = (balance, lines) => {
    while(true){
        const bet = prompt("Enter Bet per line: ");
        // We have to convert depositAmount to a number
        const numberBet = parseFloat(bet);

        if (isNaN(numberBet) || numberBet <= 0 || numberBet > balance / lines){
            console.log('Invalid Bet, try again ..');
        }
        else{
            return numberBet;
        }
    };
};

// Spin the slot machine

const spin = () => {
    const symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)){
        for (let i = 0; i < count; i++){
            symbols.push(symbol)
        }
    }
    
    const reels = [];
    for (let i = 0; i < COLS; i++){
        reels.push([]);
        const reelSymbols = [...symbols];
        for(let j = 0; j < ROWS; j++){
            const randomIndex = Math.floor(Math.random() * reelSymbols.length);
            const selectedSymbol =  reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex, 1);
        }
        
    }
    return reels;
};

// transpose the slot machine
const transpose = (reels) => {
    const rows = [];
    for (let i = 0; i < ROWS; i++) {
        rows.push([]);
        for (let j = 0; j < COLS; j++) {
            rows[i].push(reels[j][i]);
        }
    }
    return rows;

};

const printRows = (rows) => {
    for(const row of rows){
        let rowString = "";
        for(const [i, symbol] of rows.entries()){
            rowString = symbol
            if (i != row.length - 1){
                rowString += " | "
            }
        }
        console.log(rowString)
    }
}

// check if user won

const getWinnings = (rows, bet, lines) => {
    let winnings = 0;
    for(let row = 0; row < lines; row++){
        const symbols = rows[row];
        let allSame = true;

        for (const symbol of symbols){
            if (symbol != symbols[0]){
                allSame = false
                break;
            }
        }
        // give users their winnings
        if(allSame){
            winnings += bet * SYMBOLS_VALUES[symbols[0]]
        }
    }
    return winnings;
}

// Play again
const game = () => {
    let balance = deposit();

    while(true){
        console.log("You have a balance of $" + balance)
        const numberOfLines = getNumberOfLines();
        const bet = getBet(balance, numberOfLines);
        balance -= bet * numberOfLines;
        const reels = spin()
        const rows = transpose(reels)
        printRows(rows);
        const winnings = getWinnings(rows, bet, numberOfLines)
        balance += winnings;
        console.log(" You Won, $" + winnings.toString())

        if(balance ==0){
            console.log("You are out of Money")
            break
        }
        const playAgain = prompt(" Do yo want to play again (y/n)? ")
        if (playAgain != 'y')break
        
    }
}

game();



