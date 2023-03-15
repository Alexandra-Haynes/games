let board;
let score = 0;
// let rows = 4;
// let cols = 4;

// when the page loads we gonna call this function:

window.onload = function () {
  setGame();
};

function setGame() {
  board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
  //   board = [
  //     [2, 2, 2, 2],
  //     [2, 2, 2, 2],
  //     [4, 4, 8, 8],
  //     [4, 4, 8, 8],
  //   ];

  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      let tile = document.createElement("div");
      tile.id = r.toString() + "-" + c.toString();
      //  creates <div id=0-0></div>
      let num = board[r][c];
      updateTile(tile, num);
      document.getElementById("board").append(tile); //adding children
    }
  }
  //calling setTwo twice because we need 2 tiles to start
  setTwo();
  setTwo();
}


// ____________________updating the tiles_________________________________________


function hasEmptyTile() {
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      if (board[r][c] == 0) {
        return true;
      }
    }
  } //is gonna return true the moment it finds an empty tile
  return false;
}

//the game starts with two 2s on the board:
function setTwo() {
  if (!hasEmptyTile()) {
    return; //if there are no empty tiles, we just gonna return &
    //break out of this function
    //so the func below will not run
  }

  let found = false;
  while (!found) {
    //random r,c:
    let r = Math.floor(Math.random() * 4);
    let c = Math.floor(Math.random() * 4);

    if (board[r][c] == 0) {
      board[r][c] = 2;
      let tile = document.getElementById(r.toString() + "-" + c.toString()); //updating the html
      tile.innerText = 2;
      tile.classList.add("x2");
      found = true; //break out of the while loop
    }
  }
}


function updateTile(tile, num) {
  tile.innerText = ""; //clearing the tile
  tile.classList.value = ""; //clearing  the classList
  tile.classList.add("tile"); //adding back tile class
  if (num > 0) {
    tile.innerText = num;
    if (num <= 4096) {
      tile.classList.add("x" + num.toString());
    } else {
      tile.classList.add("x8192"); //all num > 8192 have the same color
    }
  }
}

//_____playing the game _____________________________________________

document.addEventListener("keyup", (e) => {
  //keyup - to press one key at a time
  if (e.code == "ArrowLeft") {
    slideLeft();
    setTwo(); //everytime we slide we generate a new 2
    //step1: clear any zeroes; zero=empty tile [2,2,2,0]
    //step2: merge(check if num are the same)  [2,2,2] -> [4,0,2]
    //step3: clear zeroes again;               [4,0,2] -> [4,2]
    //step4: put zeroes back;                  [4,2] -> [4,2,0,0]
  } else if (e.code == "ArrowRight") {
    slideRight();
    setTwo();
  } else if (e.code == "ArrowUp") {
    slideUp();
    setTwo();
  } else if (e.code == "ArrowDown") {
    slideDown();
    setTwo();
  }
  //updating the score after each slide:
  document.getElementById("score").innerText = score;
});

function filterZero(row) {
  return row.filter((num) => num != 0);

  //creates a new array(row) without zeroes
}

function slide(row) {
  row = filterZero(row); //filter out zeroes
  for (let i = 0; i < row.length - 1; i++) {
    if (row[i] == row[i + 1]) {
      //checking every 2 num
      row[i] *= 2;
      row[i + 1] = 0;
      score += row[i]; //we update score for every slide
    }
  }

  row = filterZero(row); //filter new zeroes in the row

  while (row.length < 4) {
    row.push(0); //adding back zeroes
  }

  return row;
}

function slideLeft() {
  for (let r = 0; r < 4; r++) {
    let row = board[r];
    row = slide(row);
    board[r] = row;

    //update html:
    for (let c = 0; c < 4; c++) {
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}

function slideRight() {
  //for sliding right we gonna use the same process
  //because sliding right with a reversed row is the same as sliding left,
  //we gonna use the same functions & use array.reverse() method
  for (let r = 0; r < 4; r++) {
    let row = board[r];
    row.reverse();
    row = slide(row);
    row.reverse();
    board[r] = row;

    //update html:
    for (let c = 0; c < 4; c++) {
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}

function slideUp() {
  //sliding up is the same as sliding left,
  //basically flipping the board 90deg to the left
  for (let c = 0; c < 4; c++) {
    //we create a row out of that column:
    let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
    row = slide(row);

    //update html:
    for (let r = 0; r < 4; r++) {
      board[r][c] = row[r]; //assigning back the values for the cols:
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}

function slideDown() {
  //sliding down is the same as sliding right, with reversed cols and rows

  for (let c = 0; c < 4; c++) {
    //we create a row out of that column:
    let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
    row.reverse();
    row = slide(row);
    row.reverse();

    //update html:
    for (let r = 0; r < 4; r++) {
      board[r][c] = row[r]; //assigning back the values for the cols:
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}
