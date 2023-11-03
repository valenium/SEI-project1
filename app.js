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
let enemyPieceGoneAction;
let isKing;

/*----- cached elements  -----*/

// Game board tiles
const tiles = document.querySelectorAll("#tile");

// Assigns tile pieces a value from the board variable
tiles.forEach((tile, index) => {
  const row = Math.floor(index / 8);
  const col = index % 8;
  tile.dataset.value = board[row][col];
});

// Play pieces
let p1PieceEl = document.querySelectorAll(".p1-piece");
let p2PieceEl = document.querySelectorAll(".p2-piece");

let p1KingEl = document.querySelectorAll(".p1-king");
let p2KingEl = document.querySelectorAll(".p2-king");

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

// P1 king piece piece handle
const kingP1AddHandlePieceEventListener = () =>
  p1KingEl.forEach((move) => move.addEventListener("click", handlePieceClick));

// P1 king piece piece handle
const kingP2AddHandlePieceEventListener = () =>
  p2KingEl.forEach((move) => move.addEventListener("click", handlePieceClick));

// Delete P1 king piece handle
const dltKingP1AddHandlePieceEventListener = () =>
  p1KingEl.forEach((move) =>
    move.removeEventListener("click", handlePieceClick)
  );

// Delete P2 king piece piece handle
const dltKingP2AddHandlePieceEventListener = () =>
  p2KingEl.forEach((move) =>
    move.removeEventListener("click", handlePieceClick)
  );

// for loop that iterates through the board variable and ties it's values to the tiless
for (let i = 0; i < tiles.length; i++) {
  const tile = tiles[i];
  row = Math.floor(i / 8);
  col = i % 8;
  tile.dataset.value = board[row][col];
}

