$(document).ready(function () {
    // 9 letters 
    var goal_state = ['a', 'b', 'c',  // 0 1 2
                      'd', 'e', 'f',  // 3 4 5
                      'g', 'h', ' ']; // 6 7 8

    var jumbled_state = ['a', 'b', ' ',  // 0 1 2
                         'd', 'e', 'c',  // 3 4 5
                         'g', 'h', 'f']; // 6 7 8

    // Board Collection based on JS Array
    function BoardCollection() { };
    BoardCollection.prototype = new Array;

    BoardCollection.prototype.contains = function(object){
        var found = true;
        for (var i = 0; i < this.length; i++){
          for (var j = 0; j < this[i].state.length; j++){
            if (this[i].state[j] !== object.state[j]){
              found = false;
              break;
            }
          } 
          if (found !== false){
            return true;
          } 
        }
        return false;
      }

    // Board object
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
      if (i1 < 3 && i2 < 3){
        //row 1
        return true;
      }
      else if (i1 < 6 && i2 < 6){
        //row 2
        return true;
      }
      else if (i1 < 9 && i2 < 9){
        //row 3
        return true;
      }
      else {
        return false;
      }
    }

    Board.prototype.touches = function(i1,i2){
      // if is in same column
      if (i1 % 3 === i2 % 3){
        if (Math.abs(i1 - i2) === 3){
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
      var old_i1 = this.state[i1];
      var old_i2 = this.state[i2];
      this.state[i1] = old_i2;
      this.state[i2] = old_i1;
      if (this.visible === true){
        $(".steps").append("<li>swapped \"" + old_i1 + "\" with \"" + old_i2 + "\"</li>");
        this.draw();
      }
    }

    Board.prototype.blank_space = function(){
      return this.state.indexOf(' ');
    }

    Board.prototype.isGoalState = function(){
      for (var i = 0; i < this.state.length; i++){
        if(this.state[i] !== goal_state[i]){
          return false;
        }
      }
      return true;
    }

    // Use iterative deepening to solve
    Board.prototype.solve = function(){

      var queue = new BoardCollection(); // FIFO Queue
      queue.push(this);
      var finished = new BoardCollection();

      while(queue.length < 100){
        var new_board = queue.pop();
        if (new_board.isGoalState()){
          return new_board;
        }
        finished.push(new_board);
        for (var i = 0; i < 9; i++){
          if(new_board.isValidSwap(i, new_board.blank_space())){
            var child = new Board(new_board.state.slice(0));
            child.swap(i, child.blank_space());
            console.log(child.state);
            if(!finished.contains(child)){
              if(!queue.contains(child)){
                queue.push(child);
                if (child.isGoalState()){
                  console.log("found board");
                  return child; //or maybe our steps instead
                }
              }
            }
          }
        }
        console.log(queue.length);
      }
    }


    var board = new Board(jumbled_state);
    board.draw();

    // initialize the board

    var clicks = 0;
    $(".solve").click(function(){
      board.solve();
      console.log("left solve method");
    });

});