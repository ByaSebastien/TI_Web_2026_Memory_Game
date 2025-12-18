const cards = [{
    'name': 'Credo',
    'img': './images/Credo.webp',
},
{
    'name': 'Dante',
    'img': './images/Dante.webp',
},
{
    'name': 'Eva',
    'img': './images/Eva.webp',
},
{
    'name': 'Kyrie',
    'img': './images/Kyrie.webp',
},
{
    'name': 'Lady',
    'img': './images/Lady.webp',
},
{
    'name': 'Morrison',
    'img': './images/Morrison.webp',
},
{
    'name': 'Nero',
    'img': './images/Nero.webp',
},
{
    'name': 'Nicoletta',
    'img': './images/Nicoletta.webp',
},
{
    'name': 'Sparda',
    'img': './images/Sparda.webp',
},
{
    'name': 'Trish',
    'img': './images/Trish.webp',
},
{
    'name': 'V',
    'img': './images/V.webp',
},
{
    'name': 'Vergil',
    'img': './images/Vergil.webp',
},
];

const gameCards = cards.concat(cards).sort(() => 0.5 - Math.random());

let selected = [];
let count = 0;
let previousTarget = null;
let delay = 1200;

const game = document.getElementById('game');

gameCards.forEach(item => {
    const { name, img } = item;

    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.name = name;

    const front = document.createElement('div');
    front.classList.add('front');

    const back = document.createElement('div');
    back.classList.add('back');
    back.style.backgroundImage = `url(${img})`;

    game.appendChild(card);
    card.appendChild(front);
    card.appendChild(back);
});

const match = () => {
    selected.forEach(card => {
        card.classList.add('match');
    });
};

const resetGuesses = () => {
    count = 0;
    previousTarget = null;

    selected.forEach(card => {
        card.classList.remove('selected');
    });

    selected = [];
};

game.addEventListener('click', event => {

    const clicked = event.target.parentNode;

    if (
        clicked === previousTarget ||
        clicked.classList.contains('selected') ||
        clicked.classList.contains('match')
    ) {
        return;
    }

    if (count < 2) {
        count++;
        if (count === 1) {
            clicked.classList.add('selected');
        } else {
            clicked.classList.add('selected');
        }
        selected.push(clicked);

        if (selected.length === 2) {
            const [first, second] = selected.map(n => n.dataset.name);
            if (first === second) {
                setTimeout(match, delay);
            }
            setTimeout(resetGuesses, delay);
        }
        previousTarget = clicked;
    }
});
