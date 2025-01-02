const questions = [
    {
        "categoria": "Storia",
        "domanda": "In quale anno è scoppiata la Prima Guerra Mondiale?",
        "risposte": ["1914", "1939", "1917", "1945"],
        "rispostaCorretta": 0
    },
    {
        "categoria": "Storia",
        "domanda": "Chi era il leader dell'Unione Sovietica durante la Seconda Guerra Mondiale?",
        "risposte": ["Stalin", "Lenin", "Khrushchov", "Trotsky"],
        "rispostaCorretta": 0
    },
    // Aggiungi tutte le altre domande seguendo lo stesso formato
    // ...
];

// Funzione per caricare le domande nelle rispettive categorie
function loadQuestions() {
    const categories = ["Storia", "Geografia", "Sport", "Cultura Generale", "Scienze"];
    
    categories.forEach(category => {
        const categoryContainer = document.getElementById(category);
        const questionsContainer = categoryContainer.querySelector(".questions");

        const categoryQuestions = questions.filter(q => q.categoria === category);
        categoryQuestions.forEach((question, index) => {
            const button = document.createElement("button");
            button.textContent = index + 1;
            button.onclick = () => handleQuestionClick(button, question, index);
            questionsContainer.appendChild(button);
        });
    });
}

// Gestione del click su una domanda
function handleQuestionClick(button, question, index) {
    // Mostra la domanda e le risposte
    const userAnswer = prompt(`${question.domanda}\n\nA: ${question.risposte[0]}\nB: ${question.risposte[1]}\nC: ${question.risposte[2]}\nD: ${question.risposte[3]}`);
    const correctAnswer = question.risposte[question.rispostaCorretta];

    if (userAnswer && userAnswer.toLowerCase() === correctAnswer[0].toLowerCase()) {
        alert("Risposta corretta!");
    } else {
        alert("Risposta sbagliata!");
    }

    // Disabilita il pallino (pulsante)
    button.disabled = true;
    button.style.backgroundColor = "gray";
}

// Carica le domande al caricamento della pagina
window.onload = loadQuestions;
