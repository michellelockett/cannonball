var currentPath = [0];

//helper function to calculate the state of the puzzle with the current path
function currentStateOfPath(array) {
  for (var i = 0; i < array.length; i++) {
    fireCannon(array[i]);
  }
  if (winnerCheck()) {
    return 2;
  } else if (cannonballs > 0) {
    return 1;
  }
  return 0;
}

//helper function to increment the last element in the path array

function incrementLast(array) {
  var copy = array.slice();

  //if the cannon is 7, we have exhausted all options for that place in the path.  delete that element,
  //and increment the resulting last number in the array
  while (copy[copy.length - 1] === 7) {
    copy.pop();
  }
  //otherwise, just increment the last number in the array
  copy[copy.length - 1] = copy[copy.length - 1] + 1;
  return copy;
}

function findPath() {

  console.log('the path at the first call of function is ' + currentPath + '\nOur current successes are: ')
  console.log(successes);
  var value = currentStateOfPath(currentPath);
  console.log('the value is ' + value);

  if (currentPath.length === 0) {
    console.log('finished checking for paths')
    return successes;
  }
}

//  if (value === 2) {
//    successes.push(currentPath);
//    console.log(successes);
//    console.log("we found a successful path " + currentPath);
//    currentPath = incrementLast(currentPath);
//    resetPuzzle();
//    findPath();
//  } else if (value === 1) {
//    console.log("so far so good with the current path: " + currentPath)
//    currentPath.push(0);
//    console.log('I have added a zero to the path.  The path is now ' + currentPath);
//    resetPuzzle();
//    console.log('The puzzle is reset and calling the function again now');
//    findPath();
//  } else if (value === 0) {
//    console.log('we hit a dead end with the path ' + currentPath);
//    currentPath = incrementLast(currentPath);
//    console.log('After updating, the current path is now ' + currentPath);
//    resetPuzzle();
//    findPath();
//  }
// }
