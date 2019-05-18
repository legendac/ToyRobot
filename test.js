const {
  processRobotCommands,
  processNewPos,
  setPos,
  setFacing,
  turnFacing,
  moveRobot
} = require("./index.js");

var assert = require("assert");
var sinon = require("sinon");

//1. unit under test

describe("Unit Tests - Processing Instruction", function() {
  describe("Setting Position - processNewPos function", function() {
    //2. scenario and 3. expectation
    it("When currentPos is specified and newPos is invalid, if returns currentPos object", () => {
      const currentPos = {
        x: 2,
        y: 2,
        facing: "NORTH"
      };
      const newInstruction = "6,5,NORTH";
      const newPos = processNewPos(currentPos, newInstruction);
      assert.deepEqual(newPos, currentPos);
    });

    it("When currentPos is specified and newPos is valid, if returns newPos object", () => {
      const currentPos = {
        x: 2,
        y: 2,
        facing: "NORTH"
      };
      const expectedPos = {
        x: 3,
        y: 5,
        facing: "SOUTH"
      };
      const newInstruction = "3,5,SOUTH";
      const newPos = processNewPos(currentPos, newInstruction);
      assert.deepEqual(newPos, expectedPos);
    });
  });

  describe("Setting Position - setPos function", function() {
    //2. scenario and 3. expectation
    it("When no position is specified, if returns null object", () => {
      const newPos = setPos();
      assert.equal(newPos, null);
    });

    it("When position given is at 0,0,NORTH, if returns back currentPos object", () => {
      const newPos = setPos(0, 0, "NORTH");
      const expectedPos = {
        x: 0,
        y: 0,
        facing: "NORTH"
      };
      assert.deepEqual(newPos, expectedPos);
    });

    it("When position given at 3,2,SOUTH, if returns back currentPos object", () => {
      const newPos = setPos(3, 2, "EAST");
      const expectedPos = {
        x: 3,
        y: 2,
        facing: "EAST"
      };
      assert.deepEqual(newPos, expectedPos);
    });

    it("When position given at -1,0,NORTH is out-of-bounds, if returns null object", () => {
      const newPos = setPos(-1, 0, "NORTH");
      assert.deepEqual(newPos, null);
    });
    it("When position given at 6,0,NORTH is out-of-bounds, if returns null object", () => {
      const newPos = setPos(6, 0, "NORTH");
      assert.deepEqual(newPos, null);
    });

    it("When position given at 0,-1,NORTH is out-of-bounds, if returns null object", () => {
      const newPos = setPos(0, -1, "NORTH");
      assert.deepEqual(newPos, null);
    });
    it("When position given at 0,6,NORTH is out-of-bounds, if returns null object", () => {
      const newPos = setPos(0, 6, "NORTH");
      assert.deepEqual(newPos, null);
    });

    it("When position given at 0,0,NORTHWEST is invalid, if returns null object", () => {
      const newPos = setPos(-1, 0, "NORTHWEST");
      assert.deepEqual(newPos, null);
    });
  });

  describe("Setting Facing - setFacing function", function() {
    //2. scenario and 3. expectation
    it("When no facing is specified, if returns back the same currentPos object", () => {
      const currentPos = {
        x: 3,
        y: 3,
        facing: "NORTH"
      };
      const facingInstruction = null;
      const newPos = setFacing(currentPos, facingInstruction);
      assert.deepEqual(newPos, currentPos);
    });

    it("When invalid facing is specified, if returns back the same currentPos object", () => {
      const currentPos = {
        x: 3,
        y: 3,
        facing: "NORTH"
      };
      const facingInstruction = "NORTHWEST";
      const newPos = setFacing(currentPos, facingInstruction);
      assert.deepEqual(newPos, currentPos);
    });

    it("When a NORTH facing is specified, if returns back the currentPos object with NORTH facing", () => {
      const currentPos = {
        x: 3,
        y: 3,
        facing: "EAST"
      };
      const expectedPos = {
        x: 3,
        y: 3,
        facing: "NORTH"
      };
      const f = "NORTH";
      const newPos = setFacing(currentPos, f);
      assert.deepEqual(newPos, expectedPos);
    });

    it("When a SOUTH facing is specified, if returns back the currentPos object with SOUTH facing", () => {
      const currentPos = {
        x: 3,
        y: 3,
        facing: "EAST"
      };
      const expectedPos = {
        x: 3,
        y: 3,
        facing: "SOUTH"
      };
      const facingInstruction = "SOUTH";
      const newPos = setFacing(currentPos, facingInstruction);
      assert.deepEqual(newPos, expectedPos);
    });

    it("When a EAST facing is specified, if returns back the currentPos object with EAST facing", () => {
      const currentPos = {
        x: 3,
        y: 3,
        facing: "NORTH"
      };
      const expectedPos = {
        x: 3,
        y: 3,
        facing: "EAST"
      };
      const facingInstruction = "EAST";
      const newPos = setFacing(currentPos, facingInstruction);
      assert.deepEqual(newPos, expectedPos);
    });

    it("When a WEST facing is specified, if returns back the currentPos object with WEST facing", () => {
      const currentPos = {
        x: 3,
        y: 3,
        facing: "NORTH"
      };
      const expectedPos = {
        x: 3,
        y: 3,
        facing: "WEST"
      };
      const facingInstruction = "WEST";
      const newPos = setFacing(currentPos, facingInstruction);
      assert.deepEqual(newPos, expectedPos);
    });
  });

  describe("Turn Facing - turnFacing function", function() {
    //2. scenario and 3. expectation
    it("When no instruction is specified, if returns back the same currentPos object", () => {
      const currentPos = {
        x: 3,
        y: 3,
        facing: "NORTH"
      };
      const facingInstruction = null;
      const newPos = turnFacing(currentPos, facingInstruction);
      assert.equal(newPos, currentPos);
    });

    it("When invalid facing is specified, if returns back the same currentPos object", () => {
      const currentPos = {
        x: 3,
        y: 3,
        facing: "NORTH"
      };
      const facingInstruction = "UP";
      const newPos = turnFacing(currentPos, facingInstruction);
      assert.deepEqual(newPos, currentPos);
    });

    it("When a LEFT turn is specified on NORTH facing object, if returns currentPos with WEST facing", () => {
      const currentPos = {
        x: 3,
        y: 3,
        facing: "NORTH"
      };
      const expectedPos = {
        x: 3,
        y: 3,
        facing: "WEST"
      };
      const facingInstruction = "LEFT";
      const newPos = turnFacing(currentPos, facingInstruction);
      assert.deepEqual(newPos, expectedPos);
    });
    it("When a RIGHT turn is specified on NORTH facing object, if returns currentPos with EAST facing", () => {
      const currentPos = {
        x: 3,
        y: 3,
        facing: "NORTH"
      };
      const expectedPos = {
        x: 3,
        y: 3,
        facing: "EAST"
      };
      const facingInstruction = "RIGHT";
      const newPos = turnFacing(currentPos, facingInstruction);
      assert.deepEqual(newPos, expectedPos);
    });

    it("When a LEFT turn is specified on NORTH facing object, if returns currentPos with WEST facing", () => {
      const currentPos = {
        x: 3,
        y: 3,
        facing: "NORTH"
      };
      const expectedPos = {
        x: 3,
        y: 3,
        facing: "WEST"
      };
      const facingInstruction = "LEFT";
      const newPos = turnFacing(currentPos, facingInstruction);
      assert.deepEqual(newPos, expectedPos);
    });
    it("When a RIGHT turn is specified on NORTH facing object, if returns currentPos with EAST facing", () => {
      const currentPos = {
        x: 3,
        y: 3,
        facing: "NORTH"
      };
      const expectedPos = {
        x: 3,
        y: 3,
        facing: "EAST"
      };
      const facingInstruction = "RIGHT";
      const newPos = turnFacing(currentPos, facingInstruction);
      assert.deepEqual(newPos, expectedPos);
    });

    it("When a LEFT turn is specified on SOUTH facing object, if returns currentPos with EAST facing", () => {
      const currentPos = {
        x: 3,
        y: 3,
        facing: "SOUTH"
      };
      const expectedPos = {
        x: 3,
        y: 3,
        facing: "EAST"
      };
      const facingInstruction = "LEFT";
      const newPos = turnFacing(currentPos, facingInstruction);
      assert.deepEqual(newPos, expectedPos);
    });
    it("When a RIGHT turn is specified on SOUTH facing object, if returns currentPos with WEST facing", () => {
      const currentPos = {
        x: 3,
        y: 3,
        facing: "SOUTH"
      };
      const expectedPos = {
        x: 3,
        y: 3,
        facing: "WEST"
      };
      const facingInstruction = "RIGHT";
      const newPos = turnFacing(currentPos, facingInstruction);
      assert.deepEqual(newPos, expectedPos);
    });

    it("When a LEFT turn is specified on EAST facing object, if returns currentPos with NORTH facing", () => {
      const currentPos = {
        x: 3,
        y: 3,
        facing: "EAST"
      };
      const expectedPos = {
        x: 3,
        y: 3,
        facing: "NORTH"
      };
      const facingInstruction = "LEFT";
      const newPos = turnFacing(currentPos, facingInstruction);
      assert.deepEqual(newPos, expectedPos);
    });
    it("When a RIGHT turn is specified on EAST facing object, if returns currentPos with SOUTH facing", () => {
      const currentPos = {
        x: 3,
        y: 3,
        facing: "EAST"
      };
      const expectedPos = {
        x: 3,
        y: 3,
        facing: "SOUTH"
      };
      const facingInstruction = "RIGHT";
      const newPos = turnFacing(currentPos, facingInstruction);
      assert.deepEqual(newPos, expectedPos);
    });

    it("When a LEFT turn is specified on WEST facing object, if returns currentPos with SOUTH facing", () => {
      const currentPos = {
        x: 3,
        y: 3,
        facing: "WEST"
      };
      const expectedPos = {
        x: 3,
        y: 3,
        facing: "SOUTH"
      };
      const facingInstruction = "LEFT";
      const newPos = turnFacing(currentPos, facingInstruction);
      assert.deepEqual(newPos, expectedPos);
    });
    it("When a RIGHT turn is specified on WEST facing object, if returns currentPos with NORTH facing", () => {
      const currentPos = {
        x: 3,
        y: 3,
        facing: "WEST"
      };
      const expectedPos = {
        x: 3,
        y: 3,
        facing: "NORTH"
      };
      const facingInstruction = "RIGHT";
      const newPos = turnFacing(currentPos, facingInstruction);
      assert.deepEqual(newPos, expectedPos);
    });
  });

  describe("Moving Robot's Position - moveRobot function", function() {
    //2. scenario and 3. expectation

    it("When object at 2,2 facing NORTH moves, if returns y+1 position", () => {
      const currentPos = {
        x: 2,
        y: 2,
        facing: "NORTH"
      };
      const newPos = moveRobot(currentPos);
      const expectedPos = {
        x: 2,
        y: 3,
        facing: "NORTH"
      };
      assert.deepEqual(newPos, expectedPos);
    });
    it("When object at 2,2 facing SOUTH moves, if returns y-1 position", () => {
      const currentPos = {
        x: 2,
        y: 2,
        facing: "SOUTH"
      };
      const newPos = moveRobot(currentPos);
      const expectedPos = {
        x: 2,
        y: 1,
        facing: "SOUTH"
      };
      assert.deepEqual(newPos, expectedPos);
    });
    it("When object at 2,2 facing EAST moves, if returns x+1 position", () => {
      const currentPos = {
        x: 2,
        y: 2,
        facing: "EAST"
      };
      const newPos = moveRobot(currentPos);
      const expectedPos = {
        x: 3,
        y: 2,
        facing: "EAST"
      };
      assert.deepEqual(newPos, expectedPos);
    });
    it("When object at 2,2 facing WEST moves, if returns x-1 position", () => {
      const currentPos = {
        x: 2,
        y: 2,
        facing: "WEST"
      };
      const newPos = moveRobot(currentPos);
      const expectedPos = {
        x: 1,
        y: 2,
        facing: "WEST"
      };
      assert.deepEqual(newPos, expectedPos);
    });
    it("When object at 5,5 facing NORTH moves, if returns same position", () => {
      const currentPos = {
        x: 5,
        y: 5,
        facing: "NORTH"
      };
      const newPos = moveRobot(currentPos);
      assert.deepEqual(newPos, currentPos);
    });
    it("When object at 5,5 facing EAST moves, if returns same position", () => {
      const currentPos = {
        x: 5,
        y: 5,
        facing: "EAST"
      };
      const newPos = moveRobot(currentPos);
      assert.deepEqual(newPos, currentPos);
    });
    it("When object at 0,0 facing SOUTH moves, if returns same position", () => {
      const currentPos = {
        x: 0,
        y: 0,
        facing: "SOUTH"
      };
      const newPos = moveRobot(currentPos);
      assert.deepEqual(newPos, currentPos);
    });
    it("When object at 0,0 facing WEST moves, if returns same position", () => {
      const currentPos = {
        x: 0,
        y: 0,
        facing: "WEST"
      };
      const newPos = moveRobot(currentPos);
      assert.deepEqual(newPos, currentPos);
    });
  });
});

