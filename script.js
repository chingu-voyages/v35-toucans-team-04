// ---------- open and close quiz when button is clicked ------------ //
let quizBtn = document.querySelector(".quiz-btn");
let quiz = document.querySelector(".quiz");
let icon = document.querySelector(".exit-icon");

//add click event to quiz button
quizBtn.addEventListener("click", function() {

//open quiz window
  quiz.classList.add("open-quiz");
});

//add click event to exit icon
icon.addEventListener("click", function() {

//remove quiz window
  quiz.classList.remove("open-quiz");
});

//------------ select an answer on each question ------------ //

//select all possible choices
let quizChoices = document.querySelectorAll(".quiz-choice");

//add click eventto all choices
quizChoices.forEach(item => {
  item.addEventListener("click", function() {

    //get the parent of the clicked item
    let parent = this.parentNode;

    //get children of parent
    let children = parent.querySelectorAll(".quiz-choice");

    //remove the bg color to all children
    children.forEach(list => list.classList.remove("quiz-choice--active"));

    //add the bg color to the clicked item
    item.classList.add("quiz-choice--active");

  });
});
