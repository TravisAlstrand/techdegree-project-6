// html element selectors
const welcomeScreen = document.getElementById('overlay');
const keysDiv = document.getElementById('qwerty');
const phraseDiv = document.getElementById('phrase');
const phraseUL = phraseDiv.firstElementChild;
const startBtn = document.querySelector('.btn__reset');

// counter for missed guesses
let missedGuess = 0;

// array of phrases to use
const phrases = [
    "life uhh finds a way",
    "clever girl",
    "hold on to your butts",
    "they left us",
    "we spared no expense",
    "if you gotta go you gotta go"
];

// listen for click on start button, hide welcome div, call a random phrase
startBtn.addEventListener('click', () => {
        welcomeScreen.style.display = "none";
        getRandomPhrase(phrases);
});

// get a random phrase index from phrases array
function getRandomPhrase(arr) {
    const randomPhrase = Math.floor(Math.random() * arr.length);

    // create new array from characters of the index's string
    const letterArray = arr[randomPhrase].split('');
    addPhraseToDisplay(letterArray);
}

// createLI and display it on screen
function addPhraseToDisplay(arr) {
    arr.forEach(text => {
        const li = document.createElement('li');
        li.textContent = text;

        if (element === " ") {
            li.className = "space";
        } else {
            li.className = "letter";
        }

        phraseUL.appendChild(li);
    });
}
