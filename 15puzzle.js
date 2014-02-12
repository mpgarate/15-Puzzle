$(document).ready(function () {
    // 15 letters 
    var alphabet = ['a', 'b', 'c', 'd', // 0  1  2  3
                    'e', 'f', 'g', 'h', // 4  5  6  7
                    'i', 'j', 'k', 'l', // 8  9  10 11
                    'm', 'n', 'o'];     // 12 13 14

    var Board = function(state){
      // array holding letters positioned by index
      this.state = state;
    }

    Board.prototype.isInSameRow = function(i1,i2){
      if (i1 < 4 && i2 < 4){
        //row 1
        return true;
      }
      else if (i1 < 8 && i2 < 8){
        //row 2
        return true;
      }
      else if (i1 < 12 && i2 < 12){
        //row 3
        return true;
      }
      else if (i1 < 14 && i2 < 14){
        //row 4
        return true;
      }
      else {
        return false;
      }
    }

    Board.prototype.touches = function(i1,i2){
      // if is in same column
      if (i1 % 4 === i2 % 4){
        if (Math.abs(i1 - i2) === 4){
          return true;
        }
      }
      else if (this.isInSameRow(i1,i2)){
        if(Math.abs(i1 - i2) === 1){
          return true;
        }
      }
      
      return false;
    }

    Board.prototype.isValidSwap = function(i1,i2){
      // Assert one index is a free space
      if(i1 !== ' ' || i2 !== ' '){
        return 0;
      }
      else if(!this.touches(i1,i2)){
        return 0;
      }
      else {
        return 1;
      }
    }

    Board.prototype.swap = function(i1,i2){
      if (this.isValidSwap(i1,i2)){
        this.state[i1] = this.state[i2];
        this.state[i2] = ' ';
      }
      else{
        console.log("FATAL: tried to perform illegal swap.");
      }
    }

    // initialize the board

    for (var i = 0; i < (alphabet.size() / 4); i++) {
      board[i] = [];
      for (var j = 0; j < (alphabet.size() / 4); j++) {
        board[i][j] = alphabet[i + 4*j];
      }
    }

});