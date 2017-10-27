describe('cannon ball puzzle', function() {

    beforeEach(function() {
        resetPuzzle();
    });

    it('should create new cannons proportional to the size of the boats array', function() {
        console.log("the length of the puzzle is ", array.length);
        console.log(cannons);
        expect(cannons.length).to.equal(8);
    });

    it('should create cannons that properly identify whether they are in a row or a column', function() {
        console.log(cannons[0]);
        expect(cannons[0]).to.have.property('row');
        expect(cannons[0]).to.have.property('column');
        expect(cannons[0].column).to.equal(false);
        expect(cannons[0].row).to.equal(true);
        expect(cannons[5].column).to.equal(true);
        expect(cannons[5].row).to.equal(false);
    });

    it('should retrieve the boats stored at each cannon slot', function() {
        var boats = (cannons[0].boats);
        expect(boats).to.not.be.empty;
        expect(boats.length).to.equal(4);
        expect(boats).to.deep.equal(array[0]);
    });

    it('should change the boats health value after firing a cannon for a row', function() {
        var boatsBefore = cannons[0].boats;
        var otherBoatsBefore = cannons[1].boats;
        fireCannon(0);
        var boatsAfter = cannons[0].boats;
        var otherBoatsAfter = cannons[1].boats;
        expect(boatsBefore).to.not.deep.equal(boatsAfter);
        expect(boatsBefore[0]).to.equal(boatsAfter[0] + 100);
        expect(otherBoatsBefore).to.deep.equal(otherBoatsAfter);
    });

     it('should change the boats health value after firing a cannon for a column', function() {
        var boatsBefore = cannons[5].boats;
        var otherBoatsBefore = cannons[7].boats;
        fireCannon(5);
        var boatsAfter = cannons[5].boats;
        var otherBoatsAfter = cannons[7].boats;
        console.log(boatsBefore, boatsAfter);
        expect(boatsBefore).to.not.deep.equal(boatsAfter);
        expect(boatsBefore[0]).to.equal(boatsAfter[0] + 100);
        expect(otherBoatsBefore).to.deep.equal(otherBoatsAfter);
    });

    it('should correctly identify whether a user has won the puzzle', function() {
        state.forEach(function(row) {
            for (var i = 0; i < row.length; i++) {
                row[i] = -1;
            }
        });
        expect(winnerCheck()).to.equal(true);
        resetPuzzle();
        expect(winnerCheck()).to.equal(false);
    });

    it('should correctly identify whether a user has lost the puzzle', function() {
        fireCannon(0);
        fireCannon(0);
        fireCannon(0);
        expect(fireCannon(0)).to.equal(1);
        expect(fireCannon(0)).to.equal(0);
    });

    it('should update the number of cannonballs after a boat has been destroyed', function() {
        fireCannon(0);
        fireCannon(0);
        expect(cannonballs).to.equal(2);
    });
});