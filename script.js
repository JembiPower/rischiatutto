const questionsData = {
    categories: ["Storia", "Geografia", "Sport", "Scienze", "Cultura Generale", "Arte"],
    questions: [
        {
            category: "Storia",
            questions: [
                { text: "Qual è la capitale d'Italia?", answers: ["Roma", "Milano", "Napoli", "Torino"], correct: 0 },
                { text: "In che anno è iniziata la Prima Guerra Mondiale?", answers: ["1912", "1914", "1916", "1918"], correct: 1 },
                { text: "Chi ha scritto 'La Divina Commedia'?", answers: ["Petrarca", "Boccaccio", "Dante Alighieri", "Manzoni"], correct: 2 },
                { text: "In quale anno è caduto il Muro di Berlino?", answers: ["1987", "1989", "1991", "1993"], correct: 1 },
                { text: "Chi ha scoperto l'America?", answers: ["Vespucci", "Colombo", "Magellano", "Cortès"], correct: 1 }
            ]
        },
        {
            category: "Geografia",
            questions: [
                { text: "Qual è il monte più alto del mondo?", answers: ["Monte Bianco", "Monte Everest", "K2", "Kilimangiaro"], correct: 1 },
                { text: "Quale è il fiume più lungo d'Italia?", answers: ["Po", "Adige", "Arno", "Tevere"], correct: 0 },
                { text: "Quale oceano è il più grande?", answers: ["Atlantico", "Pacifico", "Indiano", "Artico"], correct: 1 },
                { text: "In quale continente si trova l'Egitto?", answers: ["Asia", "Africa", "Europa", "America"], correct: 1 },
                { text: "Quale è la capitale della Germania?", answers: ["Monaco", "Francoforte", "Amburgo", "Berlino"], correct: 3 }
            ]
        },
        {
            category: "Sport",
            questions: [
                { text: "Quale paese ha vinto il maggior numero di Coppe del Mondo di calcio?", answers: ["Italia", "Germania", "Brasile", "Argentina"], correct: 2 },
                { text: "Chi ha vinto più medaglie olimpiche nella storia?", answers: ["Phelps", "Bolt", "Lewis", "Nadia Comaneci"], correct: 0 },
                { text: "Quale squadra di calcio ha vinto più Champions League?", answers: ["Real Madrid", "Barcellona", "Milan", "Liverpool"], correct: 0 },
                { text: "Qual è il record mondiale per i 100 metri?", answers: ["9.58s", "9.62s", "9.72s", "9.80s"], correct: 0 },
                { text: "Chi è considerato il GOAT del basket?", answers: ["Michael Jordan", "LeBron James", "Kobe Bryant", "Magic Johnson"], correct: 0 }
            ]
        }
    ]
};

const gameBoard = document.getElementById('game-board');
const modal = document.getElementById('question-modal');
const questionText = document.getElementById('question-text');
const answersContainer = document.getElementById('answers');

// Creazione griglia
questionsData.categories.forEach((category, catIndex) => {
    const categoryTitle = document.createElement('div');
    categoryTitle.className = 'category';
    categoryTitle.textContent = category;
    gameBoard.appendChild(categoryTitle);

    for (let i = 0; i < 5; i++) {
        const ellipse = document.createElement('div');
        ellipse.className = 'ellipse';
        ellipse.dataset.category = catIndex;
        ellipse.dataset.question = i;
        ellipse.textContent = i + 1;
        ellipse.addEventListener('click', showQuestion);
        gameBoard.appendChild(ellipse);
    }
});

// Mostra domanda
function showQuestion(event) {
    const categoryIndex = event.target.dataset.category;
    const questionIndex = event.target.dataset.question;
    const question = questionsData.questions[categoryIndex].questions[questionIndex];

    if (!question) return;

    questionText.textContent = question.text;
    answersContainer.innerHTML = '';

    question.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.textContent = answer;
        button.addEventListener('click', () => checkAnswer(index, question.correct, event.target));
        answersContainer.appendChild(button);
    });

    modal.classList.remove('hidden');
}

// Controlla risposta
function checkAnswer(selectedIndex, correctIndex, ellipse) {
    if (selectedIndex === correctIndex) {
        alert('Risposta Corretta!');
        ellipse.classList.add('disabled');
        ellipse.removeEventListener('click', showQuestion);
    } else {
        alert('Risposta Sbagliata!');
    }
    modal.classList.add('hidden');
}
