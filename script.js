// Carica il file JSON
fetch('domande.json')
  .then(response => response.json())
  .then(data => {
    // Le domande sono ora nell'array "data"
    const domande = data;

    // Funzione per mostrare una domanda random
    function mostraDomanda() {
      const domandaRandom = domande[Math.floor(Math.random() * domande.length)];
      // ... codice per mostrare la domanda e le risposte
    }

    // Chiama la funzione per mostrare la prima domanda
    mostraDomanda();
  });
