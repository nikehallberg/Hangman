const words = ["javascript", "pear", "apple", "grape", "element", "python", "hangman", "coding", "openai", "computer"];
const canvas = document.getElementById("hangmanCanvas");
/*document.getElementById("hangmanImage").src = file:///C:/Users/nikeh/Downloads/hangman-game-images/images/hangman-0.svg;*/ 
const ctx = canvas.getContext("2d");
let selectedWord = "";
let guessedLetters = [];
let remainingGuesses = 6;
let wrongGuessCount = 0;
function startGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    guessedLetters = [];
    remainingGuesses = 6;
    wrongGuessCount = 0;
    document.getElementById("message").textContent = "";
    document.getElementById("guessedLettersDisplay").textContent = "Guessed Letters: ";
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    updateDisplay();
}

function updateDisplay() {
    const wordDisplay = selectedWord.split("").map(letter =>
        guessedLetters.includes(letter) ? letter : "_"
    ).join(" ");
    document.getElementById("wordDisplay").textContent = wordDisplay;

    if (wordDisplay.replace(/ /g, "") === selectedWord) {
        document.getElementById("message").textContent = "Congratulations! You won!";
    } else if (remainingGuesses <= 0) {
        document.getElementById("message").textContent = `Game Over! The word was "${selectedWord}".`;
    }
}
function drawGallows() {
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#000";
    ctx.beginPath();
    ctx.moveTo(50, 350);
    ctx.lineTo(250, 350);
    ctx.moveTo(100, 350);
    ctx.lineTo(100, 50);
    ctx.moveTo(100, 50);
    ctx.lineTo(200, 50);
    ctx.moveTo(200, 50);
    ctx.lineTo(200, 100);
    ctx.stroke();
}
function drawHangman() {
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#000";
    ctx.beginPath();
    switch (wrongGuessCount) {
        case 1: 
            ctx.arc(200, 130, 30, 0, Math.PI * 2);
            break;
        case 2: 
            ctx.moveTo(200, 160);
            ctx.lineTo(200, 250);
            break;
        case 3: 
            ctx.moveTo(200, 180);
            ctx.lineTo(170, 220);
            break;
        case 4: 
            ctx.moveTo(200, 180);
            ctx.lineTo(230, 220);
            break;
        case 5: 
            ctx.moveTo(200, 250);
            ctx.lineTo(170, 310);
            break;
        case 6: 
            ctx.moveTo(200, 250);
            ctx.lineTo(230, 310);
            break;
    }
    ctx.stroke();
}

function guessLetter() {
    const guessInput = document.getElementById("guessInput");
    const guessedLetter = guessInput.value.toLowerCase().trim();

    if (!guessedLetter.match(/^[a-z]$/)) {
        document.getElementById("message").textContent = "Please enter a valid letter.";
        return;
    }

    if (guessedLetters.includes(guessedLetter)) {
        document.getElementById("message").textContent = "You already guessed that letter.";
        return;
    }

    if (remainingGuesses <= 0 || selectedWord.split("").every(l => guessedLetters.includes(l))) {
        document.getElementById("message").textContent = "The game is over. Restart to play again.";
        return;
    }

    guessedLetters.push(guessedLetter);
    document.getElementById("guessedLettersDisplay").textContent = `Guessed Letters: ${guessedLetters.join(", ")}`;

    if (selectedWord.includes(guessedLetter)) {
        document.getElementById("message").textContent = "Good guess!";
        /*document.getElementById("hangmanImage").src = file:///C:/Users/nikeh/Downloads/hangman-game-images/images/hangman-${wrongGuessCount}.svg;*/
    } else {
        remainingGuesses--;
        wrongGuessCount++;
        drawHangman();
        document.getElementById("message").textContent = `Wrong guess! ${remainingGuesses} guesses left.`;
    }

    guessInput.value = "";
    updateDisplay();
}

startGame();