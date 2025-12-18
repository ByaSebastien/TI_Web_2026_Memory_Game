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
let correctGuesses = 0;

const intro = new Audio('./sounds/intro.mp3');
const dmc = new Audio('./sounds/start.mp3');

init();

function init() {

    intro.play();

    const tl = gsap.timeline();

    tl.from('.main-logo', {
        opacity: 0,
        clipPath: "inset(0 100% 100% 0)",
        duration: 3,
        ease: "power2.inOut"
    }).from('.start-btn', {
        opacity: 0,
        clipPath: "inset(0 0 100% 0)",
        duration: 1,
        ease: "power2.inOut"
    }, '+=1.8');
}

function startGame() {

    intro.pause();
    dmc.play();

    selected = [];
    count = 0;
    previousTarget = null;
    correctGuesses = 0;

    document.body.innerText = '';
    const game = document.createElement('div');
    game.classList.add('game');
    document.body.appendChild(game);

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

    gsap.from(".card", {
        opacity: 0,
        duration: 1,
        stagger: 0.1,
    });


    const match = () => {
        selected.forEach(card => {
            card.classList.add('match');
        });
        correctGuesses++;

        setTimeout(checkVictory, delay);
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
}

function checkVictory() {
    if (correctGuesses === 1) {
        //TODO New Game?
    }
}