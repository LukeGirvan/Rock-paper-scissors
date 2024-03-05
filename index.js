"use strict";
let playerScore = 0;
let cpuScore = 0;
function getComputerChoice(options) {
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
}
function choice(e) {
    const playerChoice = e.target.classList[0];
    const optionsArray = ['rock', 'paper', 'scissors'];
    const cpuChoice = getComputerChoice(optionsArray);
    if (playerChoice && optionsArray.includes(playerChoice)) {
        play(playerChoice, cpuChoice);
    }
}
function updateScore(result) {
    const textToEdit = document.querySelector('.playerScore');
    const changeResult = { 'win': () => playerScore += 1,
        'lose': () => cpuScore += 1,
        'draw': () => {
            return;
        }
    };
    changeResult[result]();
    if (playerScore >= 5) {
        winner('player');
    }
    if (cpuScore >= 5) {
        winner('cpu');
    }
    if (textToEdit) {
        textToEdit.textContent = `Player Score: ${playerScore}  Cpu Score: ${cpuScore}`;
    }
}
function play(playerChoice, cpuChoice) {
    const results = {
        'rock': { scissors: 'win', rock: 'draw', paper: 'lose' },
        'paper': { scissors: 'lose', rock: 'win', paper: 'draw' },
        'scissors': { scissors: 'draw', rock: 'lose', paper: 'win' }
    };
    let result = results[playerChoice][cpuChoice];
    const textToEdit = document.querySelector('.result > h1:nth-child(1)');
    updateScore(result);
    if (textToEdit) {
        textToEdit.textContent = changeText(result, playerChoice, cpuChoice);
    }
}
function changeText(result, playerChoice, cpuChoice) {
    const emojis = {
        'rock': '✊🏼',
        'scissors': '✌🏼',
        'paper': '✋🏼'
    };
    const textBasedOnResult = {
        'win': `You Win! You chose: ${emojis[playerChoice]} and the cpu chose: ${emojis[cpuChoice]}`,
        'draw': `It's a draw! You both chose ${emojis[playerChoice]}`,
        'lose': ` You lose! You chose: ${emojis[playerChoice]} and the cpu chose: ${emojis[cpuChoice]}`
    };
    return textBasedOnResult[result];
}
function selectElements(...selectors) {
    return selectors.map(selector => document.querySelector(selector));
}
function removeClassFromElements(elements, className) {
    elements.forEach(element => {
        if (element)
            element.classList.remove(className);
    });
}
function addClassToElements(elements, className) {
    elements.forEach(element => {
        if (element)
            element.classList.add(className);
    });
}
function reset() {
    const [title, options, score, scoreh1, result, resultH1, gameOver] = selectElements('.title', '.options', '.score', '.score > h1', '.result', '.result > h1', '.game-over');
    const arr = [title, options, score, result, gameOver];
    removeClassFromElements(arr, 'is-winner');
    playerScore = 0;
    cpuScore = 0;
    resultH1.textContent = '';
    scoreh1.textContent = `Player Score: ${playerScore}  Cpu Score: ${cpuScore}`;
}
function winner(winner) {
    const [title, options, score, result, gameOver, winnerText] = selectElements('.title', '.options', '.score', '.result', '.game-over', '.game-over-h1');
    const arr = [title, options, score, result, gameOver];
    const playerWin = winner === 'player';
    winnerText.textContent = playerWin ? `You Win Nice! 😇` : `Cpu Wins Try Again Next Time 😔`;
    addClassToElements(arr, 'is-winner');
    const playAgain = document.querySelector('.play-again-button');
    playAgain.addEventListener('click', reset);
}
document.addEventListener('click', choice);
