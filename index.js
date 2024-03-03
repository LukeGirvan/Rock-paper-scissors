"use strict";
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
function play(playerChoice, cpuChoice) {
    const results = {
        'rock': { scissors: 'win', rock: 'draw', paper: 'lose' },
        'paper': { scissors: 'lose', rock: 'win', paper: 'draw' },
        'scissors': { scissors: 'draw', rock: 'lose', paper: 'win' }
    };
    let result = results[playerChoice][cpuChoice];
    const textToEdit = document.querySelector('.result > h1:nth-child(1)');
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
document.addEventListener('click', choice);
