const btnStart = document.querySelector('#start');
const btnRestart = document.querySelector('#restart');
btnRestart.disabled = true;

const grid = document.querySelector('.grid');
grid.innerHTML = `<h3 id="parabens">Vamos jogar?! </br> <img src="./images/happy-svgrepo-com.svg"></h3>`;

btnStart.onclick = () => {
    resetar()
    iniciar();
    btnRestart.disabled = false;
    btnStart.disabled = true;
    const cardArray = [
        {
            name: 'airplane',
            img: './images/airplane-svgrepo-com.svg'
        },
        {
            name: 'airplane',
            img: './images/airplane-svgrepo-com.svg'
        },
        {
            name: 'bicycle',
            img: './images/bicycle-svgrepo-com.svg'
        },
        {
            name: 'bicycle',
            img: './images/bicycle-svgrepo-com.svg'
        },
        {
            name: 'brush',
            img: './images/brush-teeth-svgrepo-com.svg'
        },
        {
            name: 'brush',
            img: './images/brush-teeth-svgrepo-com.svg'
        },
        {
            name: 'getUp',
            img: './images/get-up-svgrepo-com (2).svg'
        },
        {
            name: 'getUp',
            img: './images/get-up-svgrepo-com (2).svg'
        },
        {
            name: 'shoe',
            img: './images/shoe-svgrepo-com.svg'
        },
        {
            name: 'shoe',
            img: './images/shoe-svgrepo-com.svg'
        },
        {
            name: 'snow',
            img: './images/snow-svgrepo-com.svg'
        },
        {
            name: 'snow',
            img: './images/snow-svgrepo-com.svg'
        },
    ]

    cardArray.sort(() => 0.5 - Math.random());

    const grid = document.querySelector('.grid');
    let resultDisplay = document.querySelector('#result');
    let resultChance = document.querySelector('#chance');
    let chances = 0;
    let cardsChosen = [];
    let cardsChosenId = [];
    let cardsWon = [];


    function createBoard() {
        grid.innerHTML = "";
        for (let i = 0; i < cardArray.length; i++) {
            let card = document.createElement('img');
            card.setAttribute('src', 'images/fundo.svg');
            card.setAttribute('data-id', i);
            card.addEventListener('click', flipCard)
            grid.appendChild(card);
        }
    }

    function checkForMatch() {
        let cards = document.querySelectorAll('img');
        const optionOneId = cardsChosenId[0];
        const optionTwoId = cardsChosenId[1];
        if (cardsChosen[0] === cardsChosen[1]) {
            // alert('Achou!');
            cards[optionOneId].setAttribute('src', 'images/white.svg');
            cards[optionTwoId].setAttribute('src', 'images/white.svg');
            cardsWon.push(cardsChosen);
        } else {
            cards[optionOneId].setAttribute('src', 'images/fundo.svg');
            cards[optionTwoId].setAttribute('src', 'images/fundo.svg');
            // alert('Tente novamente!');
        }
        cardsChosen = [];
        cardsChosenId = [];
        resultDisplay.textContent = cardsWon.length;
        if (cardsWon.length === cardArray.length / 2) {
            let tempo = parar();
            btnStart.disabled = false;
            btnRestart.disabled = true;
            grid.innerHTML = `<h3 id="parabens">Parabéns! </h3> <img src="./images/excited-svgrepo-com.svg"><h4 id=mensagem> Tentativas - ${chances} </br> Tempo - ${tempo} </h4>`;
        }


    }

    function flipCard() {
        if (cardsChosen.length <= 1){
            let cardId = this.getAttribute('data-id');
            cardsChosen.push(cardArray[cardId].name);
            cardsChosenId.push(cardId);
            this.setAttribute('src', cardArray[cardId].img);
            if (cardsChosen.length === 2) {
                setTimeout(checkForMatch, 600);
                chances++;
                resultChance.textContent = chances;
            }
        }
    }

    createBoard();

};

btnRestart.onclick = () => {
    parar();
    resetar();
    btnRestart.disabled = true;
    btnStart.disabled = false;
    const grid = document.querySelector('.grid');
    grid.innerHTML = `<h3 id="parabens">Você desistiu! </br> <img src="./images/stressed-svgrepo-com.svg"></h3>`;
}

const miliseg = document.querySelector('.milissegundos')
const seg = document.querySelector('.segundos')
const min = document.querySelector('.minutos')

let miliNum = 0;
let segNum = 0;
let minNum = 0;
let tempoTotal = 0;
let INTERVALO;

function milissegundos() {
    miliNum++
    if (miliNum < 10) {
        miliseg.innerHTML = '0' + miliNum;
    } else {
        miliseg.innerHTML = miliNum;
    }

    if (miliNum == 99) {
        miliNum = 0;
        segundos();
    }
}

function segundos() {
    segNum++
    if (segNum < 10) {
        seg.innerHTML = '0' + segNum;
    } else {
        seg.innerHTML = segNum;
    }

    if (segNum == 59) {
        segNum = 0;
        minutos();
    }
}

function minutos() {
    minNum++
    if (minNum < 10) {
        min.innerHTML = '0' + minNum;
    } else {
        min.innerHTML = minNum;
    }
}

function iniciar() {
    clearInterval(INTERVALO)
    INTERVALO = setInterval(() => {
        milissegundos();
    }, 10)
}

function parar() {
    clearInterval(INTERVALO);
    if (minNum === 0) {
        minNum = "00";
    }
    if (segNum < 10) {
        segNum = '0' + segNum;
    }
    if (miliNum < 10) {
        miliNum = '0' + miliNum;
    } 
    tempoTotal = minNum + ":" + segNum + ":" + miliNum;
    return tempoTotal
}

function resetar() {
    clearInterval(INTERVALO);
    miliNum = 0;
    segNum = 0;
    minNum = 0;
    miliseg.innerHTML = '00';
    seg.innerHTML = '00';
    min.innerHTML = '00';
}