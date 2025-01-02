document.addEventListener('DOMContentLoaded', () => {
    const domandeData = [
        { categoria: "Storia", domanda: "Quando è caduto l'Impero Romano?", risposte: ["476 d.C.", "400 d.C.", "450 d.C.", "500 d.C."], rispostaCorretta: 0 },
        { categoria: "Geografia", domanda: "Qual è la capitale della Francia?", risposte: ["Parigi", "Roma", "Madrid", "Londra"], rispostaCorretta: 0 },
        { categoria: "Sport", domanda: "Chi ha vinto il Mondiale del 2006?", risposte: ["Italia", "Brasile", "Germania", "Francia"], rispostaCorretta: 0 },
        { categoria: "Cultura Generale", domanda: "Chi ha scritto 'Don Chisciotte'?", risposte: ["Cervantes", "Shakespeare", "Dante", "Hemingway"], rispostaCorretta: 0 },
        { categoria: "Scienze", domanda: "Cos'è l'acido solforico?", risposte: ["Un acido", "Un gas", "Un metallo", "Un alcol"], rispostaCorretta: 0 }
    ];

    const categorie = ["Storia", "Geografia", "Sport", "Cultura Generale", "Scienze"];
    const numeri = [1000, 2000, 3000, 4000, 8000];

    // Funzione per creare la griglia di domande
    const creaDomande = () => {
        const container = document.querySelector('.griglia');
        categorie.forEach((categoria, catIndex) => {
            const categoriaDiv = document.createElement('div');
            categoriaDiv.classList.add('categoria');

            const titoloCategoria = document.createElement('h3');
            titoloCategoria.textContent = categoria;
            categoriaDiv.appendChild(titoloCategoria);

            numeri.forEach((punteggio, index) => {
                // Creiamo un ellisse per ogni domanda
                const ellisse = document.createElement('button');
                ellisse.classList.add('ellisse');
                ellisse.textContent = ''; // Non ci sono numeri dentro l'ellisse
                ellisse.dataset.punteggio = punteggio;
                ellisse.dataset.categoria = categoria;
                ellisse.dataset.index = index;

                // Funzione per visualizzare la domanda
                ellisse.addEventListener('click', () => {
                    const questionScreen = document.getElementById('question-screen');
                    const domandaTitolo = document.getElementById('domanda-titolo');
                    const risposteDiv = document.getElementById('risposte');
                    const domandaData = domandeData.find(d => d.categoria === categoria && d !== domandeData[ellisse.dataset.index]);

                    // Mostra la domanda
                    domandaTitolo.textContent = domandaData.domanda;
                    risposteDiv.innerHTML = ''; // Pulisce le risposte

                    domandaData.risposte.forEach((risposta, i) => {
                        const buttonRisposta = document.createElement('button');
                        buttonRisposta.textContent = risposta;
                        buttonRisposta.addEventListener('click', () => {
                            if (i === domandaData.rispostaCorretta) {
                                questionScreen.style.backgroundColor = 'green'; // Risposta corretta
                            } else {
                                questionScreen.style.backgroundColor = 'red'; // Risposta sbagliata
                            }

                            // Disabilita l'ellisse
                            ellisse.disabled = true;
                            ellisse.style.backgroundColor = 'gray';

                            // Nascondi la domanda dopo 2 secondi
                            setTimeout(() => {
                                questionScreen.style.display = 'none';
                                document.getElementById('main-screen').style.display = 'flex';
                            }, 2000);
                        });
                        risposteDiv.appendChild(buttonRisposta);
                    });

                    // Nasconde la schermata principale
                    document.getElementById('main-screen').style.display = 'none';
                    questionScreen.style.display = 'flex'; // Mostra la schermata della domanda
                });

                const strisciaDiv = document.createElement('div');
                strisciaDiv.classList.add('striscia');
                const span = document.createElement('span');
                span.textContent = punteggio; // Mostriamo solo i numeri
                strisciaDiv.appendChild(span);
                strisciaDiv.appendChild(ellisse);
                categoriaDiv.appendChild(strisciaDiv);
            });

            container.appendChild(categoriaDiv);
        });
    };

    // Funzione per chiudere il modal
    document.getElementById('close-modal').onclick = () => {
        document.getElementById('question-screen').style.display = 'none';
        document.getElementById('main-screen').style.display = 'flex';
    };

    // Carica la griglia di domande
    creaDomande();
});
