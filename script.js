// Variabili globali
let domande = [];

// Carica le domande dal file JSON
fetch('domande.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Errore nel caricamento del file JSON');
        }
        return response.json();
    })
    .then(data => {
        domande = data;
        creaCerchi();
    })
    .catch(error => {
        console.error('Errore:', error);
        document.querySelector('.game-board').innerHTML = '<p>Errore nel caricamento delle domande.</p>';
    });

// Funzione per creare i cerchi delle domande
function creaCerchi() {
    const board = document.getElementById('game-board');
    if (domande.length === 0) {
        board.innerHTML = '<p>Nessuna domanda disponibile.</p>';
        return;
    }

    domande.forEach((domanda, index) => {
        const circle = document.createElement('div');
        circle.classList.add('circle');
        circle.textContent = domanda.categoria || 'Domanda';
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

    if (!domanda) {
        console.error('Domanda non trovata');
        return;
    }

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
        alert('✅ Risposta Corretta!');
    } else {
        alert('❌ Risposta Sbagliata!');
    }
    chiudiModale();
}

// Chiudi il modale
function chiudiModale() {
    document.getElementById('modal').style.display = 'none';
}

// Aggiungi evento per chiudere il modale
document.getElementById('close-modal').addEventListener('click', chiudiModale);
