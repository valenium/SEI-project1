# Checkers

# Wireframes
 ![AltText](planning/wireframe1.jpg)

 ![AltText](planning/wireframe2.jpg)

 ![AltText](planning/wireframe3.jpg)

# Pseudocode
**Constants**

const board =[
{1,null,2,null,3,null,4,null}
{null,5,null,6,null,7,null,8}
{9,null,10,null,11,null,12,null}
{null,13,null,14,null,15,null,16}
{17,null,18,null,19,null,20,null}
{null,21,null,22,null,23,null,24}
{25,null,26,null,27,null,28,null}
{null,29,null,30,null,31,null,32}
]
const chewyPhrases;

The 8x8 board is an array of 64 objects. Half of those objects are undefined -> chess pieces cannot move there

**State variables**
let currentPlayer;



**Cached elements**
const playerTurn = document.querySelector(#player-turn)

**Event listeners**
p1Turn.addEventListener('click' move(){



**Functions**

// INITIAL STATE -> CALLS RENDER FUNCTION
init(){
  render()
}

function init(); -> initial game state

function render(){
 playerTurn


