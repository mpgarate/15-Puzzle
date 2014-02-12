$(document).ready(function () {
    // 15 letters 
    var goal_state = ['a', 'b', 'c', 'd',   // 0  1  2  3
                       'e', 'f', 'g', 'h',   // 4  5  6  7
                       'i', 'j', 'k', 'l',   // 8  9  10 11
                       'm', 'n', 'o', ' '];  // 12 13 14 15

    var jumbled_state = ['a', 'b', 'c', 'd', // 0  1  2  3
                       'e', ' ', 'f', 'g',   // 4  5  6  7
                       'i', 'j', 'k', 'h',   // 8  9  10 11
                       'm', 'n', 'o', 'l'];  // 12 13 14 15

    var Board = function(state){
      // array holding letters positioned by index
      this.state = state;
      this.visible = true;
    }

    Board.prototype.draw = function(){
      for (var i in this.state){
        $('.box-' + i).html(this.state[i]);
      }
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
      if(!(this.state[i1] === ' ' || this.state[i2] === ' ')){
        return 0;
      }
      else if(this.state[i1] === ' ' && this.state[i2] === ' '){
        return 0;
      }
      else if(!this.touches(i1,i2)){
        return 0;
      }
      else {
        return 1;
      }
    }

    Board.prototype.swap = function(i1,i2,v){
      if (this.isValidSwap(i1,i2)){
        var old_i1 = this.state[i1];
        var old_i2 = this.state[i2];
        this.state[i1] = old_i2;
        this.state[i2] = old_i1;
        if (this.visible = true){
          $(".steps").append("<li>swapped \"" + old_i1 + "\" with \"" + old_i2 + "\"</li>");
          this.draw();
        }
      }
      else{
        console.log("FATAL: tried to perform illegal swap.");
      }
    }

    Board.prototype.blank_space = function(){
      return this.state.indexOf(' ');
    }

    Board.prototype.isGoalState = function(){
      return (this.state === goal_state);
    }

    // Use iterative deepening to solve
    Board.prototype.solve = function(){
      this.visible = false;

      var queue = []; // FIFO Queue
      queue.push(this);
      var finished = [];
      while(queue.length > 0){
        var new_board = queue.pop();
        finished.push(new_board);
        for (var i in this.state){
          if(new_board.isValidSwap(i, new_board.blank_space())){
            new_board.swap(i, new_board.blank_space());
            if(finished.indexOf(new_board) === -1){
              if(queue.indexOf(new_board) === -1){
                queue.push(new_board);
                if (new_board.isGoalState()){
                  console.log("found board");
                  return new_board; //or maybe our steps instead
                }
              }
            }
          }
        }
      }

      this.visible = true;
    }


    board = new Board(jumbled_state);
    board.draw();

    // initialize the board

    var clicks = 0;
    $(".solve").click(function(){
      board.solve();
    });

});