describe("Integration Tests", function() {
  describe("Performing test scenarios - parsing test data - processRobotCommands", function() {
    it("When PLACE command is not specified and REPORT is done straight away, returns null object", () => {
      return processRobotCommands("test_data/test1.txt")
        .then(newPos => {
          assert.equal(newPos, null);
        })
        .catch(error => {
          assert.equal(error, "0,1,SOUTH");
        });
    });

    it("When PLACE command is specified and REPORT is done straight away, returns currentPos object", () => {
      return processRobotCommands("test_data/test2.txt")
        .then(newPos => {
          assert.equal(newPos, "0,2,NORTH");
        })
        .catch(error => {
          assert.equal(error, "0,2,NORTH");
        });
    });

    it("When MOVE command occurs multiple times before initial PLACE command, ignore MOVE commands", () => {
      return processRobotCommands("test_data/test3.txt")
        .then(newPos => {
          assert.equal(newPos, "0,1,SOUTH");
        })
        .catch(error => {
          assert.equal(error, "0,1,SOUTH");
        });
    });

    it("When PLACE command occurs midway through the commands, returns newPos with following commands", () => {
      return processRobotCommands("test_data/test4.txt")
        .then(newPos => {
          assert.equal(newPos, "2,3,EAST");
        })
        .catch(error => {
          assert.equal(error, "2,3,EAST");
        });
    });

    it("When multiple out-of-bound MOVES are tested through the commands, should remain at current Position and continue to process following commands", () => {
      return processRobotCommands("test_data/test5.txt")
        .then(newPos => {
          assert.equal(newPos, "0,1,SOUTH");
        })
        .catch(error => {
          assert.equal(error, "0,1,SOUTH");
        });
    });
    it("When invalid PLACE command occurs midway through the commands, continues on with previous Position with following commands", () => {
      return processRobotCommands("test_data/test6.txt")
        .then(newPos => {
          assert.equal(newPos, "0,3,SOUTH");
        })
        .catch(error => {
          assert.equal(error, "0,3,SOUTH");
        });
    });
  });
});
