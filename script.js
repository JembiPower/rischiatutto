// Carica le domande dal file JSON
let domande = [];

// Fetch delle domande
fetch('domande.json')
    .then(response => response.json())
    .then(data => {
        domande = data;
        creaCerchi();
    })
    .catch(error => console.error('Errore nel caricamento delle domande:', error));

// Funzione per creare i cerchi delle domande
function creaCerchi() {
    const board = document.querySelector('.game-board');
    domande.forEach((domanda, index) => {
        const circle = document.createElement('div');
        circle.classList.add('circle');
        circle.textContent = domanda.categoria;
        circle.addEventListener('click', () => mostraDomanda(index));
        board.appendChild(circle);
    });
}

// Funzione per mostrare una domanda
function mostraDomanda(index) {
    const domanda = domande[index];
    const modal = document.getElementById('modal');
    const questionTitle = document.getElementById('question-title');
    const answersDiv = document.getElementById('answers');

    questionTitle.textContent = domanda.domanda;
    answersDiv.innerHTML = '';

    domanda.risposte.forEach((risposta, i) => {
        const button = document.createElement('button');
        button.textContent = risposta;
        button.addEventListener('click', () => verificaRisposta(i, domanda.rispostaCorretta));
        answersDiv.appendChild(button);
    });

    modal.style.display = 'flex';
}

// Funzione per verificare la risposta
function verificaRisposta(index, rispostaCorretta) {
    if (index === rispostaCorretta) {
        alert('Risposta Corretta!');
    } else {
        alert('Risposta Sbagliata!');
    }
    chiudiModale();
}

// Funzione per chiudere il modale
function chiudiModale() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}

// Chiudi modale con il bottone
document.getElementById('close-modal').addEventListener('click', chiudiModale);
