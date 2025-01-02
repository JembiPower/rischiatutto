const domandeElement = document.querySelector('.domanda');
const risposteElement = document.querySelector('.risposte');
const punteggioElement = document.getElementById('punteggio');
const timerElement = document.getElementById('timer');
let punteggio = 0;
let tempoRimanente = 30;

// Carica le domande dal file JSON
fetch('domande.json')
  .then(response => response.json())
  .then(data => {
    const domande = data;

    // Funzione per mostrare una domanda
    function mostraDomanda(categoria) {
      // ... codice per mostrare la domanda e le risposte
    }

    // Gestisci il click sui pulsanti delle categorie
    document.querySelectorAll('.categoria-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const categoria = btn.dataset.categoria;
        mostraDomanda(categoria);
      });
    });
  });

// Funzioni per il timer, il punteggio, ecc.
// ...
