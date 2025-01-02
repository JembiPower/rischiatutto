const data = {
  categories: [
    "Storia",
    "Geografia",
    "Sport",
    "Scienze",
    "Cultura Generale",
    "Arte"
  ],
  questions: [
    {
      category: "Storia",
      questions: [
        { text: "Qual è la capitale d'Italia?", answers: ["Roma", "Milano", "Napoli", "Torino"], correct: 0 },
        { text: "In che anno è iniziata la Prima Guerra Mondiale?", answers: ["1912", "1914", "1916", "1918"], correct: 1 }
      ]
    },
    {
      category: "Geografia",
      questions: [
        { text: "Qual è il monte più alto del mondo?", answers: ["Monte Bianco", "Monte Everest", "K2", "Kilimangiaro"], correct: 1 },
        { text: "Quale è il fiume più lungo d'Italia?", answers: ["Po", "Adige", "Arno", "Tevere"], correct: 0 }
      ]
    }
  ]
};

const categoriesContainer = document.getElementById('categories');
const overlay = document.getElementById('questionOverlay');
const questionText = document.getElementById('questionText');
const answersContainer = document.getElementById('answers');
let currentQuestion = null;

// Create category and question buttons
data.categories.forEach((categoryName, categoryIndex) => {
  const categoryData = data.questions.find(c => c.category === categoryName);
  if (categoryData) {
    const categoryDiv = document.createElement('div');
    categoryDiv.classList.add('category');
    categoryDiv.innerHTML = `<h2>${categoryName}</h2>`;
    const questionsDiv = document.createElement('div');
    questionsDiv.classList.add('questions');
    categoryData.questions.forEach((q, i) => {
      const button = document.createElement('button');
      button.classList.add('question-circle');
      button.innerText = i + 1;
      button.dataset.categoryIndex = categoryIndex;
      button.dataset.questionIndex = i;
      questionsDiv.appendChild(button);
    });
    categoryDiv.appendChild(questionsDiv);
    categoriesContainer.appendChild(categoryDiv);
  }
});

// Show question modal
categoriesContainer.addEventListener('click', event => {
  if (event.target.classList.contains('question-circle')) {
    const categoryIndex = event.target.dataset.categoryIndex;
    const questionIndex = event.target.dataset.questionIndex;
    currentQuestion = { categoryIndex, questionIndex };
    const questionData = data.questions[categoryIndex].questions[questionIndex];
    questionText.innerText = questionData.text;
    answersContainer.innerHTML = '';
    questionData.answers.forEach((answer, i) => {
      const answerButton = document.createElement('button');
      answerButton.innerText = answer;
      answerButton.addEventListener('click', () => checkAnswer(i));
      answersContainer.appendChild(answerButton);
    });
    overlay.classList.add('active');
  }
});

// Check answer
function checkAnswer(answerIndex) {
  const { categoryIndex, questionIndex } = currentQuestion;
  const questionData = data.questions[categoryIndex].questions[questionIndex];
  if (answerIndex === questionData.correct) {
    alert('Risposta corretta!');
    const button = document.querySelector(`button[data-category-index="${categoryIndex}"][data-question-index="${questionIndex}"]`);
    button.remove();
  } else {
    alert('Risposta sbagliata!');
  }
  overlay.classList.remove('active');
}