// To select piece player wants to move
function handlePieceClick(e) {
  e.preventDefault();
  let piece = e.target;
  tileOfPiece = piece.parentElement;
  if (currentPiece) {
    currentPiece.style.opacity = "1";
  }
  if (piece && currentPiece !== piece) {
    currentPiece = piece;
    piece.style.opacity = "0.3";
    addTileEventListener();
    console.log("current piece = " + currentPiece.parentElement.dataset.value);
  }
  else {
    piece.style.opacity = "0.3"
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
    console.log("waiting for tile to be selected");
    // prevents code from running unless a tile has been selected
  } else {
    validMove();
    // checks if there is a piece currently on tile being moved to
    if (
      clickedTile.firstElementChild.classList.contains("p1-piece") ||
      clickedTile.firstElementChild.classList.contains("p2-piece") ||
      clickedTile.firstElementChild.classList.contains("p1-king") ||
      clickedTile.firstElementChild.classList.contains("p2-king")
    ) {
      validMove();
      // if the move has been determined as a valid move
    } else if (p1ValidMove === true || p2ValidMove === true) {
      console.log("moved piece to " + tileNumber);
      if (currentPiece.classList.contains("p1-piece")) {
        // action taken to move a P1 piece
        currentPiece.removeAttribute("id");
        currentPiece.classList.remove("p1-piece");
        clickedTile.firstElementChild.classList.add("p1-piece");
        if (isKing === true) {
          clickedTile.firstElementChild.classList.remove("p1-piece");
          clickedTile.firstElementChild.classList.add("p1-king");
        }
        turn = false;
        render();
      } else if (currentPiece.classList.contains("p2-piece")) {
        // action taken to move a P2 piece
        currentPiece.removeAttribute("id");
        currentPiece.classList.remove("p2-piece");
        clickedTile.firstElementChild.classList.add("p2-piece");
        if (isKing === true) {
          clickedTile.firstElementChild.classList.remove("p2-piece");
          clickedTile.firstElementChild.classList.add("p2-king");
        }
        turn = true;
        render();
        // action taken to move a P1 king piece
      } else if (currentPiece.classList.contains("p1-king")) {
        currentPiece.removeAttribute("id");
        currentPiece.classList.remove("p1-king");
        clickedTile.firstElementChild.classList.add("p1-king");
        turn = false;
        render();
        
      } else if (currentPiece.classList.contains("p2-king")) {
        currentPiece.removeAttribute("id");
        currentPiece.classList.remove("p2-king");
        clickedTile.firstElementChild.classList.add("p2-king");
        turn = true;
        render();
      }
    } else if (removeEnemyPiece === true) {
      console.log("valid move to eat enemy piece");
      determineIfEnemyPiece();
      if (enemyPieceGoneAction === true && turn === true) {
        turn = false;
        render();
      } else if (enemyPieceGoneAction === true && turn === false) {
        turn = true;
        render();
      } else {
        console.log('try again');
      }
    }
  }

  function determineIfEnemyPiece() {
    console.log("piece on tile" + pieceOnTile + " tile number" + tileNumber);
    let enemyPiece;
    if (turn === true && currentPiece.classList.contains("p1-piece")) {
      if (
        pieceOnTile == 5 ||
        pieceOnTile == 6 ||
        pieceOnTile == 7 ||
        pieceOnTile == 8 ||
        pieceOnTile == 13 ||
        pieceOnTile == 14 ||
        pieceOnTile == 15 ||
        pieceOnTile == 16 ||
        pieceOnTile == 21 ||
        pieceOnTile == 22 ||
        pieceOnTile == 23 ||
        pieceOnTile == 24
      ) {
        enemyPiece = Math.ceil(
          pieceOnTile * 1 + (tileNumber * 1 - pieceOnTile * 1) / 2
        );
        tiles.forEach((num) => {
          if (num.dataset.value == enemyPiece) {
            return (enemyTile = num);
          }
        });
        if (enemyTile.firstElementChild.classList.value === "p2-piece" || enemyTile.firstElementChild.classList.value === "p2-king") {
          console.log("eating enemy piece");
          enemyTile.firstElementChild.classList.remove("p2-piece");
          enemyTile.firstElementChild.classList.remove("p2-king");
          currentPiece.removeAttribute("id");
          currentPiece.classList.remove("p1-piece");
          clickedTile.firstElementChild.classList.add("p1-piece");
          clickedTile.firstElementChild.style.opacity = "1";
          if (isKing === true) {
            clickedTile.firstElementChild.classList.remove("p1-piece");
            clickedTile.firstElementChild.classList.add("p1-king");
          }
          changeScore();
          enemyPieceGoneAction = true;
        } else {
          enemyPieceGoneAction = false;
        }
      } else if (
        pieceOnTile == 1 ||
        pieceOnTile == 2 ||
        pieceOnTile == 3 ||
        pieceOnTile == 4 ||
        pieceOnTile == 9 ||
        pieceOnTile == 10 ||
        pieceOnTile == 11 ||
        pieceOnTile == 12 ||
        pieceOnTile == 17 ||
        pieceOnTile == 18 ||
        pieceOnTile == 19 ||
        pieceOnTile == 20
      ) {
        enemyPiece = Math.floor(
          pieceOnTile * 1 + (tileNumber * 1 - pieceOnTile * 1) / 2
        );
        tiles.forEach((num) => {
          if (num.dataset.value == enemyPiece) {
            return (enemyTile = num);
          }
        });
        if (enemyTile.firstElementChild.classList.value === "p2-piece" || enemyTile.firstElementChild.classList.value === "p2-king") {
          console.log("eating enemy piece");
          enemyTile.firstElementChild.classList.remove("p2-piece");
          enemyTile.firstElementChild.classList.remove("p-king");
          currentPiece.removeAttribute("id");
          currentPiece.classList.remove("p1-piece");
          clickedTile.firstElementChild.classList.add("p1-piece");
          clickedTile.firstElementChild.style.opacity = "1";
          if (isKing === true) {
            clickedTile.firstElementChild.classList.remove("p2-piece");
            clickedTile.firstElementChild.classList.add("p2-king");
          }
          changeScore();
          enemyPieceGoneAction = true;
        } else {
          enemyPieceGoneAction = false;
        }
      }
    } else if (turn === false && currentPiece.classList.contains("p2-piece")) {
      if (
        pieceOnTile == 13 ||
        pieceOnTile == 14 ||
        pieceOnTile == 15 ||
        pieceOnTile == 16 ||
        pieceOnTile == 21 ||
        pieceOnTile == 22 ||
        pieceOnTile == 23 ||
        pieceOnTile == 24 ||
        pieceOnTile == 29 ||
        pieceOnTile == 30 ||
        pieceOnTile == 31 ||
        pieceOnTile == 32
      ) {
        enemyPiece = Math.ceil(
          pieceOnTile * 1 - (pieceOnTile * 1 - tileNumber * 1) / 2
        );
        tiles.forEach((num) => {
          if (num.dataset.value == enemyPiece) {
            return (enemyTile = num);
          }
        });
        if (enemyTile.firstElementChild.classList.value === "p1-piece" || enemyTile.firstElementChild.classList.value === "p1 -king") {
          console.log("eating enemy piece");
          enemyTile.firstElementChild.classList.remove("p1-piece");
          enemyTile.firstElementChild.classList.remove("p1-king");
          currentPiece.removeAttribute("id");
          currentPiece.classList.remove("p2-piece");
          clickedTile.firstElementChild.classList.add("p2-piece");
          clickedTile.firstElementChild.style.opacity = "1";
          changeScore();
          enemyPieceGoneAction = true;
        } else {
          enemyPieceGoneAction = false;
        }
      } else if (
        pieceOnTile == 9 ||
        pieceOnTile == 10 ||
        pieceOnTile == 11 ||
        pieceOnTile == 12 ||
        pieceOnTile == 17 ||
        pieceOnTile == 18 ||
        pieceOnTile == 19 ||
        pieceOnTile == 20 ||
        pieceOnTile == 25 ||
        pieceOnTile == 26 ||
        pieceOnTile == 27 ||
        pieceOnTile == 28
      ) {
        enemyPiece = Math.floor(
          tileNumber * 1 + (pieceOnTile * 1 - tileNumber * 1) / 2
        );
        tiles.forEach((num) => {
          if (num.dataset.value == enemyPiece) {
            return (enemyTile = num);
          }
        });
        if (enemyTile.firstElementChild.classList.value === "p1-piece" || enemyTile.firstElementChild.classList.value === "p1-king") {
          console.log("eating enemy piece");
          enemyTile.firstElementChild.classList.remove("p1-piece");
          enemyTile.firstElementChild.classList.remove("p1-king");
          currentPiece.removeAttribute("id");
          currentPiece.classList.remove("p2-piece");
          clickedTile.firstElementChild.classList.add("p2-piece");
          clickedTile.firstElementChild.style.opacity = "1";
          changeScore();
          enemyPieceGoneAction = true;
        } else {
          enemyPieceGoneAction = false;
        }
      }
    } else if (currentPiece.classList.contains("p1-king") || currentPiece.classList.contains("p2-king")) {
      if (
        pieceOnTile == 5 ||
        pieceOnTile == 6 ||
        pieceOnTile == 7 ||
        pieceOnTile == 8 ||
        pieceOnTile == 13 ||
        pieceOnTile == 14 ||
        pieceOnTile == 15 ||
        pieceOnTile == 16 ||
        pieceOnTile == 21 ||
        pieceOnTile == 22 ||
        pieceOnTile == 23 ||
        pieceOnTile == 24
      ) {
        enemyPiece = Math.ceil(
          pieceOnTile * 1 + (tileNumber * 1 - pieceOnTile * 1) / 2
        );
        tiles.forEach((num) => {
          if (num.dataset.value == enemyPiece) {
            return (enemyTile = num);
          }
        });
        if (enemyTile.firstElementChild.classList.value === "p1-king" || enemyTile.firstElementChild.classList.value==="p1-piece") {
          p2ActionRemovePiece()
        } else if (enemyTile.firstElementChild.classList.value === "p2-king" || enemyTile.firstElementChild.classList.value === "p2-piece") {
          p1ActionRemovePiece()
        }
      }
      else if (
      pieceOnTile == 9 ||
      pieceOnTile == 10 ||
      pieceOnTile == 11 ||
      pieceOnTile == 12 ||
      pieceOnTile == 17 ||
      pieceOnTile == 18 ||
      pieceOnTile == 19 ||
      pieceOnTile == 20 ||
      pieceOnTile == 25 ||
      pieceOnTile == 26 ||
      pieceOnTile == 27 ||
      pieceOnTile == 28
    ) {
      enemyPiece = Math.floor(
        tileNumber * 1 + (pieceOnTile * 1 - tileNumber * 1) / 2
      );
      tiles.forEach((num) => {
        if (num.dataset.value == enemyPiece) {
          return (enemyTile = num);
        }
      });
      if (enemyTile.firstElementChild.classList.value === "p1-king" || enemyTile.firstElementChild.classList.value==="p1-piece") {
        p2ActionRemovePiece()
      } else if (enemyTile.firstElementChild.classList.value === "p2-king" || enemyTile.firstElementChild.classList.value === "p2-piece") {
        p1ActionRemovePiece()
      }
    } else if (
      pieceOnTile == 13 ||
        pieceOnTile == 14 ||
        pieceOnTile == 15 ||
        pieceOnTile == 16 ||
        pieceOnTile == 21 ||
        pieceOnTile == 22 ||
        pieceOnTile == 23 ||
        pieceOnTile == 24 ||
        pieceOnTile == 29 ||
        pieceOnTile == 30 ||
        pieceOnTile == 31 ||
        pieceOnTile == 32
      ) {
        enemyPiece = Math.ceil(
          pieceOnTile * 1 - (pieceOnTile * 1 - tileNumber * 1) / 2
        );
        tiles.forEach((num) => {
          if (num.dataset.value == enemyPiece) {
            return (enemyTile = num);
          }
        });
        if (enemyTile.firstElementChild.classList.value === "p1-king" || enemyTile.firstElementChild.classList.value==="p1-piece") {
          p2ActionRemovePiece()
        } else if (enemyTile.firstElementChild.classList.value === "p2-king" || enemyTile.firstElementChild.classList.value === "p2-piece") {
          p1ActionRemovePiece()
        }
      } else if (
        pieceOnTile == 1 ||
        pieceOnTile == 2 ||
        pieceOnTile == 3 ||
        pieceOnTile == 4 ||
        pieceOnTile == 9 ||
        pieceOnTile == 10 ||
        pieceOnTile == 11 ||
        pieceOnTile == 12 ||
        pieceOnTile == 17 ||
        pieceOnTile == 18 ||
        pieceOnTile == 19 ||
        pieceOnTile == 20
      ) {
        enemyPiece = Math.floor(
          pieceOnTile * 1 + (tileNumber * 1 - pieceOnTile * 1) / 2
        );
        tiles.forEach((num) => {
          if (num.dataset.value == enemyPiece) {
            return (enemyTile = num);
          }
        });
        if (enemyTile.firstElementChild.classList.value === "p1-king" || enemyTile.firstElementChild.classList.value==="p1-piece") {
          p2ActionRemovePiece()
        } else if (enemyTile.firstElementChild.classList.value === "p2-king" || enemyTile.firstElementChild.classList.value === "p2-piece") {
          p1ActionRemovePiece()
        }
  }}}

  function validMove() {
    let tileDifference = pieceOnTile - tileNumber;
    if (
      currentPiece.classList.contains("p1-king") ||
      currentPiece.classList.contains("p2-king")
    ) {
      if (
        (pieceOnTile === "1" && tileNumber === "5") ||
        (pieceOnTile === "2" && tileNumber === "6") ||
        (pieceOnTile === "2" && tileNumber === "5") ||
        (pieceOnTile === "3" && tileNumber === "7") ||
        (pieceOnTile === "3" && tileNumber === "6") ||
        (pieceOnTile === "4" && tileNumber === "8") ||
        (pieceOnTile === "4" && tileNumber === "7") ||
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
        (pieceOnTile === "18" && tileNumber === "21") ||
        (pieceOnTile === "18" && tileNumber === "22") ||
        (pieceOnTile === "19" && tileNumber === "22") ||
        (pieceOnTile === "19" && tileNumber === "23") ||
        (pieceOnTile === "20" && tileNumber === "24") ||
        (pieceOnTile === "21" && tileNumber === "26") ||
        (pieceOnTile === "21" && tileNumber === "25") ||
        (pieceOnTile === "22" && tileNumber === "27") ||
        (pieceOnTile === "22" && tileNumber === "26") ||
        (pieceOnTile === "23" && tileNumber === "28") ||
        (pieceOnTile === "23" && tileNumber === "27") ||
        (pieceOnTile === "24" && tileNumber === "28") ||
        (pieceOnTile === "25" && tileNumber === "29") ||
        (pieceOnTile === "26" && tileNumber === "29") ||
        (pieceOnTile === "26" && tileNumber === "30") ||
        (pieceOnTile === "27" && tileNumber === "30") ||
        (pieceOnTile === "27" && tileNumber === "31") ||
        (pieceOnTile === "28" && tileNumber === "31") ||
        (pieceOnTile === "28" && tileNumber === "32") ||
        (pieceOnTile === "5" && tileNumber === "2") ||
        (pieceOnTile === "5" && tileNumber === "1") ||
        (pieceOnTile === "6" && tileNumber === "3") ||
        (pieceOnTile === "6" && tileNumber === "2") ||
        (pieceOnTile === "7" && tileNumber === "4") ||
        (pieceOnTile === "7" && tileNumber === "3") ||
        (pieceOnTile === "8" && tileNumber === "4") ||
        (pieceOnTile === "9" && tileNumber === "5") ||
        (pieceOnTile === "10" && tileNumber === "5") ||
        (pieceOnTile === "10" && tileNumber === "6") ||
        (pieceOnTile === "11" && tileNumber === "6") ||
        (pieceOnTile === "11" && tileNumber === "7") ||
        (pieceOnTile === "12" && tileNumber === "7") ||
        (pieceOnTile === "12" && tileNumber === "8") ||
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
        if (turn === true) {
          p1ValidMove = true;
          p2ValidMove = false;
        } else if (turn === false) {
          p2ValidMove = false;
          p1ValidMove = true;
        }
      } else if (
        tileDifference === -9 ||
        tileDifference === -7 ||
        tileDifference === 9 ||
        tileDifference === 7
      )
        removeEnemyPiece = true;
    } else if (turn === true) {
      if (
        (pieceOnTile === "1" && tileNumber === "5") ||
        (pieceOnTile === "2" && tileNumber === "6") ||
        (pieceOnTile === "2" && tileNumber === "5") ||
        (pieceOnTile === "3" && tileNumber === "7") ||
        (pieceOnTile === "3" && tileNumber === "6") ||
        (pieceOnTile === "4" && tileNumber === "8") ||
        (pieceOnTile === "4" && tileNumber === "7") ||
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
        (pieceOnTile === "18" && tileNumber === "21") ||
        (pieceOnTile === "18" && tileNumber === "22") ||
        (pieceOnTile === "19" && tileNumber === "22") ||
        (pieceOnTile === "19" && tileNumber === "23") ||
        (pieceOnTile === "20" && tileNumber === "24") ||
        (pieceOnTile === "21" && tileNumber === "26") ||
        (pieceOnTile === "21" && tileNumber === "25") ||
        (pieceOnTile === "22" && tileNumber === "27") ||
        (pieceOnTile === "22" && tileNumber === "26") ||
        (pieceOnTile === "23" && tileNumber === "28") ||
        (pieceOnTile === "23" && tileNumber === "27") ||
        (pieceOnTile === "24" && tileNumber === "28") ||
        (pieceOnTile === "25" && tileNumber === "29") ||
        (pieceOnTile === "26" && tileNumber === "29") ||
        (pieceOnTile === "26" && tileNumber === "30") ||
        (pieceOnTile === "27" && tileNumber === "30") ||
        (pieceOnTile === "27" && tileNumber === "31") ||
        (pieceOnTile === "28" && tileNumber === "31") ||
        (pieceOnTile === "28" && tileNumber === "31")
      ) {
        p1ValidMove = true;
        console.log("p1ValidMove = " + p1ValidMove);
        if (
          tileNumber == 29 ||
          tileNumber == 30 ||
          tileNumber == 31 ||
          tileNumber == 32
        ) {
          isKing = true;
        }
      } else if (tileDifference === -9 || tileDifference === -7) {
        removeEnemyPiece = true;
        if (
          tileNumber == 29 ||
          tileNumber == 30 ||
          tileNumber == 31 ||
          tileNumber == 32
        ) {
          isKing = true;
        }
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
        (pieceOnTile === "9" && tileNumber === "5") ||
        (pieceOnTile === "10" && tileNumber === "5") ||
        (pieceOnTile === "10" && tileNumber === "6") ||
        (pieceOnTile === "11" && tileNumber === "6") ||
        (pieceOnTile === "11" && tileNumber === "7") ||
        (pieceOnTile === "12" && tileNumber === "7") ||
        (pieceOnTile === "12" && tileNumber === "8") ||
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
        if (
          tileNumber == 1 ||
          tileNumber == 2 ||
          tileNumber == 3 ||
          tileNumber == 4
        ) {
          isKing = true;
        }
      } else if (tileDifference === 7 || tileDifference === 9) {
        removeEnemyPiece = true;
        if (
          tileNumber == 1 ||
          tileNumber == 2 ||
          tileNumber == 3 ||
          tileNumber == 4
        ) {
          isKing = true;
        }
      } else {
        p1ValidMove = false;
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
  }

  function p1ActionRemovePiece() {
    currentPiece.removeAttribute("id");
    currentPiece.classList.remove("p1-king");
    clickedTile.firstElementChild.classList.add("p1-king");
    clickedTile.firstElementChild.style.opacity = "1";    
    changeScore();
    enemyPieceGoneAction = true;
    if (enemyTile.firstElementChild.classList.value === "p2-king"){
      enemyTile.firstElementChild.classList.remove("p2-king")
    } else if (enemyTile.firstElementChild.classList.value === "p2-piece"){
      enemyTile.firstElementChild.classList.remove("p2-piece");
    }
  }

  function p2ActionRemovePiece() {
    currentPiece.removeAttribute("id");
    currentPiece.classList.remove("p2-king");
    clickedTile.firstElementChild.classList.add("p2-king");
    clickedTile.firstElementChild.style.opacity = "1";    
    changeScore();
    enemyPieceGoneAction = true;
    if (enemyTile.firstElementChild.classList.value === "p1-king"){
      enemyTile.firstElementChild.classList.remove("p1-king")
    } else if (enemyTile.firstElementChild.classList.value === "p1-piece"){
      enemyTile.firstElementChild.classList.remove("p1-piece");
    }
  }
}

/*----- functions -----*/

init();

function init() {
  p1ScoreEl.innerText = p1PieceEl.length;
  p2ScoreEl.innerText = p2PieceEl.length;
  console.log(p1PieceEl.length);
  chewyTextEl.textContent = chewyPhrases[0];
  turn = true;
  render();
}

function render() {
  chewyDialogue();
  //   currentPiece.style.opacity = '1'
  p1PieceEl = document.querySelectorAll(".p1-piece");
  p2PieceEl = document.querySelectorAll(".p2-piece");
  p1PieceEl.forEach((piece) => (piece.style.opacity = "1"));
  p2PieceEl.forEach((piece) => (piece.style.opacity = "1"));
  p1KingEl.forEach((piece) => (piece.style.opacity = "1"));
  p2KingEl.forEach((piece) => (piece.style.opacity = "1"));
  p1ScoreEl.innerText = p1PieceEl.length * 1 + p1KingEl.length * 1;
  p2ScoreEl.innerText = p2PieceEl.length * 1 + p2KingEl.length * 1;
  resetVariables();
  switchTurn();
  continueGame();
}

function switchTurn() {
  if (turn === false) {
    p1DltHandlePieceEventListener();
    dltKingP1AddHandlePieceEventListener();
    dltTileEventListener();
    p1TextEl.style.opacity = "0.3";
    p2TextEl.style.opacity = "1";
    p2AddHandlePieceEventListener();
    kingP2AddHandlePieceEventListener();
  } else if (turn === true) {
    p2DltHandlePieceEventListener();
    dltKingP2AddHandlePieceEventListener();
    dltTileEventListener();
    p1TextEl.style.opacity = "1";
    p2TextEl.style.opacity = "0.3";
    p1AddHandlePieceEventListener();
    kingP1AddHandlePieceEventListener();
  }
}

function changeScore() {
  if (turn === true && enemyPieceGoneAction === true) {
    p2TextEl.innerText = p2TextEl.innerText * 1 - 1;
  }
  if (turn === false && enemyPieceGoneAction === true) {
    p1TextEl.innerText = p1TextEl.innerText * 1 - 1;
  }
}

function resetVariables() {
  currentPiece = null;
  p1ValidMove = null;
  p2ValidMove = null;
  removeEnemyPiece = null;
  enemyPieceGoneAction = null;
  isKing = null;
}

function chewyDialogue() {
  chewyTextEl.textContent =
    chewyPhrases[Math.floor(Math.random() * chewyPhrases.length)];
}

function continueGame() {
  if (
    (p1PieceEl.length == 0 && p1KingEl.length == 0) ||
    (p2PieceEl.length == 0 && p2KingEl.length == 0)
  ) {
    endGame();
  } else {
    console.log("next player");
  }
}

function endGame() {
  dltTileEventListener();
  p1DltHandlePieceEventListener();
  p2DltHandlePieceEventListener();
  dltKingP1AddHandlePieceEventListener()
    dltKingP2AddHandlePieceEventListener()
  if (p1PieceEl.length == 0 && p1KingEl.length == 0) {
    chewyTextEl.innerContent = "player 1 is win";
  } else if (p2PieceEl.length == 0 && p2KingEl.length == 0) {
    chewyTextEl.innerContent = "player 2 is win";
  }
}
