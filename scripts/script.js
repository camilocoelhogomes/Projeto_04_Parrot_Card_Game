let cards = 0;
let clickCount = 0;
let cardsFlipedCount = 0;
let timeCounter = 0;
let memoryImg;
let timeKiller;
const player = [];
function shuffleBackGround() {
    return Math.random() - 0.5;
}

function howManyCards() {
    player.push([prompt('Qual o seu nome?')])
    cards = prompt(`Quantas cartas quer utilizat?\nPor favor entre um número par entre 4 e 14`);
    player[player.length - 1].push(cards);
    if (Number(cards) && Number.isInteger(Number(cards)) && (Number(cards) >= 4 || Number(cards) <= 14) && (Number(cards) % 2 === 0)) {
        let backGrounds = [];
        for (let i = 0; i <= (cards / 2) - 1; i++) {
            backGrounds.push(i)
        }
        backGrounds = backGrounds.concat(backGrounds);
        backGrounds.sort(shuffleBackGround);
        let allCards = '';
        for (let i = 0, stop = Number(cards); i < stop; i++) {
            allCards = allCards +
                `<div class="card" id='${i}' onclick="clickCard(this)">
                    <div class="card-front">
                        <img class="card-img" src="./img/front.png" alt="parrot">
                    </div>
                    <div class="card-back">
                        <img class="card-img hided" src="./img/${backGrounds[i]}.gif" alt="">
                    </div>
                </div>`
        }
        document.querySelector('.cards').innerHTML = allCards;
        timer();
    }
    else {
        howManyCards();
    }
}

function millisToMinutesAndSeconds(millis) {
    let minutes = Math.floor(millis / 60);
    let seconds = ((millis % 60) / 1).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

function timerOutPut() {
    timeCounter++;
    document.querySelector('h2').innerHTML = millisToMinutesAndSeconds(timeCounter);
}

function timer() {
    timeKiller = setInterval(timerOutPut, 1000);
}

function toggleImg(element) {
    const imgs = element.querySelectorAll('.card-img');
    imgs.forEach(i => i.classList.toggle('hided'));
    element.querySelector('.card-front').classList.toggle('card-front-click');
    element.querySelector('.card-back').classList.toggle('card-back-click');
}

function playAgain() {
    const play = prompt('Quer Jogar de Novo?');
    if (play === 'sim') {
        cards = 0;
        clickCount = 0;
        cardsFlipedCount = 0;
        timeCounter = 0;
        howManyCards();
    }
}

function score(numCards, time, clicks) {
    return 10 ** (numCards * 10 / (time * clicks));
}

function checkImg(element) {
    if (clickCount % 2 === 1) {
        memoryImg = element;
    }
    else if (element.querySelector('.card-back img').src !== memoryImg.querySelector('.card-back img').src) {
        setTimeout(() => toggleImg(element), 1000);
        setTimeout(() => toggleImg(memoryImg), 1000);
    }
    else if (element.querySelector('.card-back img').src === memoryImg.querySelector('.card-back img').src && element.id !== memoryImg.id) {
        cardsFlipedCount = cardsFlipedCount + 2;
        if (cardsFlipedCount === Number(cards)) {
            clearInterval(timeKiller);
            player[player.length - 1].push(timeCounter);
            player[player.length - 1].push(score(cards, timeCounter, clickCount));
            alert(`Você Ganhou em ${clickCount} jogadas e em ${millisToMinutesAndSeconds(timeCounter)} tempo`);
            playAgain();
        }
    }

}

function countCardsFlipled(element) {
    const allCards = element.parentNode.querySelectorAll('.card');
    let count = 0;
    allCards.forEach(iten => iten.querySelector('.card-front img').classList.contains('hided') ? count++ : '');
    return (count < cardsFlipedCount + 2) ? true : false;
}

function clickCard(element) {
    if (countCardsFlipled(element) && !element.querySelector('.card-front img').classList.contains('hided')) {
        clickCount = clickCount + 1;
        toggleImg(element);
        checkImg(element);
    }
}

howManyCards();