import '../css/style.sass';

class AI {
  constructor(board) {
    this.board = board;
  }

  play() {
    let move = this.calculateMove();
    this.playMove(move);
  }

  playMove(move) {
    if (move === 'won' || move === 'lost') {
      endGame(move);
      return;
    }

    let boardItem = document.querySelector('[data-pos="' + move + '"]');

    boardItem.setAttribute('data-xo', this.board.currentFaction);
    this.board.grid[move] = ( board.currentFaction == 'x' ? false : true );
    this.board.currentFaction = changeFaction();
  }

  calculateMove(){
    let empties = []

    for (var i = 0; i < this.board.lanes.length; i++) {
      let xScore = 0;
      let oScore = 0;
      let lastNull = '';

      for (var j = 0; j < this.board.lanes[i].match.length; j++) {
          let match =  this.board.lanes[i].match[j];

          if (this.board.grid[match] === true) {
            oScore++;
          }

          if (this.board.grid[match] === false) {
            xScore++;
          }

          if (this.board.grid[match] === null) {
            empties.push(match);
            lastNull = match;
          }
      }

      this.board.lanes[i].oScore = oScore;
      this.board.lanes[i].xScore = xScore;

      if (xScore == 3) {
        console.log("won");
        var won = 'won';
      }

      if (oScore == 3) {
        console.log("lost");
        var lost = 'lost';
      }

      if (oScore == 2 && xScore == 0) {
        var win = lastNull;
      }

      if (xScore == 2 && oScore == 0) {
        var block = lastNull;
      }


    }


    if (won) {
      return won;
    }

    if (lost) {
      return lost;
    }

    if (win) {
      return win
    }

    if (block) {
      return block;
    }

    empties.filter((value, index, array) => array.indexOf(value) === index);
    return empties[Math.floor(Math.random()*empties.length)];
  }
}

let board = {
  currentFaction: 'x',
  players: 1,
  grid: {
    one: null,
    two: null,
    three: null,
    four: null,
    five: null,
    six: null,
    seven: null,
    eight: null,
    nine: null,
  },
  lanes: [
    {
      match: ['one', 'two', 'three'],
      xScore: 0,
      oScore: 0,
    },
    {
      match: ['four', 'five', 'six'],
      xScore: 0,
      oScore: 0,
    },
    {
      match: ['seven', 'eight', 'nine'],
      xScore: 0,
      oScore: 0,
    },
    {
      match: ['one', 'four', 'seven'],
      xScore: 0,
      oScore: 0,
    },
    {
      match: ['two', 'five', 'eight'],
      xScore: 0,
      oScore: 0,
    },
    {
      match: ['three', 'six', 'nine'],
      xScore: 0,
      oScore: 0,
    },
    {
      match: ['one', 'five', 'nine'],
      xScore: 0,
      oScore: 0,
    },
    {
      match: ['three', 'five', 'seven'],
      xScore: 0,
      oScore: 0,
    },
  ]
}

let AIPlayer = new AI(board);

let gridSpaces = document.querySelectorAll('[data-xo]');
let resetButton = document.querySelector('button[name="reset"]');

function endGame(result) {
    let resultSection = document.querySelector('.result');
    console.log(result);
    console.log(resultSection);
    if (result === 'won') {
      resultSection.textContent = 'Congratulations you won!';
    }
    if (result === 'lost') {
      resultSection.textContent = 'Ahh Soory, you lost!';
    }

    resultSection.classList.remove('hide');

    setTimeout(function () {
      clearBoard();
    }, 5000);
}

function changeFaction() {
    return board.currentFaction = (board.currentFaction == 'x' ? 'o' : 'x');
}

function clickSpace(event) {
  if (event.target.getAttribute('data-xo') === '') {
    board.grid[event.target.getAttribute('data-pos')] = ( board.currentFaction == 'x' ? false : true );
    event.target.setAttribute('data-xo', board.currentFaction);
    board.currentFaction = changeFaction();
  }

  if (board.players == 1) {
    AIPlayer.play();
  }

  console.log(board);
}

function clearBoard() {
  let resultSection = document.querySelector('.result');
  for (var item in board.grid) {
    if (board.grid.hasOwnProperty(item)) {
      board.grid[item] = null;
    }
    for (var i = 0; i < gridSpaces.length; i++) {
      gridSpaces[i].setAttribute('data-xo', '');
    }
  }

  resultSection.classList.add('hide');
  board.currentFaction = 'x';
}

for (var i = 0; i < gridSpaces.length; i++) {
  gridSpaces[i].addEventListener('click', clickSpace);
}

resetButton.addEventListener('click', clearBoard);
