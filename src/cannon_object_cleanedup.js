var array = [];
var arrayCopy = [];
var cannons = [];
var cannonballs = 1;
var legalMoves = [];
var successes = [];

//creating the original puzzle array of boats with their health points as the values
//create a copy, so we can track the changes in the state of the puzzle as we fire cannons

array[0] = [200, 200, 400, 100];
array[1] = [200, 500, 800, 400];
array[2] = [300, 300, 500, 200];
array[3] = [300, 300, 200, 200];
arrayCopy[0] = [200, 200, 400, 100];
arrayCopy[1] = [200, 500, 800, 400];
arrayCopy[2] = [300, 300, 500, 200];
arrayCopy[3] = [300, 300, 200, 200];

var state = arrayCopy;


function Cannon (number) {

    this.number = number;
    this.boats = [];
    this.row;
    this.column;

    if (number < array.length) {
    	this.row = true;
    	this.column = false;
    } else {
    	this.row = false;
    	this.column = true;
    }

    this.getBoats();
}

//updates the boats associated to each cannon.  Will want to do this after firing a cannon
Cannon.prototype.getBoats = function() {
	var boatCopy = [];
	if (this.row == true) {
		for (var j = 0; j < state.length; j++) {
			boatCopy.push(state[this.number][j]);
		}
	} else {
		for (var i = 0; i < state.length; i++) {
			boatCopy.push(state[i][this.number - array.length]);
		}
	}
	this.boats = boatCopy;
	return this.boats;
}

//a function to fire a cannon
function fireCannon(cannonNumber) {
	console.log("Cannon " + cannonNumber +  " has fired!");

	//we have used a cannonball - update the value
	cannonballs = cannonballs - 1;

	//change the boats' health values by -100 for each boat in the row or column
	changeHealth(cannonNumber);

	//updates boat attribute of all cannons
	cannons.forEach(function(cannon) {
		cannon.getBoats();
	});

	//prints the current puzzle for the user
	//printCurrentState(state);

	//see if we received any cannonballs from this firing
	checkNewCannonballs();

	//check to see if the person has lost or won, returning the appropriate values
	return isLoserOrWinner();

	//if it was a successful fire and the user has not yet won or lost, should return 1
	//return 1;
}

//create the cannons!

createCannons(array);

// findPath();
// console.log(successes);
