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

const chewyPhrases =['zzz', '2/10', 'am bored', 'can we go home', 'mediocre at best', 'k', 'feed me', 'wher r treats', 'kinda lame', 'bad', 'Y']

/*----- state variables -----*/


/*----- cached elements  -----*/

// Game board tiles
const validTileEl = document.querySelectorAll('.play-tile')
const nullTileEl = document.querySelectorAll('.invalid-tile')

// Play pieces
const p1Piece = document.querySelectorAll('.p1-piece')
const p2Piece = document.querySelectorAll('.p2-piece')


/*----- event listeners -----*/


/*----- functions -----*/
