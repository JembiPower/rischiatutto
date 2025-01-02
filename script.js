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
                const domandaTesto = domanda.domanda;
                const modal = document.getElementById('modal');
                const domandaTextElement = document.getElementById('domanda-text');
                domandaTextElement.textContent = domandaTesto;

                // Mostra il modal
                modal.style.display = 'flex';

                // Funzione per rispondere correttamente
                document.getElementById('risposta-corretta').onclick = () => {
                    punteggi[categoria] += punteggio;
                    document.getElementById(`punteggio-${categoria.toLowerCase().replace(' ', '-')}`).innerText = punteggi[categoria];
                    button.disabled = true; // Disabilita il cerchio
                    button.style.backgroundColor = 'gray'; // Cambia il colore
                    modal.style.display = 'none'; // Nascondi il modal
                };

                // Funzione per rispondere sbagliato
                document.getElementById('risposta-sbagliata').onclick = () => {
                    button.disabled = true; // Disabilita il cerchio
                    button.style.backgroundColor = 'gray'; // Cambia il colore
                    modal.style.display = 'none'; // Nascondi il modal
                };
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

    // Chiudi il modal quando si clicca sulla X
    document.getElementById('close-modal').onclick = () => {
        document.getElementById('modal').style.display = 'none';
    };

    // Chiudi il modal quando si clicca fuori dal modal
    window.onclick = (event) => {
        const modal = document.getElementById('modal');
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
});
