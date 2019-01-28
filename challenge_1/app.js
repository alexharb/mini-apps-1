var whoseTurn = 'x';
var numOfClicks = 0;

function changeClick(index) {
  var clicked = document.getElementsByTagName("td");
  var clickedSpace = clicked[index].innerHTML;
  if (clickedSpace !== 'x' && clickedSpace !== 'o' ) {
    clicked[index].innerHTML = whoseTurn;
    numOfClicks++;
    if (whoseTurn ==='x') {
      whoseTurn = 'o';
    } else {
      whoseTurn = 'x';
    }
    if (numOfClicks > 2) {
      var lineWin = lineCheck(clicked);
      var colWin = columnCheck(clicked);
      var diagWin = diagCheck(clicked);
      if (lineWin || colWin || diagWin) {
        document.getElementById('you win').innerHTML = "YOU WIN"
      }
    }
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
          return check2;
        } else {
          return false;
        }
      }, true)
    }
  }, false)
}