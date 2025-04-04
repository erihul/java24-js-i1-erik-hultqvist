// Player form
const btnForm1 = document.querySelector('#btnForm1');
const form1 = document.querySelector('#form1');
const form2 = document.querySelector('#form2');
const onePlayerBtn = document.querySelector('#onePlayerBtn');
const twoPlayerBtn = document.querySelector('#twoPlayerBtn');
const numPlayerForm = document.querySelector('#numPlayerForm');
// Dice
const diceContainer = document.querySelector('.diceContainer');
const dieBtn = document.querySelector('#clickable');
let dice = document.querySelector('#die-1');
// Score
const scoreContainer = document.querySelector('.scoreContainer');
const scoreTablePl1 = document.querySelector('#scorePl1');
const scoreTablePl2 = document.querySelector('#scorePl2');
let roundScore = 0;
let pl1TotalScore = 0;
let pl2TotalScore = 0;
const roundScoreTable = document.querySelector('#roundScore');

const saveBtn = document.querySelector('#saveBtn');


//--------------------------------------------------------------- 
// Choose num of Players. 1 or 2
onePlayerBtn.addEventListener('click', event => {
    event.preventDefault();
    numPlayerForm.classList.add('hidden');
    form1.classList.remove('hidden');
})
twoPlayerBtn.addEventListener('click', event => {
    const enterNamePlayer1 = document.querySelector('#enterNamePlayer1');
    event.preventDefault();
    numPlayerForm.classList.add('hidden');
    form1.classList.remove('hidden');
    btnForm1.classList.add('hidden')
    form2.classList.remove('hidden');
    enterNamePlayer1.innerText += ` Player1`;
})
//------------------------------------------------------------------
// Submit names. Player1 or Player1 and Player2
btnForm1.addEventListener('click', event => {
    event.preventDefault();
    const nameForm1 = document.querySelector('#nameForm1').value;
    const name1 = document.querySelector('#name1');
    name1.classList.remove('hidden');
    name1.innerText = `Player 1: ${nameForm1}`;
    form1.classList.add('hidden');
    diceContainer.classList.remove('hidden');
    scoreContainer.classList.remove('hidden');
    saveBtn.classList.remove('hidden');
})
btnForm2.addEventListener('click', event => {
    event.preventDefault();
    const nameForm1 = document.querySelector('#nameForm1').value;
    const name1 = document.querySelector('#name1');
    const nameForm2 = document.querySelector('#nameForm2').value;
    const name2 = document.querySelector('#name2');
    if(nameForm1 && nameForm2){
        name1.classList.remove('hidden');
        name1.innerText = `Player 1: ${nameForm1}`;
        form1.classList.add('hidden');
        name2.classList.remove('hidden');
        name2.innerText = `Player 2: ${nameForm2}`;
        form2.classList.add('hidden');
        diceContainer.classList.remove('hidden');
        scoreContainer.classList.remove('hidden');
        scoreTablePl2.classList.remove('hidden');
        saveBtn.classList.remove('hidden');
    }
})
//---------------------------------------------------------------------------
// Roll Dice

/* dieBtn.addEventListener('click', event => {
    let randomNum = Math.floor(Math.random() * 6) + 1;
    dice.classList.add('hidden');
    dice = document.querySelector(`#die-${randomNum}`);
    dice.classList.remove('hidden');
    if(randomNum == 1){
        roundScore = 0;
    } else {
        roundScore += randomNum;
    }
    roundScoreTable.innerText = `Round Points ${roundScore}`;
}); */

// TODO - Avbryta vid klick? ej kunna klicka en massa gånger, behöver vänta till den körts klart..

dieBtn.addEventListener('click', event => {
    let randomNum = Math.floor(Math.random() * 6) + 1;
    let rollSequence = 10 + Math.floor(Math.random() * 5);
    let rollCount = 0;

    let rollAnimation = setInterval(() => {
        let tempNum = Math.floor(Math.random() * 6) + 1;
        dice.classList.add('hidden');
        dice = document.querySelector(`#die-${tempNum}`);
        dice.classList.remove('hidden');

        rollCount++;
        if (rollCount >= rollSequence) {
            clearInterval(rollAnimation);

            setTimeout(() => {
                dice.classList.add('hidden');
                dice = document.querySelector(`#die-${randomNum}`);
                dice.classList.remove('hidden');

                if (randomNum == 1) {
                    roundScore = 0;
                } else {
                    roundScore += randomNum;
                }
                roundScoreTable.innerText = `Round Points ${roundScore}`;
                let winScore = roundScore + pl1TotalScore;
                if(winScore >= 100){
                    console.log('Vi har en vinnare');
                }
            }, 200);
        }
        // Speed
    }, 100);

});

//--------------------------------------------------------------------------
// Save roundScore to total
saveBtn.addEventListener('click', event => {
    console.log(event.target);
    pl1TotalScore += roundScore;
    scoreTablePl1.innerText = `Player 1 ${pl1TotalScore}`;
    roundScore = 0;
    roundScoreTable.innerText = `Round Points ${roundScore}`;
});