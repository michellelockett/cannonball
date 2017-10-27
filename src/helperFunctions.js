//function to print the original puzzle, unchanged
function printOriginalPuzzle() {
     console.log(array[0]);
     console.log(array[1]);
     console.log(array[2]);
     console.log(array[3]);
}
//function to print the current state of the puzzle, used for after firing so user can choose next move
function printCurrentState(anyArray) {
  console.log(anyArray[0]);
  console.log(anyArray[1]);
  console.log(anyArray[2]);
  console.log(anyArray[3]);
  console.log('\n');
}

//creates the cannons and gets their initial state

function createCannons(array) {
  for (var i = 0; i < array.length*2; i++) {
    cannons.push(new Cannon(i));
  }
}

//function to check how many cannonballs are available.  Will want to update after each firing
function getCannonballs() {
  return cannonballs;
}

//check to see if the puzzle has been won!
function winnerCheck() {
  winner = true;
  state.forEach(function(row) {
    for (var i = 0; i <= row.length; i++) {
      if (state[state.indexOf(row)][i] > 0) {
        winner = false;
      }
    }
  });
  return winner;
}
//a function to reset the puzzle

function resetPuzzle() {
  state[0] = [200, 200, 400, 100];
  state[1] = [200, 500, 800, 400];
  state[2] = [300, 300, 500, 200];
  state[3] = [300, 300, 200, 200];
  cannonballs = 1;
}

//a function to lower the associated boats by 100 health points
//after a cannon is fired

function changeHealth(cannonNumber) {
  if (cannons[cannonNumber].row == true ) {
      for (var i = 0; i < state.length; i++) {
        state[cannonNumber][i] = state[cannonNumber][i] - 100;
    }
  } else {
    for (var j = 0; j < state.length; j++) {
      //cannon is either 4, 5, 6, or 7
      //column number needs to be either 0, 1, 2 or 3
      //if it's a column, need to be [0][column number], [1][column number}
      state[j][cannonNumber - state.length] = state[j][cannonNumber - state.length] - 100;
    }
  }
}

//checks the puzzle to see if we have received any cannonballs from this firing.  If so, updates the
//health value to a negative number for future checks
function checkNewCannonballs() {
  state.forEach(function(row) {
    for (var k = 0; k <=row.length; k++) {
      if (state[state.indexOf(row)][k] === 0) {
        cannonballs +=1;
        state[state.indexOf(row)][k] = -1;
        //console.log("You received a cannonball.  You now have " + getCannonballs() + " cannonballs.");
      }
    }
  });
}
// checks if the puzzle has been won or lost
function isLoserOrWinner() {
  if (cannonballs <=0) {
      console.log("No more cannons.  YOU LOSE!");
      return 0;
  }
  if (winnerCheck()) {
    console.log("You won!");
    return 2;
  }
  return 1;
}