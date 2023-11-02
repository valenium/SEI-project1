/*----- constants -----*/
const board = [
  [1, null, 2, null, 3, null, 4, null],
  [null, 5, null, 6, null, 7, null, 8],
  [9, null, 10, null, 11, null, 12, null],
  [null, 13, null, 14, null, 15, null, 16],
  [17, null, 18, null, 19, null, 20, null],
  [null, 21, null, 22, null, 23, null, 24],
  [25, null, 26, null, 27, null, 28, null],
  [null, 29, null, 30, null, 31, null, 32],
];

const chewyPhrases = [
  "zzz",
  "2/10",
  "am bored",
  "can we go home",
  "mediocre at best",
  "k",
  "feed me",
  "wher r treats",
  "...",
  "meh",
  "Y",
  "h3ck",
  "am scared",
];

/*----- state variables -----*/
let turn;
let tileOfPiece = null;
let currentPiece = null;
let currentTile = null;
let clickedTile;
let p1ValidMove;
let p2ValidMove;
let row;
let col;
let pieceOnTile;
let tileNumber;
let isEnemyPiece;
let removeEnemyPiece;

/*----- cached elements  -----*/

// Game board tiles
const tiles = document.querySelectorAll("#tile");

tiles.forEach((tile, index) => {
  const row = Math.floor(index / 8);
  const col = index % 8;
  tile.dataset.value = board[row][col];
});

// Play pieces
let p1PieceEl = document.querySelectorAll(".p1-piece");
let p2PieceEl = document.querySelectorAll(".p2-piece");

// Dialogue/stat box
const p1TextEl = document.querySelector("#player1-prompt");
const p2TextEl = document.querySelector("#player2-prompt");
const chewyTextEl = document.querySelector("#chewy-phrase");
const p1ScoreEl = document.querySelector("#p1-score");
const p2ScoreEl = document.querySelector("#p2-score");

/*----- event listeners -----*/

// Player 1 clicks on piece to move
const p1AddHandlePieceEventListener = () =>
  p1PieceEl.forEach((move) => move.addEventListener("click", handlePieceClick));

// Delete P1 handle piece click event
const p1DltHandlePieceEventListener = () =>
  p1PieceEl.forEach((move) =>
    move.removeEventListener("click", handlePieceClick)
  );

// Player 2 clicks on piece to move
const p2AddHandlePieceEventListener = () =>
  p2PieceEl.forEach((move) => move.addEventListener("click", handlePieceClick));

// Delete P2 handle piece click event
const p2DltHandlePieceEventListener = () =>
  p2PieceEl.forEach((move) =>
    move.removeEventListener("click", handlePieceClick)
  );

// Move piece to tile event
const addTileEventListener = () =>
  tiles.forEach((place) => place.addEventListener("click", handleTileClick));

// Delete piece to tile event
const dltTileEventListener = () =>
  tiles.forEach((place) => place.removeEventListener("click", handleTileClick));

// for loop that iterates through the board variable and ties it's values to the tiless
for (let i = 0; i < tiles.length; i++) {
  const tile = tiles[i];
  row = Math.floor(i / 8);
  col = i % 8;
  tile.dataset.value = board[row][col];
}

turn = true;
p1AddHandlePieceEventListener();
indicatePlayerTurn();

// To select piece player wants to move
function handlePieceClick(e) {
  e.preventDefault();
  let piece = e.target;
  tileOfPiece = piece.parentElement;
  if (
    (turn === true && piece.id === "p2-piece") ||
    (turn === false && piece.id === "p1-piece")
    // currentPiece !== null
  ) {
    // Icebox - needs P2 event listener to be on but can live without it :)
    chewyTextEl.textContent = "not your turn! >:(";
    piece.style.opacity = "1";
    // currentPiece = null;
    p1PieceEl.forEach(function (element) {
      element.style.opacity = "1";
    });
    p2PieceEl.forEach(function (element) {
      element.style.opacity = "1";
    });
    console.log(currentPiece);
    // return;
    //   } if (currentPiece === piece) {
    //     chewyTextEl.textContent = chewyPhrases[0];
    //     piece.style.opacity = "1";
    //     currentPiece = null;
    //     console.log(currentPiece)
  }
  if (currentPiece) {
    chewyTextEl.textContent = chewyPhrases[0];
    currentPiece.style.opacity = "1";
  }
  if (piece && currentPiece !== piece) {
    currentPiece = piece;
    chewyTextEl.textContent = chewyPhrases[0];
    piece.style.opacity = "0.3";
    addTileEventListener();
    console.log("current piece = " + currentPiece.parentElement.dataset.value);
  }
}

