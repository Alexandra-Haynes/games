let numSelected = null;
let tileSelected = null;

let errors = 0;

let board = [
  "--74916-5",
  "2---6-3-9",
  "-----7-1-",
  "-586----4",
  "--3----9-",
  "--62--187",
  "9-4-7---2",
  "67-83----",
  "81--45---",
];

let solution = [
  "387491625",
  "241568379",
  "569327418",
  "758619234",
  "123784596",
  "496253187",
  "934176852",
  "675832941",
  "812945763",
];

window.onload = function () {
  setGame();
};

function setGame() {
  //Digits: 1-9
  for (i = 0; i <= 9; i++) {
    // <div id='1' class='number'>1</div>
    let number = document.createElement("div");
    number.id = i;
    number.innerText = i;
    number.classList.add("number");
    number.addEventListener("click", selectNumber);
    document.getElementById("digits").appendChild(number);
  }

  //Board: 9x9
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      let tile = document.createElement("div");
      tile.id = r.toString() + "-" + c.toString();
      if (board[r][c] != "-") {
        //dont display -
        tile.innerText = board[r][c];
        tile.classList.add("tile-start");
      }
      //adding the black lines:
      if (r == 2 || r == 5) {
        tile.classList.add("horizontal-line");
      }
      if (c == 2 || c == 5) {
        tile.classList.add("vertical-line");
      }

      tile.classList.add("tile");
      tile.addEventListener("click", selectTile);
      document.getElementById("board").append(tile);
    }
  }
}

function selectNumber() {
  if (numSelected) {
    numSelected.classList.remove("number-selected");
  } //checks if we already clicked a number before
  numSelected = this;
  //this refers to div itself
  numSelected.classList.add("number-selected");
}

function selectTile() {
  //first we check if we selected a number
  
  if (numSelected) {
    if (this.innerText != "") return; //prevent overwritting a number
    //check with the solution:
    let coords = this.id.split("-"); //['0','1']
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);
    
    let tileClicked = document.getElementById(`${r}-${c}`);

    if (solution[r][c] == numSelected.id) {
      this.innerText = numSelected.id;
      tileClicked.style.color = "green";
    } else {
      errors++;
      document.getElementById("errors").innerText = errors;
      document.getElementById("errors").style.backgroundColor= 'pink';
      tileClicked.style.backgroundColor = "pink";

      setTimeout(()=> {
          tileClicked.style.backgroundColor = "white";
          document.getElementById("errors").style.backgroundColor = "white";
      },1000)
    }
  }
}

// ______________________Timer________________________________


let timeLeft = 299;
let timer= document.getElementById("timer")

function convertToMinutes(s) {
  return Math.floor(s / 60);
}
function convertToSeconds(s) {
  return s % 60;
}

function countdown() {
  let min = convertToMinutes(timeLeft);
  let sec = convertToSeconds(timeLeft);
  sec = sec < 10 ? '0'+sec : sec;
  timer.innerText = `${min}:${sec}`;
  timeLeft--;
  if(min ==0){
  timer.style.color= 'red'
  }
  if(min==0 && sec==0){ 
    alert(`Game over`)
    let gameOver = document.getElementById('timeLeft')
    gameOver.innerText='Game over'
    gameOver.style.backgroundColor='pink'
    clearInterval(counterId);
  }
}

let counterId = setInterval(countdown, 1000);


