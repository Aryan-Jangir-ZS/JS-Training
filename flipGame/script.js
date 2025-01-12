const images = ["🍎", "🍌", "🍇", "🍓", "🍉", "🍒", "🍍","🍄"];
let cards = [...images, ...images].sort(() => Math.random() - 0.5);

const grid = document.getElementById('game-grid');
const matchesSpan = document.getElementById('matches');
const missesSpan = document.getElementById('misses');
const resultCard = document.getElementById('result-card');
const finalMatches = document.getElementById('final-matches');
const finalMisses = document.getElementById('final-misses');
const accuracySpan = document.getElementById('accuracy');
const resetButton = document.getElementById('reset-button');

let firstCard = null;
let secondCard = null;
let moves = 0;
let matches = 0;
let misses = 0;
let lockBoard = false;

function createCard(image) {
    const card = document.createElement('div');
    card.classList.add('card');

    const cardInner = document.createElement('div');
    cardInner.classList.add('card-inner');

    const cardFront = document.createElement('div');
    cardFront.classList.add('card-front');
    cardFront.textContent = image;

    const cardBack = document.createElement('div');
    cardBack.classList.add('card-back');

    cardInner.appendChild(cardBack);
    cardInner.appendChild(cardFront);
    card.appendChild(cardInner);

    card.addEventListener('click', () => handleCardClick(card, image));

    return card;
}

function handleCardClick(card, image) {
    if (lockBoard) return;

    if (card.classList.contains('flipped')) {
        card.classList.remove('flipped');
        if (firstCard && firstCard.card === card) firstCard = null;
        return;
    }

    card.classList.add('flipped');

    if (!firstCard) {
        firstCard = { card, image };
    } else if (!secondCard) {
        secondCard = { card, image };
        checkMatch();
    }
}

function checkMatch() {
    lockBoard = true;
    if (firstCard.image === secondCard.image) {
        matches++;
        matchesSpan.textContent = matches;
        firstCard.card.classList.add('disappear');
        secondCard.card.classList.add('disappear');
        resetCards();
        checkGameOver();
    } else {
        misses++;
        missesSpan.textContent = misses;
        
        setTimeout(() => {
            firstCard.card.classList.remove('flipped');
            secondCard.card.classList.remove('flipped');
            resetCards();
        }, 1000);
    }
}

function resetCards() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

function checkGameOver() {
    const totalCards = cards.length;
    const flippedCards = document.querySelectorAll('.disappear').length;
    if (flippedCards === totalCards) {
        showResult();
    }
}

function showResult() {
    const totalAttempts = matches + misses;
    const accuracy = totalAttempts > 0 ? ((matches / totalAttempts) * 100).toFixed(2) : 0;

    finalMatches.textContent = matches;
    finalMisses.textContent = misses;
    accuracySpan.textContent = accuracy;

    resultCard.classList.add('show');
}

resetButton.addEventListener('click', () => {
    matches = 0;
    misses = 0;
    matchesSpan.textContent = matches;
    missesSpan.textContent = misses;
    resultCard.classList.remove('show');
    cards = [...images, ...images].sort(() => Math.random() - 0.5);
    initializeGame();
});

function initializeGame() {
    grid.innerHTML = '';
    cards.forEach(image => {
        const card = createCard(image);
        grid.appendChild(card);
    });
}

initializeGame();
