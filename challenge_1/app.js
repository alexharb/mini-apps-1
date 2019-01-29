var whoseTurn = 'x';
var numOfClicks = 0;
var winnerChar;
var winner = document.getElementById("p1Name");
var winnerScore;
var winnerScoreNum;
var p1Score = 0;
var p2Score = 0;
var gameComplete = false;
var colorCycle = 0;

function changeClick(index) {
  var clicked = document.getElementsByClassName("gameCell");
  var clickedSpace = clicked[index].innerHTML;
  if (clickedSpace !== 'x' && clickedSpace !== 'o' && !gameComplete) {
    clicked[index].innerHTML = whoseTurn;
    numOfClicks++;
    if (whoseTurn ==='x') {
      clicked[index].setAttribute("style", "cursor: default; color: rgb(255, 119, 119);");
      document.getElementById("turnLabel").innerHTML = document.getElementById("p2Name").innerHTML + "'s turn"
      whoseTurn = 'o';
    } else {
      clicked[index].style.cssText = "cursor: default; color: rgb(117, 248, 255);"
      document.getElementById("turnLabel").innerHTML = document.getElementById("p1Name").innerHTML + "'s turn"
      whoseTurn = 'x';
    }
    if (numOfClicks > 2) {
      checkAllWinConditions(clicked);
    } 
  }
}

function checkAllWinConditions(gameCells) {
  var lineWin = lineCheck(gameCells);
  var colWin = columnCheck(gameCells);
  var diagWin = diagCheck(gameCells);
  if (lineWin || colWin || diagWin) {
    gameComplete = true;
    document.getElementById("turnLabel").innerHTML = "And that's the game!  Winner starts the next round."
    whoseTurn = winnerChar;
    defineWinner(winnerChar);
    winnerScore.innerHTML = winnerScoreNum;
    document.getElementById('end message').innerHTML = winner.innerHTML + " wins!"
  } else if (numOfClicks === 9) {
    document.getElementById("turnLabel").innerHTML = "And that's the game!"
    document.getElementById('end message').innerHTML = "TIE GAME"
  }
}

function newGame() {
  numOfClicks = 0;
  var spaces = document.getElementsByClassName("gameCell");
  document.getElementById('end message').innerHTML = '&nbsp;&nbsp;'
  gameComplete = false;
  if (winner) {
    document.getElementById("turnLabel").innerHTML = winner.innerHTML + "'s turn"
  } else {
    document.getElementById("turnLabel").innerHTML = document.getElementById("p1Name").innerHTML + "'s turn"
  }
  for (var i = 0; i < spaces.length; i++) {
    spaces[i].innerHTML = '&nbsp;&nbsp;';
    spaces[i].setAttribute("style", "cursor: pointer");
  }
}

function lineCheck(list) {
  var rowList = [[], [], []];
  var col = 0;
  for (var i = 0; i < list.length; i++) {
    rowList[col].push(list[i])
    if ((i + 1) % 3 === 0) {
      col++;
    }
  }
  return checkForWin(rowList);
}

function columnCheck(list) {
  var colList = [[], [], []];
  var row = 0;
  for (var i = 0; i < list.length; i++) {
    colList[row].push(list[i])
    if ((i + 1) % 3 === 0) {
      row = 0;
    } else {
      row++;
    }
  }
  return checkForWin(colList);
}

function diagCheck(list) {
  var diagList = [[], []];
  for (var i = 0; i < list.length; i++) {
    if (i % 2 !== 0) {
      //do nothing
    } else {
        if (i % 4 === 0) {
          diagList[0].push(list[i]);
          if (i === 4) {
            diagList[1].push(list[i]);
          }
        } else {
          diagList[1].push(list[i]);
        }
    }
  }
  return checkForWin(diagList);
}

function defineWinner(playerChar) {
  if (playerChar === 'x') {
    p1Score++;
    winnerScoreNum = p1Score;
    winnerScore = document.getElementById("p1Score");
    winner = document.getElementById("p1Name");
  } else {
    p2Score++;
    winnerScoreNum = p2Score;
    winnerScore = document.getElementById("p2Score");
    winner = document.getElementById("p2Name");
  }
}

function checkForWin(listOfLists) {
  return listOfLists.reduce((check1, row) => {
    if (check1) {
      return check1;
    } else {
      var previous;
      return row.reduce((check2, data) => {
        var data = data.innerHTML;
        if (!previous && data[0] !== '&') {
          previous = data;
          return check2;
        }
        if (previous === data && check2) {
          winnerChar = data;
          return check2;
        } else {
          return false;
        }
      }, true)
    }
  }, false)
}

function changeName(player) {
  var playerNameElement;
  var name = prompt("Enter your player name, Player " + player.toString() + '  (7 character limit)', "Player " + player.toString());
  if (player === 1) {
    playerNameElement = document.getElementById("p1Name")
  } else {
    playerNameElement = document.getElementById("p2Name")
  }
  if (name.length > 0) {
    playerNameElement.innerHTML = name.slice(0, 7);
    document.getElementById("gameLabel").innerHTML = document.getElementById("p1Name").innerHTML + "'s X vs " +
      document.getElementById("p2Name").innerHTML + "'s O";
  }
}

// function loadTitle() {
//   var colorArray = ['rgb(255,214,214)', 'rgb(250,255,176)', 'rgb(192,255,182)', 'rgb(208,221,255)', 'rgb(225,191,255)'];
//   var mainElementList = document.getElementsByClassName("colorMan");
//   for(var i = 0; i < mainElementList.length; i++) {
//     var mainElement = mainElementList[i];
//     var mainElementText = mainElement.textContent;
//     mainElement.innerHTML = '';
//     for (var j = 0; j < mainElementText.length; j++) {
//       var letter = document.createElement('span');
//       letter.setAttribute("style", "color: " + colorArray[colorCycle % 5])
//       colorCycle++;
//       letter.innerHTML = mainElementText[j];
//       mainElement.appendChild(letter);
//     }
//   }
//   setTimeout(loadTitle, 100)
// }

function loadTitle() {
  var colorArray = ['rgb(255,214,214)', 'rgb(250,255,176)', 'rgb(192,255,182)', 'rgb(208,221,255)', 'rgb(225,191,255)']
  var titleElement = document.getElementById("gameTitle");
  titleElement.innerHTML = '';
  var title = "Welcome to Alex's beautiful amazing spectacular tic tac toe game";
  for (var i = 0; i < title.length; i++) {
    var letter = document.createElement('span');
    letter.setAttribute("style", "color: " + colorArray[colorCycle % 5])
    colorCycle++;
    letter.innerHTML = title[i];
    titleElement.appendChild(letter);
  }
  setTimeout(loadTitle, 100)
}

function colorChange() {
  
}