// To move selected piece to tile
function handleTileClick(e) {
  e.preventDefault();
  clickedTile = e.target;
  tileNumber = clickedTile.dataset.value;
  // stores the tile number of the piece that player has clicked
  pieceOnTile = currentPiece.parentElement.dataset.value;
  if (tileNumber === undefined) {
    // console.log("waiting for tile to be selected");
  } else {
    validMove();
    // checks if there is a piece currently on tile being moved to
    if (
      clickedTile.firstElementChild.classList.contains("p1-piece") ||
      clickedTile.firstElementChild.classList.contains("p2-piece")
    ) {
      validMove();
      chewyTextEl.textContent = "invalid move";
    }
    else if (p1ValidMove === true || p2ValidMove === true) {
      console.log("moved piece to " + tileNumber);
      if (currentPiece.classList.contains("p1-piece")) {
        console.log("regular move is valid");
        currentPiece.removeAttribute("id");
        currentPiece.classList.remove("p1-piece");
        clickedTile.firstElementChild.classList.add("p1-piece");
        console.dir(clickedTile);
        console.log(clickedTile.firstElementChild.classList);
        chewyDialogue();
        p1DltHandlePieceEventListener();
        dltTileEventListener();
        p1TextEl.style.opacity = "0.3";
        p2TextEl.style.opacity = "1";
        turn = false;
        currentPiece = null;
        p1ValidMove = null;
        p2ValidMove = null;
        p2PieceEl = document.querySelectorAll(".p2-piece");
        p2AddHandlePieceEventListener();
      } else if (currentPiece.classList.contains("p2-piece")) {
        console.log("regular move is valid");
        currentPiece.removeAttribute("id");
        currentPiece.classList.remove("p2-piece");
        clickedTile.firstElementChild.classList.add("p2-piece");
        console.dir(clickedTile);
        console.log(clickedTile.firstElementChild.classList);
        chewyDialogue();
        p2DltHandlePieceEventListener();
        dltTileEventListener();
        p1TextEl.style.opacity = "1";
        p2TextEl.style.opacity = "0.3";
        turn = true;
        currentPiece = null;
        p1ValidMove = null;
        p2ValidMove = null;
        p1PieceEl = document.querySelectorAll(".p1-piece");
        p1AddHandlePieceEventListener();
      }
    } else if (removeEnemyPiece === true) {
      console.log("valid move to eat enemy piece");
      determineIfEnemyPiece();
      if (currentPiece !== null) {
      }
    }
  }

  function determineIfEnemyPiece() {
    console.log("piece on tile" + pieceOnTile + " tile number" + tileNumber);
    let enemyPiece;
    if (turn === true) {
      enemyPiece = Math.ceil(
        pieceOnTile * 1 + (tileNumber * 1 - pieceOnTile * 1) / 2
      );
      console.log(enemyPiece);
      console.dir(tiles);
      tiles.forEach((num, index) => {
        if (num.dataset.value == enemyPiece) {
          return (enemyTile = num);
        }
      });
      if (enemyTile.firstElementChild.classList.value === "p2-piece") {
        console.log("eating enemy piece");
        enemyTile.firstElementChild.classList.remove("p2-piece");
        currentPiece.removeAttribute("id");
        currentPiece.classList.remove("p1-piece");
        clickedTile.firstElementChild.classList.add("p1-piece");
        clickedTile.firstElementChild.style.opacity = "1";
        console.dir(enemyTile.firstElementChild.classList);
      } else {
      }
    }
    if (turn === false) {
      enemyPiece = Math.floor(
        pieceOnTile * 1 - (pieceOnTile * 1 - tileNumber * 1) / 2
      );
      tiles.forEach((num, index) => {
        if (num.dataset.value == enemyPiece) {
          return (enemyTile = num);
        }
      });
      console.log(enemyPiece);
      if (enemyTile.firstElementChild.classList.value === "p1-piece") {
        console.log("eating enemy piece");
        enemyTile.firstElementChild.classList.remove("p1-piece");
        currentPiece.removeAttribute("id");
        currentPiece.classList.remove("p2-piece");
        clickedTile.firstElementChild.classList.add("p2-piece");
        clickedTile.firstElementChild.style.opacity = "1";
        console.dir(enemyTile.firstElementChild.classList);
      } else {
      }
    }
  }
}

/*----- functions -----*/

// init()

// function init(){
// //     p1ScoreEl.innerText = p1PieceEl.length
// //     p2ScoreEl.innerText = p2PieceEl.length
// //     chewyTextEl.textContent = chewyPhrases[0]
// //     turn = true
// //     render()
//     turn = true
//     p1AddHandlePieceEventListener
// }

