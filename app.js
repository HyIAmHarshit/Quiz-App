const questions = [
  {
    question: "What is the real name of Iron Man?",
    answers: [
      { text: "Steve Rogers", correct: false },
      { text: "Bruce Banner", correct: false },
      { text: "Tony Stark", correct: true },
      { text: "Peter Parker", correct: false },
    ],
  },
  {
    question: "What powers Iron Man's suit?",
    answers: [
      { text: "Arc Reactor", correct: true },
      { text: "Nuclear Energy", correct: false },
      { text: "Magic", correct: false },
      { text: "Solar Power", correct: false },
    ],
  },
  {
    question: "What is the name of Iron Man's AI assistant?",
    answers: [
      { text: "FRIDAY", correct: false },
      { text: "Jarvis", correct: true },
      { text: "Karen", correct: false },
      { text: "Edith", correct: false },
    ],
  },
  {
    question: "Who is Iron Man’s best friend?",
    answers: [
      { text: "Doctor Strange", correct: false },
      { text: "Thor", correct: false },
      { text: "War Machine", correct: true },
      { text: "Loki", correct: false },
    ],
  },
  {
    question: "What is the name of Iron Man's company?",
    answers: [
      { text: "Stark Industries", correct: true },
      { text: "Wayne Enterprises", correct: false },
      { text: "Oscorp", correct: false },
      { text: "Hammer Tech", correct: false },
    ],
  },
];

const qelement = document.querySelector("#question");
const ansbtn = document.querySelector("#answer-button");
const nextbtn = document.querySelector("#next-btn");
const input = document.querySelector("#inp");

let currentquestionindex = 0;
let score = 0;

function startquiz() {
  currentquestionindex = 0;
  score = 0;
  nextbtn.innerHTML = "Next";
  showquestion();
  input.style.display="none";
  input.disabled=true;
}

function showquestion() {
  resetstate();
  let currentquestion = question[currentquestionindex];
  let questionno = currentquestionindex + 1;
  qelement.innerHTML = questionno + ". " + currentquestion.question;

  currentquestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    ansbtn.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectanswer);
  });
  input.disabled=true;
}

function resetstate() {
  nextbtn.style.display = "none";
  while (ansbtn.firstChild) {
    ansbtn.removeChild(ansbtn.firstChild);
  }
}

function selectanswer(e) {
  const selectedbtn = e.target;
  const iscorrect = selectedbtn.dataset.correct === "true";
  if (iscorrect) {
    selectedbtn.classList.add("correct");
    score++;
  } else {
    selectedbtn.classList.add("incorrect");
  }
  Array.from(ansbtn.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextbtn.style.display = "block";
}
function showscore(){
  resetstate();
  qelement.innerHTML = "Your score is " + score + "/" + question.length;
  input.style.display = "block";

  toggleButton()
  

}
function handlenextbutton(){
  currentquestionindex++;
  if(currentquestionindex < question.length){
    showquestion();
  }else{
    showscore();
  }
}
nextbtn.addEventListener("click",()=>{
  if(currentquestionindex<question.length){
    handlenextbutton();
  }else{
    startquiz();
  }
})

const scriptURL = 'https://script.google.com/macros/s/AKfycbzpCczh4oKQeqFMo9LcbNpCzRD2YbXaV_q64WngYFD6wMX8WQGfkandHJfe5xO8f_Wz/exec'
const form = document.forms['submit-to-google-sheet']

form.addEventListener('submit', e => {
  e.preventDefault()
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => console.log('Success!', response))
    .catch(error => console.error('Error!', error.message))
})

function toggleButton() {
  input.disabled=false;

  let inputField =input.value.trim(); 
  nextbtn.classList.add("sbtn");

  if (inputField === "") {
      nextbtn.style.display = "none";
  } else {
    nextbtn.innerHTML="Play Again";
    nextbtn.style.display = "block";
  }
}

 



startquiz();

