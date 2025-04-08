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

const saveBtnContainer = document.querySelector('#saveBtnContainer');
const saveBtn = document.querySelector('#saveBtn');
const roundsPl1 = document.querySelector('#roundsPl1');
const roundsPl2 = document.querySelector('#roundsPl2');
let winScore1 = 0;
let winScore2 = 0;

const player1 = {
    name: '',
    totalPoints: 0,
    rounds: 0
};
const player2 = {
    name: '',
    totalPoints: 0,
    rounds: 0
};

let activePlayer = player1;
let numPlayer = '1';


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
    player1.name = document.querySelector('#nameForm1').value;
    const name1 = document.querySelector('#name1');
    name1.classList.remove('hidden');
    name1.innerText = `Player 1: ${player1.name}`;
    form1.classList.add('hidden');
    diceContainer.classList.remove('hidden');
    scoreContainer.classList.remove('hidden');
    scoreTablePl1.innerText = `${player1.name} 0 points`;
    saveBtnContainer.classList.remove('hidden');
})
btnForm2.addEventListener('click', event => {
    event.preventDefault();
    player1.name = document.querySelector('#nameForm1').value;
    const name1 = document.querySelector('#name1');
    player2.name = document.querySelector('#nameForm2').value;
    const name2 = document.querySelector('#name2');
    if(player1.name && player2.name){
        name1.classList.remove('hidden');
        name1.innerText = `Player 1: ${player1.name}`;
        form1.classList.add('hidden');
        name2.classList.remove('hidden');
        name2.innerText = `Player 2: ${player2.name}`;
        form2.classList.add('hidden');
        diceContainer.classList.remove('hidden');
        scoreContainer.classList.remove('hidden');
        scoreTablePl1.innerText = `${player1.name} 0 points`;
        scoreTablePl2.classList.remove('hidden');
        scoreTablePl2.innerText = `${player2.name} 0 points`;
        roundsPl2.innerText = '0 rounds';
        saveBtnContainer.classList.remove('hidden');
        numPlayer = '2';
    }
})
//---------------------------------------------------------------------------
// Roll Dice
let rollHoverAnimation;
let rollClickAnimation;

dieBtn.addEventListener('mouseenter', () => {
    if(winScore1 >= 100 || winScore2 >= 100) {
        return;
    }
    startRolling('hover');
});
dieBtn.addEventListener('mouseleave', () => {
    if(winScore1 >= 100 || winScore2 >= 100) {
        return;
    }
    stopRolling('hover');
});
dieBtn.addEventListener('click', () => {
    if(winScore1 >= 100 || winScore2 >= 100) {
        return;
    }
    stopRolling('hover');
    startRolling('click');
});
function startRolling(type) {
    let rollCount = 0;
    let maxRolls = type === 'click' ? 4 + Math.floor(Math.random() * 6) : Infinity;
    let rollSpeed = 150;

    let rollFunc = setInterval(() => {
        let tempNum = Math.floor(Math.random() * 6) + 1;

        dice.classList.add('hidden');
        dice.classList.remove('die-rolling', 'die-rolling-rotate');

        dice = document.querySelector(`#die-${tempNum}`);
        dice.classList.remove('hidden');
        dice.classList.add(type === 'click' ? 'die-rolling-rotate' : 'die-rolling');

        rollCount++;
        if (type === 'click' && rollCount >= maxRolls) {
            clearInterval(rollFunc);

            setTimeout(() => {
                // Final result
                dice.classList.add('hidden');
                dice.classList.remove('die-rolling-rotate');

                let finalNum = Math.floor(Math.random() * 6) + 1;

                dice = document.querySelector(`#die-${finalNum}`);
                dice.classList.remove('hidden');

                const miniDie = dice.cloneNode(true);
                miniDie.classList.remove('die-rolling', 'die-rolling-rotate', 'hidden');
                miniDie.classList.add('mini-die');
                document.getElementById('diceHistory').appendChild(miniDie);

                if (finalNum == 1) {
                    roundScore = 0;
                    document.getElementById('diceHistory').innerHTML = '';
                    if (numPlayer == '2') {
                        if(activePlayer == player1){
                            player1.rounds += 1;
                            roundsPl1.innerText = `${player1.rounds} rounds`;
                            activePlayer = player2;
                            name1.classList.remove('currentNameHeader');
                            name2.classList.add('currentNameHeader');
                        } else {
                            player2.rounds += 1;
                            roundsPl2.innerText = `${player2.rounds} rounds`;
                            activePlayer = player1;
                            name2.classList.remove('currentNameHeader');
                            name1.classList.add('currentNameHeader');
                        }
                    } else {
                        player1.rounds += 1;
                        roundsPl1.innerText = `${player1.rounds} rounds`;
                    }
                } else {
                    roundScore += finalNum;
                }
                roundScoreTable.innerText = `Round Points ${roundScore}`;
                if(activePlayer == player1){
                    winScore1 = roundScore + player1.totalPoints;
                } else {
                    winScore2 = roundScore + player2.totalPoints;
                }
                if (winScore1 >= 100) {
                    triggerWinFireworks();
                    setTimeout(() => {
                        document.getElementById('winContainer').classList.remove('hidden');
                        document.getElementById('winContainer').classList.add('visible');
                        document.getElementById('winnerName').textContent = `${player1.name} wins!`;
                        document.getElementById('winnerStats').textContent = `It took ${player1.rounds} rounds.`;
                        saveBtnContainer.classList.add('hidden');
                      }, 1500);
                    player1.rounds += 1;
                    roundsPl1.innerText = `${player1.rounds} rounds`;
                    player1.totalPoints += roundScore;
                    scoreTablePl1.innerText = `${player1.name} ${player1.totalPoints} points`;
                } else if (winScore2 >= 100) {
                    triggerWinFireworks();
                    setTimeout(() => {
                        document.getElementById('winContainer').classList.remove('hidden');
                        document.getElementById('winContainer').classList.add('visible');
                        document.getElementById('winnerName').textContent = `${player2.name} wins!`;
                        document.getElementById('winnerStats').textContent = `It took ${player2.rounds} rounds.`;
                        saveBtnContainer.classList.add('hidden');
                      }, 1500);
                    player2.rounds += 1;
                    roundsPl2.innerText = `${player2.rounds} rounds`;
                    player2.totalPoints += roundScore;
                    scoreTablePl2.innerText = `${player2.name} ${player2.totalPoints} points`;
                }
            }, 150);
        }
    }, rollSpeed);

    if (type === 'click') {
        rollClickAnimation = rollFunc;
    } else {
        rollHoverAnimation = rollFunc;
    }
}

