type ResultType = 'win' | 'draw' | 'lose';

interface Results {
    [key: string]: {
        [key: string]: ResultType;
    };
}




function getComputerChoice (options: string[]): string {
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
}





function choice(e: MouseEvent): void {
    const playerChoice = (e.target as HTMLElement).classList[0]
    const optionsArray = ['rock', 'paper', 'scissors'];
    const cpuChoice: string = getComputerChoice (optionsArray);

    if(playerChoice && optionsArray.includes(playerChoice)){
        play(playerChoice,cpuChoice )
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

document.addEventListener('click', choice)





