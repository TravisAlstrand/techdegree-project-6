// html element selectors
const welcomeScreen = document.getElementById('overlay');
const keysDiv = document.getElementById('qwerty');
const phraseDiv = document.getElementById('phrase');
const phraseUL = phraseDiv.firstElementChild;
const startBtn = document.querySelector('.btn__reset');
const scoreDiv = document.getElementById('scoreboard');
const scoreOL = scoreDiv.firstElementChild;

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
        getRandomPhraseAsArray(phrases);
});

// get a random phrase index from phrases array
function getRandomPhraseAsArray(arr) 
{
    const randomPhrase = Math.floor(Math.random() * arr.length);

    // create new array from characters of the index's string
    const letterArray = arr[randomPhrase].split('');
    addPhraseToDisplay(letterArray);
}

// createLI and display it on screen
function addPhraseToDisplay(arr) 
{
    arr.forEach(text => {
        const li = document.createElement('li');
        li.textContent = text;

        if (text === " ") {
            li.className = "space";
        } else {
            li.className = "letter";
        }

        phraseUL.appendChild(li);
    });
}

// listen for screen keyboard button click
// if guess is wrong, increment counter & remove heart
keysDiv.addEventListener('click', (e) => {
    if (e.target.tagName === "BUTTON" && e.target.className !== "chosen") 
    {
        e.target.className = "chosen";
        e.target.disabled = true;
        const matchResults = checkLetter(e.target);

        // check if the letter clicked matches a letter in phrase
        // show letter in phrase if so
        function checkLetter (btn) 
        {
            const letterLIs = phraseUL.children;
            let letterFound = null;

            for (i = 0; i < letterLIs.length; i++) 
            {
                if (btn.textContent === letterLIs[i].textContent) 
                {
                    letterLIs[i].className = "show";
                    letterFound += btn.textContent;
                }
            }
            return letterFound;
        }
            
        if (matchResults === null)
        {
            removeHeart();
            missedGuess++;
            console.log(matchResults);
            console.log(missedGuess);
        }
    }
});

// remove heart li and add empty heart li
function removeHeart()
{
    scoreOL.removeChild(scoreOL.firstChild);
    const lostHeart = document.createElement('li');
    scoreOL.append(lostHeart);
    lostHeart.insertAdjacentHTML("afterbegin", '<img src="images/lostHeart.png" height="35px" width="30px"></img>');
}