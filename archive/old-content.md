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