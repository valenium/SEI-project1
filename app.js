console.log('woof')

/*----- constants -----*/
const board =[
    [1,null,2,null,3,null,4,null],
    [null,5,null,6,null,7,null,8],
    [9,null,10,null,11,null,12,null],
    [null,13,null,14,null,15,null,16],
    [17,null,18,null,19,null,20,null],
    [null,21,null,22,null,23,null,24],
    [25,null,26,null,27,null,28,null],
    [null,29,null,30,null,31,null,32]
]

// console.log(board)

const chewyPhrases = ['zzz', '2/10', 'am bored', 'can we go home', 'mediocre at best', 'k', 'feed me', 'wher r treats', 'kinda lame', 'bad', 'Y']

/*----- state variables -----*/
let turn;
let tileOfPiece = null;
let currentPiece = null;
let currentTile = null;
let p1Turn;
let p2Turn;

/*----- cached elements  -----*/
// const divActive = document.createElement('div')
// div.className = 'active'

// Game board tiles
const tiles = document.querySelectorAll('#tile')
// console.dir(tiles)
for (let i=0; i<tiles.length; i++){
    const tile = tiles[i]
    const row = Math.floor(i/8)
    const col = (i%8)
    tile.dataset.value = board[row][col]
}
// tiles.forEach((tile,index) => {
//     const row = Math.floor(index/8)
//     const col = index%8 
//     tile.dataset.value = board[row][col]
// })
// console.log(tiles[0].dataset.value)

// console.log(tiles)

// const validTileEl = document.querySelectorAll('.play-tile')
// const nullTileEl = document.querySelectorAll('.invalid-tile')

// Play pieces
const p1PieceEl = document.querySelectorAll('#p1-piece')
const p2PieceEl = document.querySelectorAll('#p2-piece')

// Dialogue/stat box
const p1TextEl = document.querySelector('#player1-prompt')
const p2TextEl = document.querySelector('#player2-prompt')
const chewyTextEl = document.querySelector('#chewy-phrase')
const p1ScoreEl = document.querySelector('#p1-score')
const p2ScoreEl = document.querySelector('#p2-score')
console.log(p1ScoreEl.innerText)

// console.log(chewyTextEl.innerText)


/*----- event listeners -----*/

// Player 1 clicks on piece to move
p1PieceEl.forEach(function(move){
    move.addEventListener('click', handlePieceClick)
    // move.addEventListener('click', handlePieceMove)
})

p2PieceEl.forEach(function(move){
    move.addEventListener('click', handlePieceClick)
    // move.addEventListener('click', handlePieceMove)
})

tiles.forEach(function(place){
    place.addEventListener('click', handleTileClick)
})
turn = true

// To select piece player wants to move
function handlePieceClick(e){
    e.preventDefault()
    let piece = e.target
    tileOfPiece = piece.parentElement
    if((turn === true && piece.p2PieceEl)||(turn === false && piece.p1PieceEl )){
        chewyTextEl.textContent = 'not your turn! >:('
        piece.style.opacity = '1'
        currentpiece = null
    }
    if (currentPiece === piece){
        piece.style.opacity = '1'
        currentpiece = null
    }
    if (currentPiece){
        currentPiece.style.opacity = '1'
    }
    currentPiece = piece
    piece.style.opacity = '0.3'
    console.log(tileOfPiece)
}

// To move selected piece to tile
function handleTileClick(e){
    e.preventDefault()
    let clickedTile = e.target
    // tileOfPiece = currentPiece.parentNode
    const tileNumber = clickedTile.dataset.value
    if(tileNumber === null){
        chewyTextEl.innerText = 'invalid move'
    }
    // if (clickedTile === clickedTile)
    clickedTile.style.opacity = '0.3'
    console.log(clickedTile.dataset.value)
    
}

/*----- functions -----*/

// init()

// function init(){
//     p1ScoreEl.innerText = p1PieceEl.length
//     p2ScoreEl.innerText = p2PieceEl.length
//     chewyTextEl.textContent = chewyPhrases[0]
//     p1Turn = true
//     // render()
// }

function initEventHandler(){
    p1PieceEl = removeEventListener()
}

function playerTurn(){
    if (turn === true){
        for (let i=0;i<p1PieceEl.length; i++){
            p1PieceEl[i].removeEventListener('click', handlePieceClick)
        }
        }else{
            for (let i=0;i<p2PieceEl.length; i++){
                p2PieceEl[i].removeEventListener('click', handlePieceClick)
        }
    }
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

// function chewyDialogue(){
//     chewyTextEl.textContent = chewyPhrases[(Math.floor(Math.random()*chewyPhrases.length))]
// }

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