/*****************************************************************/
//--------converting to array and store answers/score------------//
/*****************************************************************/

// select all of quiz-choices(containers of each grouped choices)
let containers = document.querySelectorAll(".quiz-choices");
//convert nodeList to an array
let arrayOfChoicesCtn = Array.prototype.slice.call(containers);

//store scores here to be used when "get result button" is clicked
let addArray = [];


/*****************************************************************/
//------------- store the answers to addArray ------------------- //
//--------- select and deselect answers on each question -------- //
/*****************************************************************/

//select all choices/answer in each question
let quizChoice = document.querySelectorAll(".quiz-choice");

//add click event to all choices/answer
quizChoice.forEach(item => {
  item.addEventListener("click", function() {
    //get the parent of the clicked answer
    let parent = this.parentNode;
    //get index of the parent ctn
    let index = arrayOfChoicesCtn.indexOf(parent);
    //get the data score of the answer and convert to a number from string
    let num = Number(this.getAttribute("data-score"));
    //put the score/answer in the specific index inside addArray
    addArray[index] = num;


    //get all choices/answers of THIS parent
    let children = parent.querySelectorAll(".quiz-choice");
    //remove the bg color to all
    children.forEach(list => list.classList.remove("quiz-choice--active"));
    //add the bg color only to the clicked answer
    item.classList.add("quiz-choice--active");
  });
});


/*****************************************************************/
//------------------ compute, show result ----------------------- //
/*****************************************************************/
let submitBtn = document.querySelector(".submitBtn");
let form = document.getElementById("result-form");
let error = document.querySelector(".result-error");
let result = document.querySelector(".result-percentage");

//if submit button is not null, add click event and run stopEnter
if (submitBtn) {
  submitBtn.addEventListener("click", stopEnter);
};

function stopEnter() {
  //check if all questions were answered
  if (arrayOfChoicesCtn.length === addArray.length) {
    //get the sum of the answers and get %;
    let sum = Math.round((addArray.reduce((a, b) => {
      return a + b;
    }) / 40) * 100);
    //convert to string
    let str = sum.toString();
    //store in local storage
    localStorage.setItem("scoreInput", str);
    //redirect page
    form.submit();
  } else {
    /*if not all have answer, add submit event to prevent from
    entering the result page*/
    form.addEventListener("submit", function(e) {
      e.preventDefault();
    });
    //inform the user
    error.innerHTML = "*All questions are required.";
  };
};

//as window redirect
window.onload = function() {
  //get the stored score
  let storedInput = localStorage.getItem("scoreInput");
  //show in text
  if (result && storedInput) {
    result.textContent = storedInput + "%";
  };
  //clear local storage after loading
  localStorage.clear();
};


/*****************************************************************/
// -------- open and close quiz when button is clicked ---------- //
/*****************************************************************/
let quizBtn = document.querySelector(".quiz-btn");
let quiz = document.querySelector(".quiz");
let icon = document.querySelector(".exit-icon");

//add click event to quiz button if not null
if (quizBtn) {
  quizBtn.addEventListener("click", function() {
    //open quiz window
    quiz.classList.add("open-quiz");
  });
};
//add click event to exit icon if not null
if (icon) {
  icon.addEventListener("click", function() {
    //remove quiz window
    quiz.classList.remove("open-quiz");
    //empty array of scores/choices
    addArray = [];
    //remove active state of all choices
    quizChoice.forEach(list => {
      list.classList.remove("quiz-choice--active");
    });
  });
};
