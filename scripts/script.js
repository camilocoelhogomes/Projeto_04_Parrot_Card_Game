let cards = 0;
let clickCount = 0;
let cardsFlipedCount = 0;
let memoryImg;

function howManyCards() {
    cards = prompt(`Quantas cartas quer utilizat?\nPor favor entre um número par entre 4 e 14`);

    if (Number(cards) && Number.isInteger(Number(cards)) && (Number(cards) >= 4 || Number(cards) <= 14) && (Number(cards) % 2 === 0)) {
        const card = document.querySelector('.card');
        for (let i = 1; i <= Number(cards) - 1; i++) {
            let newCard = card.cloneNode(true);
            newCard.id = i;
            document.querySelector('.cards').appendChild(newCard);
        }
    }
    else {
        howManyCards();
    }
}

function toggleImg(element) {
    const imgs = element.querySelectorAll('.card-img');
    imgs.forEach(i => i.classList.toggle('hided'));
}

function checkImg(element) {
    if (clickCount % 2 === 1) {
        memoryImg = element;
    }
    else if (element.id === memoryImg.id) {

    }
    else {
        if (element.querySelector('.card-back img').src !== memoryImg.querySelector('.card-back img').src) {
            setTimeout(() => toggleImg(element), 1000);
            setTimeout(() => toggleImg(memoryImg), 1000);
        }
        else {
            cardsFlipedCount = cardsFlipedCount + 2;
            if (cardsFlipedCount === Number(cards)) {
                alert(`Você Ganhou em ${clickCount / 2} jogadas`);

            }
        }
    }
}

function clickCard(element) {
    clickCount = clickCount + 1;
    toggleImg(element);
    checkImg(element);
}

// Esta função pode ficar separada do código acima, onde você preferir
function shuffleBackGround() {
    return Math.random() - 0.5;
}

function changeBackgroundImg() {
    let backGrounds = [];

    for (let i = 0; i <= (cards / 2) - 1; i++) {
        backGrounds.push(i)
    }

    backGrounds = backGrounds.concat(backGrounds);
    backGrounds.sort(shuffleBackGround);
    const allCards = document.querySelectorAll('.card');
    allCards.forEach((i, k) => i.querySelector('.card-back img').src = `./img/${backGrounds[k]}.gif`)
}

howManyCards();
changeBackgroundImg();