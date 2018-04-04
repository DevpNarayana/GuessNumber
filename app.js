/*
Game Functioning:
-Player must guess a number between a min and max
-Player gets a certain amount of guesses
-Notify player of guess remaining
-Notify the player of the  correct answer if he looses
-Let the player choose to play again
*/


// variables
let min = 1,
    max = 10,
    winningNumber = getRandomNum(min, max),
    guesseLeft = 3;

// UI elements

const game = document.querySelector('#game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.querySelector('#guess-btn'),
    guessInput = document.querySelector('#guess-input'),
    message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listner

game.addEventListener('mousedown', function(e) {
    if (e.target.className === 'play-again') {
        window.location.reload();
    }
})

// Listen for guess btn
guessBtn.addEventListener('click', function() {
    let guess = parseInt(guessInput.value);

    //validate
    if (isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    }

    // Check if won or not
    if (guess === winningNumber) {

        // Game over
        gameOver(true, `${guess} is Correct, YOU WIN!`);
    } else {
        // reduce the guesses count
        guesseLeft -= 1;
        // if any guesses left..
        if (guesseLeft === 0) {
            // Game over-lost msg
            gameOver(false, `Game is Over, YOU LOST, The Correct number was ${winningNumber}`);
        } else {

            guessInput.style.borderColor = 'red';
            guessInput.value = 1;
            // Game continues... answer wrong msg

            setMessage(`Guess is not Correct, ${guesseLeft} guesses left`, 'red');
        }


    }
});

function gameOver(won, msg) {
    let color = won ? 'green' : 'red';
    // don't allow to edit the input...
    guessInput.disabled = true;

    // change the border to green
    guessInput.style.borderColor = color;

    setMessage(msg, color);

    // play again
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';
}


// Get random winning number
function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function setMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg;
}