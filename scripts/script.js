
function howManyCards() {
    const cards = prompt(`Quantas cartas quer utilizat?\nPor favor entre um número par entre 4 e 14`);

    if (Number(cards) && Number.isInteger(Number(cards)) && (Number(cards) >= 4 || Number(cards) <= 14) && (Number(cards) % 2 === 0)) {
        const card = document.querySelector('.card');
        for (let i = 1; i <= Number(cards) - 1; i++) {
            let newCard = card.cloneNode(true);
            newCard.id = i;
            console.log(newCard);
            document.querySelector('.cards').createElement(newCard);
        }
    }
    else {
        howManyCards();
    }
}

howManyCards();