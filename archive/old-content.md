// eventListenerSequence() -> called on event listeners in order based on conditionals

// function eventListenerSequence() {
//     if (turn === true){
//         p2TextEl.style.opacity = '0.3'
//         p1PieceEl.forEach((move) =>
//             move.addEventListener("click", handlePieceClick)
//         )
//         if(currentPiece !== null){
//             tiles.forEach((place) =>{
//                 console.dir(place.target.dataset.value)
//                 console.log(place.target.parentElement.dataset.value)
//                 if (tileNumber !== undefined){
//                     place.addEventListener("click", handleTileClick)
//                 }}
//             )
//             if (currentPiece === null){
//                 p1PieceEl.forEach((move) =>
//                     move.removeEventListener("click", handlePieceClick)
//                 )
//                 tiles.forEach((place) =>
//                     place.removeEventListener("click", handleTileClick)
//                 );
//                 turn = false
//                 currentPiece = null
//             }
//         }
//     }
//     if (turn === false){
//         p1TextEl.style.opacity = '0.3'
//         p2PieceEl.forEach((move) =>
//             move.addEventListener("click", handlePieceClick)
//         )
//         if(currentPiece !== null){
//             tiles.forEach((place) =>
//                 place.addEventListener("click", handleTileClick)
//             )
//             if (pieceOnTile === tileNumber){
//                 p2PieceEl.forEach((move) =>
//                     move.removeEventListener("click", handlePieceClick)
//                 )
//                 tiles.forEach((place) =>
//                     place.removeEventListener("click", handleTileClick)
//                 );
//                 turn = true
//                 currentPiece = null
//             }
//         }
//     }
// }


Code from the validMove() function
        //   (((pieceOnTile >= 1 && pieceOnTile <= 4) || (pieceOnTile >= 9 && pieceOnTile <= 12) || (pieceOnTile >= 17 && pieceOnTile <= 20) || (pieceOnTile >= 25 && pieceOnTile <= 28)) &&
        //     (pieceOnTile - tileNumber >= -4 && pieceOnTile - tileNumber <= -3)) || ((pieceOnTile >= 5 && pieceOnTile <= 8) || (pieceOnTile >= 13 && pieceOnTile <= 16) || (pieceOnTile >= 21 && pieceOnTile <= 24)) && (pieceOnTile - tileNumber >= -5 &&
        //         pieceOnTile - tileNumber <= -4))
        // if (turn === false &&
    //     (((pieceOnTile >= 9 && pieceOnTile <= 12) || (pieceOnTile >= 17 && pieceOnTile <= 20) || (pieceOnTile >= 25 && pieceOnTile <= 28)) &&
    //     (pieceOnTile - tileNumber >= 3 && pieceOnTile - tileNumber <= 4)) || ((pieceOnTile >= 5 && pieceOnTile <= 8) || (pieceOnTile >= 13 && pieceOnTile <= 16) || (pieceOnTile >= 21 && pieceOnTile <= 24) || (pieceOnTile >= 29 && pieceOnTile <= 32)) && (pieceOnTile - tileNumber >= 4 &&
    //         pieceOnTile - tileNumber <= 5)){
    //             p2ValidMove = true
    //         }else{
    //             p2ValidMove = false
    //         }

NULL FUNCTIONS
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

// function indicatePlayerTurn() {
//   if (turn === true) {
//     p1TextEl.style.opacity = "1";
//     p2TextEl.style.opacity = "0.3";
//   } else if (turn === false) {
//     p1TextEl.style.opacity = "0.3";
//     p2TextEl.style.opacity = "1";
//   }
// }