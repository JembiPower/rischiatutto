document.addEventListener('DOMContentLoaded', () => {
    const domandeData = [
        // Inserisci qui i tuoi dati JSON delle domande
    ];

    const punteggi = {
        "Storia": 0,
        "Geografia": 0,
        "Sport": 0,
        "Cultura Generale": 0,
        "Scienze": 0
    };

    const categorie = ["Storia", "Geografia", "Sport", "Cultura Generale", "Scienze"];
    const domandePerCategoria = {
        "Storia": [],
        "Geografia": [],
        "Sport": [],
        "Cultura Generale": [],
        "Scienze": []
    };

    // Raggruppa le domande per categoria
    domandeData.forEach(domanda => {
        domandePerCategoria[domanda.categoria].push(domanda);
    });

    // Funzione per creare i pulsanti delle domande
    const creaDomande = (categoria, domande) => {
        const categoriaDiv = document.createElement('div');
        categoriaDiv.classList.add('categoria');

        const titoloCategoria = document.createElement('h3');
        titoloCategoria.textContent = categoria;
        categoriaDiv.appendChild(titoloCategoria);

        const numeri = [1000, 2000, 3000, 4000, 8000];
        const strisciaDiv = document.createElement('div');
        strisciaDiv.classList.add('striscia');

        numeri.forEach((punteggio, index) => {
            const domanda = domande[index];
            const button = document.createElement('button');
            button.classList.add('domanda');
            button.textContent = '●';
            button.dataset.categoria = categoria;
            button.dataset.punteggio = punteggio;
            button.dataset.domandaIndex = index;
            button.addEventListener('click', () => {
                const rispostaCorretta = confirm(`Hai risposto correttamente alla domanda di ${categoria}: ${domanda.domanda}?`);
                if (rispostaCorretta) {
                    punteggi[categoria] += punteggio;
                    document.getElementById(`punteggio-${categoria.toLowerCase().replace(' ', '-')}`).innerText = punteggi[categoria];
                }
                button.disabled = true;
            });

            const span = document.createElement('span');
            span.textContent = punteggio;
            strisciaDiv.appendChild(span);
            strisciaDiv.appendChild(button);
        });

        categoriaDiv.appendChild(strisciaDiv);
        return categoriaDiv;
    };

    const containerCategorie = document.querySelector('.categorie');
    categorie.forEach(categoria => {
        const categoriaDiv = creaDomande(categoria, domandePerCategoria[categoria]);
        containerCategorie.appendChild(categoriaDiv);
    });
});
