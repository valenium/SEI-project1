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

const chewyPhrases = ['zzz', '2/10', 'am bored', 'can we go home', 'mediocre at best', 'k', 'feed me', 'wher r treats', 'kinda lame', 'bad', 'Y', 'congrats']

/*----- state variables -----*/
let turn;
let p1Score;
let p2Score;

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

// console.log(tiles)

// const validTileEl = document.querySelectorAll('.play-tile')
// const nullTileEl = document.querySelectorAll('.invalid-tile')

// Play pieces
const p1PieceEl = document.querySelectorAll('#p1-piece')
console.log(p1PieceEl)
const p2PieceEl = document.querySelectorAll('#p2-piece')
console.log(p2PieceEl)

// Dialogue/stat box
const chewyTextEl = document.querySelector('h4')
console.log(chewyTextEl.innerText)


/*----- event listeners -----*/

// Player 1 clicks on piece to move
p1PieceEl.forEach(function(move){
    move.addEventListener('click', handlePieceClick)
})

// function handlePieceClick(e){
//     console.log(e.target.innerHTML)
//     p1PieceEl.style.opacity = '0.3'
//     for(let i=0; i<board.length; i++){
//         (let j=0; j<board[i].length; j++)
//     }
// }

/*----- functions -----*/

init()

function init(){
    p1Score = 12
    p2Score = 12
    // chewyTextEl.textContent = 'hello'
    // render()
}

function chewyDialogue(){

}

function render(){
    
}

function runGame(){
    if (continueGame()){
        
    }else{
        endGame()
    }
}

function continueGame(){

}

function endGame(){

}