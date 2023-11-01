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

/*----- cached elements  -----*/

// Game board tiles
const tiles = document.querySelectorAll("#tile");

// console.log(board[col][row])
// tiles.forEach((tile,index) => {
//     const row = Math.floor(index/8)
//     const col = index%8
//     tile.dataset.value = board[row][col]
// })
// console.log(tiles[0].dataset.value)

// Play pieces
const p1PieceEl = document.querySelectorAll(".p1-piece");
console.dir(p1PieceEl)
const p2PieceEl = document.querySelectorAll(".p2-piece");

// Dialogue/stat box
const p1TextEl = document.querySelector("#player1-prompt");
const p2TextEl = document.querySelector("#player2-prompt");
const chewyTextEl = document.querySelector("#chewy-phrase");
const p1ScoreEl = document.querySelector("#p1-score");
const p2ScoreEl = document.querySelector("#p2-score");


/*----- event listeners -----*/

// Player 1 clicks on piece to move
const p1AddHandlePieceEventListener = () => p1PieceEl.forEach((move) =>
  move.addEventListener("click", handlePieceClick)
);

const p1DltHandlePieceEventListener = () => p1PieceEl.forEach((move) =>
  move.removeEventListener("click", handlePieceClick)
);

const p2AddHandlePieceEventListener = () => p2PieceEl.forEach((move) =>
  move.addEventListener("click", handlePieceClick)
);

const p2DltHandlePieceEventListener = () => p1PieceEl.forEach((move) =>
  move.removeEventListener("click", handlePieceClick)
);

const addTileEventListener = () => tiles.forEach((place) =>
  place.addEventListener("click", handleTileClick)
);

const dltTileEventListener = () => tiles.forEach((place) =>
  place.removeEventListener("click", handleTileClick)
);


// for loop that iterates through the board variable and ties it's values to the tiless
for (let i = 0; i < tiles.length; i++) {
    const tile = tiles[i];
    row = Math.floor(i / 8);
    col = i % 8;
    tile.dataset.value = board[row][col];
  }

turn = true
p1AddHandlePieceEventListener()
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
    p1PieceEl.forEach(function(element){
        element.style.opacity = "1" 
    })
    p2PieceEl.forEach(function(element){
        element.style.opacity = "1" 
    })
    console.log(currentPiece)
    // return;
//   } if (currentPiece === piece) {
//     chewyTextEl.textContent = chewyPhrases[0];
//     piece.style.opacity = "1";
//     currentPiece = null;
//     console.log(currentPiece)
  } if (currentPiece) {
    chewyTextEl.textContent = chewyPhrases[0];
    currentPiece.style.opacity = "1";
  } if (piece && currentPiece !== piece){
    currentPiece = piece;
    chewyTextEl.textContent = chewyPhrases[0];
    piece.style.opacity = "0.3";
    addTileEventListener();
  }
  console.log(tileOfPiece);
  console.log(currentPiece);
  console.log(currentPiece.parentElement.dataset.value);
  
}

// To move selected piece to tile
function handleTileClick(e) {
  e.preventDefault();
  const clickedTile = e.target;
  tileNumber = clickedTile.dataset.value;
// //   let i;
  pieceOnTile = currentPiece.parentElement.dataset.value;
// //   for (i = 0; i < board.length; i++) {
// //     return i;
// //   }
// //   // console.log(board[row])
// //   // If select white tile -> invalid move
// //   if (tileNumber === null) {
// //     chewyTextEl.textContent = "invalid move";
// //     return;
// //   }
   if (tileNumber === undefined){
    console.log('waiting for tile to be selected')
   }else{
        validMove()
            if (p1ValidMove === false || p2ValidMove === false){
                chewyTextEl.textContent = "invalid move"
                console.log('piece is on tile' + pieceOnTile)
                console.log('invalid move. clicked on tile ' + tileNumber)
                return
            } else if (p1ValidMove === true || p2ValidMove === true){
                console.log('moved piece to' + pieceOnTile)
                currentPiece.classList.remove('p1-piece')
                console.dir(clickedTile)
                console.log(clickedTile.classList)
                // p1PieceEl.parentNode.removeChild(p1PieceEl)
                chewyDialogue()
            }
        }
//   if (
//     (turn === true &&
//       ((board[i] % 2 === 0 &&
//         (pieceOnTile - tileNumber >= -4 || pieceOnTile - tileNumber <= -3)) ||
//         (board[i] % 2 !== 0 &&
//           (pieceOnTile - tileNumber >= -5 ||
//             pieceOnTile - tileNumber <= -4)))) ||
//     (turn === false &&
//       ((board[i] % 2 === 0 &&
//         (pieceOnTile - tileNumber >= 3 || pieceOnTile - tileNumber <= 4)) ||
//         (board[i] % 2 !== 0 &&
//           (pieceOnTile - tileNumber >= 4 || pieceOnTile - tileNumber <= 5))))
//   ) 
//   {
//     pieceOnTile = tileNumber;
//     // } else if {
//   } else {
//     chewyTextEl.innerContent = "invalid move";
//     return;
//   }
//   if (clickedTile === clickedTile)
  clickedTile.style.opacity = '0.3'
  console.log(tileNumber)
  console.log(pieceOnTile)
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
function validMove(){
    console.log('tile number of current piece' + pieceOnTile)
    console.log('selected tile to move to' + tileNumber)
    if (turn === true && 
        (pieceOnTile === '9' && tileNumber === '13'))
        //   (((pieceOnTile >= 1 && pieceOnTile <= 4) || (pieceOnTile >= 9 && pieceOnTile <= 12) || (pieceOnTile >= 17 && pieceOnTile <= 20) || (pieceOnTile >= 25 && pieceOnTile <= 28)) &&
        //     (pieceOnTile - tileNumber >= -4 && pieceOnTile - tileNumber <= -3)) || ((pieceOnTile >= 5 && pieceOnTile <= 8) || (pieceOnTile >= 13 && pieceOnTile <= 16) || (pieceOnTile >= 21 && pieceOnTile <= 24)) && (pieceOnTile - tileNumber >= -5 &&
        //         pieceOnTile - tileNumber <= -4))
                {
                    p1ValidMove = true
                }else{
                    p1ValidMove = false
                }
    // if (turn === false &&
    //     (((pieceOnTile >= 9 && pieceOnTile <= 12) || (pieceOnTile >= 17 && pieceOnTile <= 20) || (pieceOnTile >= 25 && pieceOnTile <= 28)) &&
    //     (pieceOnTile - tileNumber >= 3 && pieceOnTile - tileNumber <= 4)) || ((pieceOnTile >= 5 && pieceOnTile <= 8) || (pieceOnTile >= 13 && pieceOnTile <= 16) || (pieceOnTile >= 21 && pieceOnTile <= 24) || (pieceOnTile >= 29 && pieceOnTile <= 32)) && (pieceOnTile - tileNumber >= 4 &&
    //         pieceOnTile - tileNumber <= 5)){
    //             p2ValidMove = true
    //         }else{
    //             p2ValidMove = false
    //         }
    console.log(p1ValidMove)
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

function chewyDialogue() {
  chewyTextEl.textContent =
    chewyPhrases[Math.floor(Math.random() * chewyPhrases.length)];
}

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

// }
