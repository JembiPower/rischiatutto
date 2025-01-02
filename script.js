const categories = [
    "Storia",
    "Geografia",
    "Sport",
    "Scienze",
    "Cultura Generale",
    "Arte"
];

const questions = [
    // Domande prese dal JSON dell'utente (qui dovresti caricare il JSON o copiarlo)
    // Ogni categoria avrà un array con le sue domande
];

const teams = [
    { name: "Squadra 1", points: 0 },
    { name: "Squadra 2", points: 0 },
    { name: "Squadra 3", points: 0 },
    { name: "Squadra 4", points: 0 }
];

const gameBoard = document.getElementById("game-board");

// Crea la griglia
categories.forEach((category, index) => {
    const column = document.createElement("div");
    column.classList.add("column");

    const header = document.createElement("h2");
    header.textContent = category;
    column.appendChild(header);

    for (let i = 0; i < 5; i++) {
        const circle = document.createElement("div");
        circle.classList.add("circle");
        circle.textContent = `${(i + 1) * 1000}`;
        circle.dataset.category = index;
        circle.dataset.questionIndex = i;
        column.appendChild(circle);
    }

    gameBoard.appendChild(column);
});

// Gestione click sui cerchi
let usedQuestions = [];

gameBoard.addEventListener("click", (event) => {
    const target = event.target;

    if (target.classList.contains("circle")) {
        const categoryIndex = target.dataset.category;
        const questionIndex = target.dataset.questionIndex;

        // Verifica se la domanda è già stata usata
        const questionId = `${categoryIndex}-${questionIndex}`;
        if (usedQuestions.includes(questionId)) return;
        usedQuestions.push(questionId);

        // Seleziona la squadra
        const teamIndex = parseInt(prompt("Inserisci il numero della squadra (1-4):")) - 1;
        if (teamIndex < 0 || teamIndex >= teams.length) return;

        // Mostra la domanda
        const question = questions[categoryIndex].questions[questionIndex];
        const userAnswer = prompt(question.text + "\n" + question.answers.join("\n"));

        if (parseInt(userAnswer) === question.correct) {
            alert("Risposta corretta!");
            teams[teamIndex].points += question.points;
        } else {
            alert("Risposta sbagliata!");
            teams[teamIndex].points -= question.points;
        }

        // Aggiorna lo stato del cerchio
        target.classList.add("used");

        // Controlla se il gioco è finito
        if (usedQuestions.length === categories.length * 5) {
            let scores = teams.map(team => `${team.name}: ${team.points} punti`).join("\n");
            alert(`Il gioco è finito!\n\n${scores}`);
        }
    }
});
