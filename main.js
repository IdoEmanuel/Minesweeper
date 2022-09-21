"use strict";

const MINE = "☢️";

var gGame = {
  isOn: false,
  shownCount: 0,
  markedCount: 0,
  secsPassed: 0,
};
function onInit() {
  var gBoard = buildBoard();
}
// Present the mines using renderBoard() function.

function renderBoard(board) {
  var strHTML = "";
  for (var i = 0; i < board.length; i++) {
    strHTML += `<tr>\n`;
    for (var j = 0; j < board[0].length; j++) {
      strHTML += `<td>${i},${j}</td>`;
    }
    strHTML += `</tr>\n`;
  }

  var elBoard = document.querySelector(".board");
  elBoard.innerHTML = strHTML;
}
// Create a 4x4 gBoard Matrix containing Objects. Place 2 mines
// manually when each cell’s isShown set to true.

function buildBoard() {
  const board = [];
  for (var i = 0; i < 4; i++) {
    board[i] = [];
    for (var j = 0; j < 4; j++) {
      board[i][j] = {
        isShown: true,
        isMine: false,
        minesAroundCount: 4,
      };
      board[0][3] = MINE;
      board[0][1] = MINE;
      board[0][2] = MINE;
    }
  }
  // console.table(board);
  renderBoard(board);
  setMinesNegsCount(board);
}
// update the DOM

function getRandom(board) {
  return Math.random(MINE);
}
function setMinesNegsCount(board, rowIdx, colIdx) {
  var minesAroundCount = 0;
  for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
    if (i < 0 || i >= board.length) continue;
    for (var j = colIdx - 1; j <= colIdx + 1; j++) {
      if (j < 0 || j >= board[0].length) continue;
      if (i === rowIdx && j === colIdx) continue;

      var cellAround = board[i][j];
      if (cellAround.minesAroundCount === MINE) minesAroundCount++;
    }
  }
  // console.log(board);
  return minesAroundCount;
}
