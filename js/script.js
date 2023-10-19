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
        selectLevel(difficulty,numSquares);

        // catturo play-ground in variabile
        const playGround = document.getElementById("play-ground");

        // svuoto il play-ground come reset 
        playGround.innerHTML = "";

        // creo il ciclo per stampare i quadrati
        for (let i = 0; i < numSquares; i++) {
            // genero un quadrato tramite funzione che si ripeterà in base al numero totale di quadrati
            let square = drawSquare(numSquares,i);
            // appendo il quadrato nel playground
            playGround.append(square);
        }

        // affido il numero di bombe ad una costante
        const TOTAL_BOMBS = 16
        // creo un array dove pushare le bombe tramite funzione
        const bombs = bombGeneration(numSquares);
        console.log(bombs);


        /**
         *  APP FUNCTIONS
        */

        // DIFFICULTY SELECTION FN
        function selectLevel(difficultyFN,numSquaresFN) {
            numSquares = (difficulty === "lvl-1") ? 100 : (difficulty === "lvl-2") ? 81 : 49
        }

        // DRAWING FN
        function drawSquare(totalSquares,index) {
            // creo il quadrato
            const squareEl = document.createElement("div");
            // aggiungo al quadrato la classe .square
            squareEl.classList.add("square");
            // decido quanto sarà grande il quadrato in base al numero totale di quadrati
            let squareWidth = Math.sqrt(numSquares);
            squareEl.style.width = `calc(100% / ${squareWidth})`
            squareEl.style.height =  squareEl.style.width
            // inserisco il numero nel quadrato
            squareEl.innerHTML = index + 1 
            // aggiungo l'evento al click che fa cambiare il colore di sfondo del quadrato
            squareEl.addEventListener("click", function () {
                squareEl.classList.add("active")
                console.log(squareEl.innerHTML);
            })
            return squareEl
        }

        // BOMB GENERATION FN
        function bombGeneration(numSquaresFN) {
            const bombArray = [];
            while (bombArray.length < TOTAL_BOMBS) {
                let bomb = getRndInteger(1,numSquaresFN);
                if (!bombArray.includes(bomb)) {
                    bombArray.push(bomb)
                }
            }
            return bombArray
        }


    }

}