// function render(){
//     eventListenerSequence()
// }

// function playerTurn(){
//     if (turn === true){
//         for (let i=0;i<p1PieceEl.length; i++){
//             p1PieceEl[i].removeEventListener('click', handlePieceClick)
//         }
//         }else{
//             for (let i=0;i<p2PieceEl.length; i++){
//                 p2PieceEl[i].removeEventListener('click', handlePieceClick)
//         }
//     }
// }

function indicatePlayerTurn() {
  if (turn === true) {
    p1TextEl.style.opacity = "1";
    p2TextEl.style.opacity = "0.3";
  } else if (turn === false) {
    p1TextEl.style.opacity = "0.3";
    p2TextEl.style.opacity = "1";
  }
}

function endTurn() {
  if (turn === true) {
    p1DltHandlePieceEventListener();
    dltTileEventListener();
    turn === false;
    p2AddHandlePieceEventListener();
  }
}

function chewyDialogue() {
  chewyTextEl.textContent =
    chewyPhrases[Math.floor(Math.random() * chewyPhrases.length)];
}

function validMove() {
  let tileDifference = pieceOnTile - tileNumber;
  //   tileNumber;
  //   console.log("tile number of current piece" + pieceOnTile);
  //   console.log("selected tile to move to" + tileNumber);
  //   console.log("player turn" + turn);
  if (turn === true) {
    if (
      (pieceOnTile === "1" && tileNumber === "5") ||
      (pieceOnTile === "2" && tileNumber === "6") ||
      (pieceOnTile === "2" && tileNumber === "7") ||
      (pieceOnTile === "3" && tileNumber === "7") ||
      (pieceOnTile === "3" && tileNumber === "8") ||
      (pieceOnTile === "4" && tileNumber === "8") ||
      (pieceOnTile === "5" && tileNumber === "10") ||
      (pieceOnTile === "5" && tileNumber === "9") ||
      (pieceOnTile === "6" && tileNumber === "11") ||
      (pieceOnTile === "6" && tileNumber === "10") ||
      (pieceOnTile === "7" && tileNumber === "12") ||
      (pieceOnTile === "7" && tileNumber === "11") ||
      (pieceOnTile === "8" && tileNumber === "12") ||
      (pieceOnTile === "9" && tileNumber === "13") ||
      (pieceOnTile === "10" && tileNumber === "13") ||
      (pieceOnTile === "10" && tileNumber === "14") ||
      (pieceOnTile === "11" && tileNumber === "14") ||
      (pieceOnTile === "11" && tileNumber === "15") ||
      (pieceOnTile === "12" && tileNumber === "16") ||
      (pieceOnTile === "12" && tileNumber === "15") ||
      (pieceOnTile === "13" && tileNumber === "18") ||
      (pieceOnTile === "13" && tileNumber === "17") ||
      (pieceOnTile === "14" && tileNumber === "19") ||
      (pieceOnTile === "14" && tileNumber === "18") ||
      (pieceOnTile === "15" && tileNumber === "20") ||
      (pieceOnTile === "15" && tileNumber === "19") ||
      (pieceOnTile === "16" && tileNumber === "20") ||
      (pieceOnTile === "17" && tileNumber === "22") ||
      (pieceOnTile === "17" && tileNumber === "21") ||
      (pieceOnTile === "18" && tileNumber === "23") ||
      (pieceOnTile === "18" && tileNumber === "22") ||
      (pieceOnTile === "19" && tileNumber === "24") ||
      (pieceOnTile === "19" && tileNumber === "23") ||
      (pieceOnTile === "20" && tileNumber === "24") ||
      (pieceOnTile === "21" && tileNumber === "26") ||
      (pieceOnTile === "21" && tileNumber === "25") ||
      (pieceOnTile === "22" && tileNumber === "27") ||
      (pieceOnTile === "22" && tileNumber === "26") ||
      (pieceOnTile === "23" && tileNumber === "28") ||
      (pieceOnTile === "23" && tileNumber === "27") ||
      (pieceOnTile === "24" && tileNumber === "28") ||
      (pieceOnTile === "25" && tileNumber === "30") ||
      (pieceOnTile === "25" && tileNumber === "29") ||
      (pieceOnTile === "26" && tileNumber === "31") ||
      (pieceOnTile === "26" && tileNumber === "30") ||
      (pieceOnTile === "27" && tileNumber === "32") ||
      (pieceOnTile === "27" && tileNumber === "31") ||
      (pieceOnTile === "28" && tileNumber === "32")
    ) {
      p1ValidMove = true;
      console.log("p1ValidMove = " + p1ValidMove);
    } else if (tileDifference === -9 || tileDifference === -7) {
      removeEnemyPiece = true;
      //   console.log("can move piece to a different of tiles 7-9");
    } else {
      p1ValidMove = false;
    }
  } else if (turn === false) {
    if (
      (pieceOnTile === "5" && tileNumber === "2") ||
      (pieceOnTile === "5" && tileNumber === "1") ||
      (pieceOnTile === "6" && tileNumber === "3") ||
      (pieceOnTile === "6" && tileNumber === "2") ||
      (pieceOnTile === "7" && tileNumber === "4") ||
      (pieceOnTile === "7" && tileNumber === "3") ||
      (pieceOnTile === "8" && tileNumber === "4") ||
      (pieceOnTile === "13" && tileNumber === "9") ||
      (pieceOnTile === "13" && tileNumber === "10") ||
      (pieceOnTile === "14" && tileNumber === "10") ||
      (pieceOnTile === "14" && tileNumber === "11") ||
      (pieceOnTile === "15" && tileNumber === "11") ||
      (pieceOnTile === "15" && tileNumber === "12") ||
      (pieceOnTile === "16" && tileNumber === "12") ||
      (pieceOnTile === "17" && tileNumber === "13") ||
      (pieceOnTile === "18" && tileNumber === "13") ||
      (pieceOnTile === "18" && tileNumber === "14") ||
      (pieceOnTile === "19" && tileNumber === "15") ||
      (pieceOnTile === "19" && tileNumber === "14") ||
      (pieceOnTile === "20" && tileNumber === "16") ||
      (pieceOnTile === "20" && tileNumber === "15") ||
      (pieceOnTile === "21" && tileNumber === "17") ||
      (pieceOnTile === "21" && tileNumber === "18") ||
      (pieceOnTile === "22" && tileNumber === "18") ||
      (pieceOnTile === "22" && tileNumber === "19") ||
      (pieceOnTile === "23" && tileNumber === "19") ||
      (pieceOnTile === "23" && tileNumber === "20") ||
      (pieceOnTile === "24" && tileNumber === "20") ||
      (pieceOnTile === "25" && tileNumber === "21") ||
      (pieceOnTile === "26" && tileNumber === "22") ||
      (pieceOnTile === "26" && tileNumber === "21") ||
      (pieceOnTile === "27" && tileNumber === "22") ||
      (pieceOnTile === "27" && tileNumber === "23") ||
      (pieceOnTile === "28" && tileNumber === "23") ||
      (pieceOnTile === "28" && tileNumber === "24") ||
      (pieceOnTile === "29" && tileNumber === "25") ||
      (pieceOnTile === "29" && tileNumber === "26") ||
      (pieceOnTile === "30" && tileNumber === "26") ||
      (pieceOnTile === "30" && tileNumber === "27") ||
      (pieceOnTile === "31" && tileNumber === "27") ||
      (pieceOnTile === "31" && tileNumber === "28") ||
      (pieceOnTile === "32" && tileNumber === "28")
    ) {
      p2ValidMove = true;
      //   console.log("running P2 valid if statement");
    } else if (tileDifference === 7 || tileDifference === 9) {
      removeEnemyPiece = true;
      console.log("can move piece to a different of tiles 7-9");
    } else {
      p1ValidMove = false;
      // const tileDifference = pieceOnTile - tileNumber;
      // console.log(tileDifference)
      console.log("p2ValidMove = " + p2ValidMove);
    }
    //   } else if (
    //         (turn === true && (tileDifference === -9 || tileDifference === -7)) ||
    //         (turn === false && (tileDifference === 7 || tileDifference === 9))) {
    //           removeEnemyPiece = true
    //         //   p2ValidMove = false
    //         //   p1ValidMove = false
    //         //   console.log(tileDifference/2)
    //           console.log('removeEnemyPiece = '+removeEnemyPiece)
    //       } else {
    //         removeEnemyPiece = false
  }
  //   console.log(p2ValidMove);
}

// function countPieces(){
//     for(let i=0; i<p1PieceEl.length-1; i++){
//         console.log(p1PieceEl[i])
//     }
//     for(let j=0; j<p2PieceEl.length-1; j++){
//         console.log(p2PieceEl[j])
//     }
// }
// countPieces()
// console.dir(p1PieceEl)

// function render(){
//     trn
// }

// function runGame(){
//     if (continueGame()){

//     }else{
//         endGame()
//     }
// }

// function changeTurn(){}

// function continueGame(){
//     let keepRunning = true

// }

// function endGame(){
