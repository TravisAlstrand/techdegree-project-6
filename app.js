// html element selectors
const welcomeScreen = document.getElementById('overlay');
const keysDiv = document.getElementById('qwerty');
const phraseDiv = document.getElementById('phrase');
const phraseUL = phraseDiv.firstElementChild;
const startBtn = document.querySelector('.btn__reset');
const scoreDiv = document.getElementById('scoreboard');
const scoreOL = scoreDiv.firstElementChild;
const h2 = document.querySelector('h2');
const hearts = document.querySelectorAll('.tries img');
const keys = document.querySelectorAll('button');

// counter for missed guesses
let missedGuess = 0;

// array of phrases to use
const phrases = [
    "life uhh finds a way",
    "clever girl",
    "hold on to your butts",
    "they left us",
    "we spared no expense",
    "if you gotta go you gotta go",
    "wheres the goat",
    "nuh uh uh you didnt say the magic word"
];

// listen for click on start button, call start function (bottom screen)
startBtn.addEventListener('click', () => {
    startAGame();
});

// get a random phrase index from phrases array
function getRandomPhraseAsArray(arr) 
{
    const randomPhrase = Math.floor(Math.random() * arr.length);

    // create new array from characters of the index's string
    const letterArray = arr[randomPhrase].split('');
    addPhraseToDisplay(letterArray);
}

// createLI for each letter and display it on screen
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
// if guess is wrong, increment counter & change heart
keysDiv.addEventListener('click', (e) => {
    
    if (e.target.tagName === "BUTTON" && e.target.className !== "chosen") 
    {
        e.target.className = "chosen";
        e.target.disabled = true;
        const matchResults = checkLetter(e.target);

        // check if the letter clicked matches a letter in phrase
        // show letter in phrase if so
        function checkLetter(btn) 
        {
            const letterLIs = phraseUL.children;
            let letterFound = null;

            for (i = 0; i < letterLIs.length; i++) 
            {
                if (btn.textContent === letterLIs[i].textContent) 
                {
                    letterLIs[i].classList.add('show');
                    letterFound += btn.textContent;
                }
            }
            return letterFound;
        }
            
        if (matchResults === null)
        {
            missedGuess++;
            hearts[missedGuess - 1].src = "images/lostHeart.png";
        }
    }
    
    const liLetter = document.querySelectorAll('.letter');
    let liShow = document.querySelectorAll('.show');

    checkWin(liLetter.length, liShow.length);
});

function checkWin(letter, show) 
{
    if (show === letter && missedGuess < 5) 
    {
        showEndScreen("win", `You Won! <br> You're clever like a raptor!`, "win a");
    }
    else if (missedGuess === 5 && show !== letter)
    {
        showEndScreen("lose", `Oh No! <br> The T-Rex got you!`, "lose a");
    }
}

function showEndScreen(newClass, h2Text, btnClass)
{
    // change overlay class and h2 text
    welcomeScreen.className = newClass;
    h2.innerHTML = h2Text;
    // change button class/text
    startBtn.className = btnClass;
    startBtn.textContent = "Try Again?";
    // display screen
    welcomeScreen.style.display = "flex";
}

function startAGame()
{
    function fullHearts()
    {
        for (i = 0; i < hearts.length; i++)
        {
            hearts[i].src = "images/liveHeart.png";
        }
    }

    function newKeys()
    {
        for (i = 0; i < keys.length; i++)
        {
            keys[i].classList.remove("chosen");
            keys[i].disabled = false;
        }
    }

    function clearPhrase()
    {
        phraseUL.replaceChildren();
    }

    clearPhrase();
    newKeys();
    fullHearts();
    missedGuess = 0;
    welcomeScreen.style.display = "none";
    getRandomPhraseAsArray(phrases);
}