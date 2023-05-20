// Letters
const letters = "abcdefghijklmnopqrstuvwxyz";

// Get Array From Letters
let lettersArray = Array.from(letters);

//Select Letters container
let lettersContainer = document.querySelector(".letters");

// Generate Letters
lettersArray.forEach(letter => {

  // Create Span
  let span = document.createElement("span");

  // Create Letter Text Node
  let theLetter = document.createTextNode(letter);

  // Append The Letter To Span
  span.appendChild(theLetter);

  // Add Class On Span 
  span.className = 'letter-box';

  // Append Span To The Letters Container
  lettersContainer.appendChild(span);

})


// Objects Of Words + Categories
const words = {
  programming: ["php", "javascript", "c", "css", "html", "java", "mysql", "python", "Node js", "Flutter"],
  animals: ["Beer", "Lion", "Donkey", "Dog","Cat","elephant", "bird", "mouse"],
  people: ["Osama", "Zaid", "Abdulah","Ahmad","Ali", "Saed", "Saad", "Omar", "Ayham", "Mohamad"],
  countries: ["syria","Palestine","Yamen", "Egypt", "Bahrain", "Qatar", "Saudi Arabia", "Iraq", "Jordon", "oman", "Lebanon", "Sudan", "Morocco"]
}

// Get Random Property
let allKeys = Object.keys(words);

// Random Number Depend On Keys Length
let randomPropNumber = Math.floor(Math.random() * allKeys.length);
// Category
let randomPropName = allKeys[randomPropNumber];
// Category Words
let randomPropValue = words[randomPropName];

// Random Number Depend On Words
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);
// The Chosen Word
let randomValueValue = randomPropValue[randomValueNumber];


// Set Category Info
document.querySelector(".game-info .category span").innerHTML = randomPropName;

// Select Letter Guess Element
let lettersGuessContainer = document.querySelector(".letters-guess");

// Convert Chosen Word To Array
let lettersAndSpace = Array.from(randomValueValue);

// Create Spans Depened On Word
lettersAndSpace.forEach(letter => {

  // Create Empty Span
  let emptySpan = document.createElement("span");
  // If Letter Is Space
  if (letter === ' ') {
    emptySpan.className = 'with-space';
  }
  // Append Spand To The Letter Guess Container
  lettersGuessContainer.appendChild(emptySpan);
});
// Select Guess Spans
let guessSpans = document.querySelectorAll(".letters-guess span");

// Set wrong Attempts
let wrongAttempts = 0;

// Select The draw Element
let theDraw = document.querySelector(".hangman-draw");

// Handle Clicking On Letters
document.addEventListener("click", (e) => {

  // Set The chose Status
  let theStatus = false;

  if (e.target.className === 'letter-box') {

    e.target.classList.add("clicked");

    //Get Clicked Letter
    let theClickedLetter = e.target.innerHTML.toLowerCase();
    
    // The chosen Word   
    let theChosenWord = Array.from(randomValueValue.toLowerCase());

    theChosenWord.forEach((wordLetter, wordIndex) => {
      //If the clicked Letter Equal To One Of The Chosen Word Letter
      if (theClickedLetter == wordLetter) {

        //set Status To Correct
        theStatus = true;
        // Loop In All Guess Spans
        guessSpans.forEach((span, spanIndex) => {

          if (wordIndex === spanIndex) {
            span.innerHTML = theClickedLetter;
          }
        });

      }
    });

    // If Letter Is Wrong
    if (theStatus !== true) {

      // Increase The Wrong Attempts
      wrongAttempts++;

      // Add Class Wrong On The Draw Element
      theDraw.classList.add(`wrong-${wrongAttempts}`);

      // Play Fail Sound
      document.getElementById("fail").play();

      if (wrongAttempts === 8) {
        endGame();
        lettersContainer.classList.add("finished");
      }
    } 
    else {
      // Play Success Sound
      document.getElementById("success").play();
    }

  }
});

//End Game Function
function endGame() {

  // Create Popup Div
  let div = document.createElement("div");

  
  // Create Text
  let divText = document.createTextNode(`Game Over, The Word Is: ${randomValueValue}`);

  //Append Text To Div
  div.appendChild(divText);

  // Add Class On Div
  div.className = 'popup'

  // Append To The Body
  document.body.appendChild(div);

  // Create Play Again Button
  let button = document.createElement("button");
  let buttonText = document.createTextNode("play again");
  button.appendChild(buttonText);
  document.body.querySelector(".popup").appendChild(button);

  button.addEventListener("click", () => {
    window.location.reload();
  })
}



