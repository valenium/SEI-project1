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

console.log(board)

const chewyPhrases =['zzz', '2/10', 'am bored', 'can we go home', 'mediocre at best', 'k', 'feed me', 'wher r treats', 'kinda lame', 'bad', 'Y', 'congrats']

/*----- state variables -----*/
let turn;
let p1Score;
let p2Score;

/*----- cached elements  -----*/

// Game board tiles
const validTileEl = document.querySelectorAll('.play-tile')
const nullTileEl = document.querySelectorAll('.invalid-tile')

// Play pieces
const p1PieceEl = document.querySelectorAll('.p1-piece')
const p2PieceEl = document.querySelectorAll('.p2-piece')

// Dialogue/stat box
const chewyTextEl = document.querySelector('#chewy-dialogue')

/*----- event listeners -----*/
p1PieceEl.forEach(function(move){
    move.addEventListener('click', handlePieceClick)
})

/*----- functions -----*/

init()

function init(){
    p1Score = 12
    p2Score = 12
    console.log(chewyPhrases[0])
    // render()
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