const startButton = document.getElementById("start");
const questionContainerElement = document.getElementById("question");
const questionElement = document.getElementById("content");
const answerButtonsElement = document.getElementById("options");
const nextButton = document.getElementById("next");
const imgElement = document.getElementById("imgcont");
let shuffledQuestions, currenQuestionIndex;
let questions;
fetch("data.json")
  .then(response => response.json())
  .then(json => questions = json);
startButton.addEventListener("click", startGame)
nextButton.addEventListener("click", () => {
    currenQuestionIndex++;
    nextQuestion()
})





function startGame(){
    startButton.classList.add("hide");
    questionContainerElement.classList.remove('hide');
    shuffledQuestions = questions.sort(()=> Math.random - .5);
    currenQuestionIndex = 0;
    nextQuestion();
}

function nextQuestion(){
    resetState();
    showQuestion(shuffledQuestions[currenQuestionIndex]);
    showImage(shuffledQuestions[currenQuestionIndex]);
}
function showQuestion(question){
    document.body.classList.remove("correct");
    document.body.classList.remove("wrong");
    questionElement.innerText = question.question;
    question.answers.forEach(answer =>{
        const button = document.createElement('span');
        button.classList.add("h-12","text-white","text-center","w-64","hover:bg-[#e0e0e091]");
        
        button.innerText = answer.text;
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButtonsElement.appendChild(button);
    })
}

function showImage(imag){
    [imag.img].forEach(imgsrc => {
        const img1 = document.createElement('img');
        img1.classList.add("rounded-xl","object-cover","object-center","max-w-xl")
        img1.src = imgsrc;
        imgElement.appendChild(img1);
    })
}
function resetState(){
    nextButton.classList.add("hide");
    while(answerButtonsElement.firstChild){
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
    while(imgElement.firstChild){
        imgElement.removeChild(imgElement.firstChild);
    }
}

function selectAnswer(e){
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body,correct);
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    if (shuffledQuestions.length > currenQuestionIndex + 1) {
        nextButton.classList.remove("hide");
      } else {
        startButton.classList.remove('hide')
        startButton.textContent = "Baştan başla";
      }
    
}

function setStatusClass(element, correct){
    clearStatusClass(element);
    if (correct) {
        element.classList.add("correct")
    }else{
        element.classList.add("wrong")
    }
}

function clearStatusClass(element){
    element.classList.remove("correct");
    element.classList.remove("wrong");
}