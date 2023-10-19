"use strict"
// creo e chiamo una funzione che racchiude tutta la mia applicazione
myApp()
function myApp() {
    // catturo button in variabile
    const btn = document.querySelector("button");
    // metto il bottone in ascolto di un evento
    btn.addEventListener("click", generationGame);
    // creo la funzione che fa partire la generazione
    function generationGame() {

        // catturo il value della difficoltà scelta
        let difficulty = document.querySelector("select").value;

        // dichiaro e inizializzo il numero dei quadrati
        let numSquares = 0;

        // chiamo la funzione che genera n quadrati in base alla difficoltà scelta
        selectLevel(difficulty, numSquares);

        // catturo play-ground in variabile
        const playGround = document.getElementById("play-ground");

        // svuoto il play-ground come reset 
        playGround.innerHTML = "";

        let square;
        // creo il ciclo per stampare i quadrati
        for (let i = 0; i < numSquares; i++) {
            // genero un quadrato tramite funzione che si ripeterà in base al numero totale di quadrati
            square = drawSquare(numSquares, i);
            // appendo il quadrato nel playground
            playGround.append(square);
        }

        // affido il numero di bombe ad una costante
        const TOTAL_BOMBS = 16
        // creo un array dove pushare le bombe tramite funzione
        const bombs = bombGeneration(numSquares);

        // dichiaro la variabile di win/loss
        let gameOver;
        // inizializzo lo score
        let score = 0
        // inizializzo il msg per win/loss
        let msg;
        // dichiaro n tentativi per vincere
        const attemptsToWin = numSquares - TOTAL_BOMBS

        // WIN/LOSS OVERLAY
        const gameOverEl = document.getElementById("game-over")
        // Restart game
        gameOverEl.addEventListener("click", function () {
            generationGame()
            gameOverEl.classList.add("d-none")
        })

        /**
         *  APP FUNCTIONS
        */

        // DIFFICULTY SELECTION FN
        function selectLevel(difficultyFN, numSquaresFN) {
            numSquares = (difficulty === "lvl-1") ? 100 : (difficulty === "lvl-2") ? 81 : 49
        }

        // DRAWING FN
        function drawSquare(totalSquares, index) {
            // creo il quadrato
            const squareEl = document.createElement("div");
            // aggiungo al quadrato la classe .square
            squareEl.classList.add("square");
            // decido quanto sarà grande il quadrato in base al numero totale di quadrati
            let squareWidth = Math.sqrt(numSquares);
            squareEl.style.width = `calc(100% / ${squareWidth})`
            squareEl.style.height = squareEl.style.width
            // inserisco il numero nel quadrato
            squareEl.innerHTML = index + 1
            // aggiungo l'evento al click che fa cambiare il colore di sfondo del quadrato
            squareEl.addEventListener("click", onClick)
            /**
             * !! MAIN ALGORITHM OF MYAPP
             */
            function onClick() {
                // Conditions
                WLCondition()
                function WLCondition() {
                    // loss condition
                    if (bombs.includes(parseInt(squareEl.innerHTML))) {
                        squareEl.classList.add("bg-danger")
                        squareEl.innerHTML = `<i class="fa-solid fa-bomb fa-shake"></i>`
                        squareEl.removeEventListener("click", onClick)
                        gameOver = true;
                    }
                    // winning condition
                    else {
                        squareEl.classList.add("active");
                        score++;
                        squareEl.removeEventListener("click", onClick)
                        if (score === attemptsToWin) {
                            msg = "WINNER!!!"
                            gameOver = "win"
                        } else if (score === 0) {
                            msg = "Manco ci hai provato"
                        } else {
                            msg = "LOOSER!!!"
                        }
                    }
                }

                // score-counter
                document.getElementById("score-counter").innerHTML =
                    `
                Score : ${score}
                `
                // print clicked square on console
                console.log(squareEl.innerHTML);

                // GameoverlayFN
                gameOverFN()
                function gameOverFN() {
                    if (gameOver === true) {
                        gameOverEl.innerHTML =
                            `
                    <h2 class="display-1 fw-bold text-white">${msg}</h2>
                    <h3 class="display-5 text-white">Your score: ${score}</h3>
                    <p class="text-white fw-light py-5">Clicca sullo schermo per riprovare</p>
                    `
                        gameOverEl.classList.remove("d-none")
                        gameOverEl.classList.add("d-flex")


                    } else if (gameOver === "win") {
                        gameOverEl.innerHTML =
                            `
                    <h2 class="display-1 fw-bold text-white">${msg}</h2>
                    <h3 class="display-5 text-white">Your score: ${score}</h3>
                    `
                        gameOverEl.classList.remove("d-none")
                        gameOverEl.classList.add("d-flex")
                    }
                }

                
            }
            return squareEl
        }

        // BOMB GENERATION FN
        function bombGeneration(numSquaresFN) {
            const bombArray = [];
            while (bombArray.length < TOTAL_BOMBS) {
                let bomb = getRndInteger(1, numSquaresFN);
                if (!bombArray.includes(bomb)) {
                    bombArray.push(bomb)
                }
            }
            return bombArray
        }

    }

}
