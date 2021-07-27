
function howManyCards() {
    const cards = prompt(`Quantas cartas quer utilizat?\nPor favor entre um número par entre 4 e 14`);

    if (Number(cards) && Number.isInteger(Number(cards)) && (Number(cards) >= 4 || Number(cards) <= 14) && (Number(cards) % 2 === 0)) {

    }
    else {
        howManyCards();
    }
}

howManyCards();