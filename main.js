const btnRock = document.querySelector('.buttons .rock');
const btnPaper = document.querySelector('.buttons .paper');
const btnScissors = document.querySelector('.buttons .scissors');

const aiResult = document.querySelector('.results .ai-wins h1');
const aiQuote = document.querySelector('.round-result .ai-quote p');
const playerResult = document.querySelector('.results .player-wins h1');
const roundResult = document.querySelector('.round h2');
const tiesResults = document.querySelector('.results .ties h1');
const textResult = document.querySelector('.text-choice .txt-result');
const textWinner = document.querySelector('.text-choice .winner');

const playerHand = document.querySelector('.player-picture img');
const aiHand = document.querySelector('.ai-picture img');

const aiWinQuotes = ["I'm just being lazy", "Take a deep breath", "That's my poker face", "Come on! Do something", "I've better things to do", "Aha! rookie mistake", "Analyze that!"];
const aiLoseQuotes = ["I'll take your victory", "If you win again, I quit", "How you predict it?", "Congratulations.", "You just broke my heart!", "Please don't rush like that!", "Give me a break"];

const gameResult = {
    aiWin: 0,
    playerWin: 0,
    ties: 0,
    roundNumber: 1,
    whoWin: "",
}

const values = {
    aiChoice: "",
    playerChoice: "",
}

const aiChoice = () => {
    let choiceNumber = "";
    if (gameResult.whoWin === "" || gameResult.whoWin === "nobody") {
        choiceNumber = Math.floor((Math.random() * 3) + 1);
        if (choiceNumber === 1) {
            return 'paper';
        } else if (choiceNumber === 2) {
            return 'scissors';
        } else if (choiceNumber === 3) {
            return 'rock';
        }
    } else if (gameResult.whoWin === "player") {
        if (values.playerChoice === "paper" && values.aiChoice === "rock" || values.playerChoice === "rock" && values.aiChoice === "paper") {
            return 'scissors';
        } else if (values.playerChoice === "rock" && values.aiChoice === "scissors" || values.playerChoice === "scissors" && values.aiChoice === "rock") {
            return 'paper';
        } else if (values.playerChoice === "scissors" && values.aiChoice === "paper" || values.playerChoice === "paper" && values.aiChoice === "scissors") {
            return 'rock';
        }
    } else if (gameResult.whoWin === "ai") {
        return values.aiChoice;
    }
}

const result = () => {
    if (values.playerChoice === values.aiChoice) {
        gameResult.ties++;
        gameResult.whoWin = 'nobody';
    } else if ((values.playerChoice === "paper" && values.aiChoice === "rock") || (values.playerChoice === "rock" && values.aiChoice === "scissors") || (values.playerChoice === "scissors" && values.aiChoice === "paper")) {
        gameResult.playerWin++;
        gameResult.whoWin = 'player';
    } else {
        gameResult.aiWin++
        gameResult.whoWin = 'ai';
    }
    printResult();
}

const printResult = () => {
    aiResult.textContent = gameResult.aiWin;
    playerResult.textContent = gameResult.playerWin;
    tiesResults.textContent = gameResult.ties;
    roundResult.textContent = `ROUND ${gameResult.roundNumber}`;
    playerHand.setAttribute('src', `pictures/picture-${values.playerChoice}.png`);
    aiHand.setAttribute('src', `pictures/picture-${values.aiChoice}.png`);
    textResult.textContent = `${(values.playerChoice).toUpperCase()} vs. ${(values.aiChoice).toUpperCase()}`;
    textWinner.textContent = `${gameResult.whoWin.toUpperCase()} !`;
    if (gameResult.whoWin === 'player') {
        aiQuote.textContent = aiLoseQuotes[Math.floor(Math.random() * aiWinQuotes.length)];
    } else if (gameResult.whoWin === 'ai') {
        aiQuote.textContent = aiWinQuotes[Math.floor(Math.random() * aiWinQuotes.length)];
    } else if (gameResult.whoWin === 'nobody') {
        aiQuote.textContent = "Meh...";
    }
}

const game = (selectedOption) => {
    values.aiChoice = aiChoice();
    values.playerChoice = selectedOption;
    gameResult.roundNumber++;
    result();
}

btnRock.addEventListener('click', () => game('rock'));
btnPaper.addEventListener('click', () => game('paper'));
btnScissors.addEventListener('click', () => game('scissors'));
