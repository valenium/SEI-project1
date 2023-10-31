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
let currentPiece;
let p1Turn;
let p2Turn;

/*----- cached elements  -----*/
// const divActive = document.createElement('div')
// div.className = 'active'

// Game board tiles
const tiles = document.querySelectorAll('#tile')
console.dir(tiles)
tiles.forEach((tile,index) => {
    const row = Math.floor(index/8)
    const col = index%8
    tile.dataset.value = board[row][col]
})
// console.log(tiles[1].dataset.value)

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
})
p1Turn= true
function handlePieceClick(e){
    e.preventDefault()
    if((p1Turn === true && e.target.innerHTML === p2PieceEl)||(p2Turn === true && e.target.innerHTML === p1PieceEl )){
        chewyTextEl.innerText('not your turn!')
        return;
    }
    e.target.style.color = 'white'
}

/*----- functions -----*/

init()

function init(){
    p1ScoreEl.innerText = p1PieceEl.length
    p2ScoreEl.innerText = p2PieceEl.length
    chewyTextEl.textContent = chewyPhrases[0]
    p1Turn = true
    // render()
}

function countPieces(){
    for(let i=0; i<p1PieceEl.length-1; i++){
        console.log(p1PieceEl[i])
    }
    for(let j=0; j<p2PieceEl.length-1; j++){
        console.log(p2PieceEl[j])
    }
}
countPieces()
console.dir(p1PieceEl)

function chewyDialogue(){
    chewyTextEl.textContent = chewyPhrases[(Math.floor(Math.random()*chewyPhrases.length))]
}

function render(){
    trn
}

function runGame(){
    if (continueGame()){
        
    }else{
        endGame()
    }
}

function changeTurn(){}

function continueGame(){
    let keepRunning = true

}

function endGame(){

}