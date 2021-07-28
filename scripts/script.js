let cards = 0;
let clickCount = 0;
let cardsFlipedCount = 0;
let memoryImg;

function shuffleBackGround() {
    return Math.random() - 0.5;
}


function howManyCards() {
    cards = prompt(`Quantas cartas quer utilizat?\nPor favor entre um número par entre 4 e 14`);

    if (Number(cards) && Number.isInteger(Number(cards)) && (Number(cards) >= 4 || Number(cards) <= 14) && (Number(cards) % 2 === 0)) {
        let backGrounds = [];
        for (let i = 0; i <= (cards / 2) - 1; i++) {
            backGrounds.push(i)
        }
        backGrounds = backGrounds.concat(backGrounds);
        backGrounds.sort(shuffleBackGround);
        let allCards = '';
        for (let i = 0; i < Number(cards); i++) {
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
    }
    else {
        howManyCards();
    }
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
        location.reload();
    }
}
function checkImg(element) {
    if (clickCount % 2 === 1) {
        memoryImg = element;
    }
    else if (element.id === memoryImg.id) {

    }
    else if (element.querySelector('.card-back img').src !== memoryImg.querySelector('.card-back img').src) {
        setTimeout(() => toggleImg(element), 1000);
        setTimeout(() => toggleImg(memoryImg), 1000);
    }
    else {
        cardsFlipedCount = cardsFlipedCount + 2;
        console.log(cardsFlipedCount);
        if (cardsFlipedCount === Number(cards)) {
            alert(`Você Ganhou em ${clickCount} jogadas`);
            playAgain();
        }
    }

}
function countCardsFlipled() {
    const allCards = document.querySelectorAll('.card');
    let count = 0;
    allCards.forEach(iten => iten.querySelector('.card-front img').classList.contains('hided') ? count++ : '');
    console.log(count);
    return (count < cardsFlipedCount + 2) ? true : false;
}

function clickCard(element) {
    if (countCardsFlipled()) {
        clickCount = clickCount + 1;
        toggleImg(element);
        checkImg(element);
    }
}

howManyCards();



