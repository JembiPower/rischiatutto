document.addEventListener('DOMContentLoaded', () => {
    const domande = document.querySelectorAll('.domanda');
    const punteggi = {
        "Storia": 0,
        "Geografia": 0,
        "Sport": 0,
        "Cultura Generale": 0,
        "Scienze": 0
    };

    domande.forEach(button => {
        button.addEventListener('click', () => {
            const categoria = button.dataset.categoria;
            const punteggio = parseInt(button.dataset.punteggio);
            
            // Simula una domanda
            const rispostaCorretta = confirm(`Hai risposto correttamente alla domanda di ${categoria}?`);

            if (rispostaCorretta) {
                punteggi[categoria] += punteggio;
                document.getElementById(`punteggio-${categoria.toLowerCase().replace(' ', '-')}`).innerText = punteggi[categoria];
            }

            button.disabled = true; 
        });
    });
});