function stopRolling(type) {
    if (type === 'hover') {
        clearInterval(rollHoverAnimation);
        dice.classList.remove('die-rolling');
    }
}

document.getElementById('playAgainBtn').addEventListener('click', () => {
    document.body.classList.remove('blur');
    location.reload();
  });


//--------------------------------------------------------------------------
// Save roundScore to total
saveBtn.addEventListener('click', event => {
    if(winScore1 >= 100 || winScore2 >= 100) {
        return;
    }
    if (activePlayer == player1) {
        player1.rounds += 1;
        roundsPl1.innerText = `${player1.rounds} rounds`;
        player1.totalPoints += roundScore;
        scoreTablePl1.innerText = `${player1.name} ${player1.totalPoints} points`;
        if(numPlayer == '2'){
            activePlayer = player2;
            name1.classList.remove('currentNameHeader');
            name2.classList.add('currentNameHeader');
        }
    } else if (activePlayer == player2) {
        player2.rounds += 1;
        roundsPl2.innerText = `${player2.rounds} rounds`;
        player2.totalPoints += roundScore;
        scoreTablePl2.innerText = `${player2.name} ${player2.totalPoints} points`;
        activePlayer = player1;
        name2.classList.remove('currentNameHeader');
        name1.classList.add('currentNameHeader');
    }
    roundScore = 0;
    roundScoreTable.innerText = `Round Points ${roundScore}`;
    document.getElementById('diceHistory').innerHTML = '';
    
});

//--------------------------------------------------------------------------

const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let fireworks = [];
let particles = [];

function random(min, max) {
    return Math.random() * (max - min) + min;
}

function Firework(x, y) {
    this.x = x;
    this.y = y;
    this.sparks = [];

    for (let i = 0; i < 150; i++) {
        this.sparks.push({
            x: x,
            y: y,
            angle: Math.random() * 2 * Math.PI,
            speed: Math.random() * 5 + 2,
            radius: Math.random() * 2 + 1,
            alpha: 1,
            decay: Math.random() * 0.005 + 0.002
        });
    }
}

function animateFireworks() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.005)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    fireworks.forEach((firework, index) => {
        firework.sparks.forEach((spark) => {
            spark.x += Math.cos(spark.angle) * spark.speed;
            spark.y += Math.sin(spark.angle) * spark.speed;
            spark.alpha -= spark.decay;

            ctx.beginPath();
            ctx.arc(spark.x, spark.y, spark.radius, 0, 2 * Math.PI);
            ctx.fillStyle = `rgba(255, ${Math.floor(Math.random() * 255)}, 0, ${spark.alpha})`;
            ctx.fill();
        });
        fireworks[index].sparks = fireworks[index].sparks.filter(s => s.alpha > 0);
        if (fireworks[index].sparks.length === 0) {
            fireworks.splice(index, 1);
        }
    });

    if (fireworks.length > 0) {
        requestAnimationFrame(animateFireworks);
    } else {
        canvas.classList.add('hidden');
    }
}

function launchFirework() {
    const x = window.innerWidth / 2;
    const y = window.innerHeight / 2;
    fireworks.push(new Firework(x, y));
    animateFireworks();
}

function triggerWinFireworks(duration = 10000) {
    canvas.classList.remove('hidden');
    let fireworkInterval = setInterval(launchFirework, 500);

    setTimeout(() => {
        clearInterval(fireworkInterval);
        setTimeout(() => {
            fireworks = [];
            canvas.classList.add('hidden');
        }, 4000);
    }, duration);
}