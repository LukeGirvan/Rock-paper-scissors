type ResultType = 'win' | 'draw' | 'lose';

interface Results {
    [key: string]: {
        [key: string]: ResultType;
    };
}

interface updateScore {
    [key:string] : Function
}

let playerScore = 0
let cpuScore = 0



function getComputerChoice (options: string[]): string {
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
}


function choice(e: MouseEvent): void {
    const playerChoice = (e.target as HTMLElement).classList[0]
    const optionsArray: string[] = ['rock', 'paper', 'scissors'];
    const cpuChoice: string = getComputerChoice (optionsArray);

    if(playerChoice && optionsArray.includes(playerChoice)){
        play(playerChoice,cpuChoice )
    }
}

function updateScore(result:string): void{
    const textToEdit = document.querySelector('.playerScore')
    const changeResult: updateScore = {'win': () => playerScore+=1,
                          'lose' : () => cpuScore+=1,
                          'draw': () => {return
                            ;}
} 
    changeResult[result]()
    if(playerScore >= 5){
        winner('player')
    }
    if(cpuScore >= 5){
        winner('cpu')
    }
    if(textToEdit){
        textToEdit.textContent = `Player Score: ${playerScore}  Cpu Score: ${cpuScore}`
    }
}


function play(playerChoice:string, cpuChoice:string) : void{
    const results: Results = {
        'rock': { scissors: 'win', rock: 'draw', paper: 'lose' },
        'paper': { scissors: 'lose', rock: 'win', paper: 'draw' },
        'scissors': { scissors: 'draw', rock: 'lose', paper: 'win' }
    };

    let result =  results[playerChoice][cpuChoice]

    const textToEdit = document.querySelector('.result > h1:nth-child(1)')

    updateScore(result)

    if(textToEdit){
        textToEdit.textContent = changeText(result, playerChoice, cpuChoice)
    }

}

function changeText(result:ResultType, playerChoice:string, cpuChoice:string) : string{
    const emojis: Record<string, string> = {
        'rock': '✊🏼',
        'scissors': '✌🏼',
        'paper': '✋🏼'

    };

    const textBasedOnResult = {
        'win': `You Win! You chose: ${emojis[playerChoice]} and the cpu chose: ${emojis[cpuChoice]}`,
        'draw': `It's a draw! You both chose ${emojis[playerChoice]}`,
        'lose': ` You lose! You chose: ${emojis[playerChoice]} and the cpu chose: ${emojis[cpuChoice]}`
    }
    return textBasedOnResult[result]
}

function selectElements(...selectors: string[]): HTMLElement[] {
    return selectors.map(selector => document.querySelector(selector) as HTMLElement);
}

function removeClassFromElements(elements: HTMLElement[], className: string): void {
    elements.forEach(element => {
        if (element) element.classList.remove(className);
    });
}

function addClassToElements(elements: HTMLElement[], className: string): void {
    elements.forEach(element => {
        if (element) element.classList.add(className);
    });
}




function reset(): void {
    const [title, options, score, scoreh1, result, resultH1, gameOver] = selectElements('.title', '.options', '.score','.score > h1' ,'.result','.result > h1', '.game-over');
    const arr = [title, options, score, result, gameOver];

    removeClassFromElements(arr, 'is-winner');

    playerScore = 0;
    cpuScore = 0;
    resultH1.textContent = '';
    scoreh1.textContent = `Player Score: ${playerScore}  Cpu Score: ${cpuScore}`;
}

function winner(winner: string): void {
    const [title, options, score, result, gameOver, winnerText] = selectElements('.title', '.options', '.score', '.result', '.game-over', '.game-over-h1');
    const arr = [title, options, score, result, gameOver];
    const playerWin = winner === 'player';
    winnerText.textContent = playerWin ? `You Win Nice! 😇` : `Cpu Wins Try Again Next Time 😔`;

    addClassToElements(arr, 'is-winner');

    const playAgain = document.querySelector('.play-again-button') as HTMLElement;
    playAgain.addEventListener('click', reset);
}



document.addEventListener('click', choice)





