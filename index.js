// Import packages to perform I/O:

const fs = require("fs");
const readline = require("readline");

mainMethod("index.txt");

async function mainMethod(inputFileDir) {
  await processRobotCommands("index.txt")
    .then(console.log)
    .catch(error => {
      console.log(error);
    });
}

async function processRobotCommands(inputFileDir) {
  try {
    // Processing Robot Commands Line by Line based on inputFile

    const fileStream = fs.createReadStream(inputFileDir);

    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });
    // Note: we use the crlfDelay option to recognize all instances of CR LF
    // ('\r\n') in input.txt as a single line break.

    let output = null;
    let currentPos = null;
    let returnedMessage;

    for await (const line of rl) {
      // Each line in input.txt will be successively available here as `line`.
      const instruction = line.toUpperCase();

      // Process Instruction
      returnedMessage = processInstruction(currentPos, instruction, output);
      currentPos = returnedMessage.newPos;
      output = returnedMessage.newOutput;
    }
    return output;
  } catch (err) {
    console.log("process err", err);
    return null;
  }
}

function processInstruction(currentPos, instructionCmd, output) {
  // duplicate currentPos in new variable
  let newPos = currentPos;
  let newOutput = output;
  // parse instructions
  const instructionCmdArr = instructionCmd.toString().split(" "); // PLACE 0,3,NORTH
  const instruction = instructionCmdArr[0]; // "PLACE"

  // handle different instructions
  switch (instruction) {
    case "PLACE":
      // verify if new position is valid
      newPos = processNewPos(currentPos, instructionCmdArr[1]);
      break;

    case "MOVE":
      if (newPos) {
        newPos = moveRobot(currentPos);
      }
      break;

    case "LEFT":
    case "RIGHT":
      // Turning Right, anti-CW 90degree
      if (newPos) {
        newPos = turnFacing(currentPos, instruction);
      }
      break;

    case "REPORT":
      if (newPos) {
        newOutput =
          newOutput +
          currentPos.x +
          "," +
          currentPos.y +
          "," +
          currentPos.facing;
      }
      break;
  }
  return { newPos, newOutput };
}

function processNewPos(currentPos, instructionCmdArr) {
  const parsePos = instructionCmdArr.toString().split(",");
  const idealPos = setPos(parsePos[0], parsePos[1], parsePos[2]);
  if (idealPos) {
    return idealPos;
  }
  return currentPos;
}

// returns new position of robot if parameters fall within the boundaries of the grid
function setPos(x, y, f) {
  if (
    x >= 0 &&
    x <= 5 &&
    y >= 0 &&
    y <= 5 &&
    (f === "NORTH" || f === "SOUTH" || f === "EAST" || f === "WEST")
  ) {
    return {
      x: parseInt(x),
      y: parseInt(y),
      facing: f
    };
  } else {
    return null;
  }
}

// set facing and returns currentPos object
function setFacing(currentPos, f) {
  if (f) {
    switch (f) {
      case "NORTH":
      case "SOUTH":
      case "EAST":
      case "WEST":
        currentPos.facing = f;
        break;
    }
  }
  return currentPos;
}

// turn facing of robot based on LEFT or RIGHT, returns currentPos object
function turnFacing(currentPos, newDirection) {
  const currentDirection = currentPos.facing;
  let newFacing = "";
  switch (currentDirection) {
    case "NORTH":
      switch (newDirection) {
        case "LEFT":
          newFacing = "WEST";
          break;

        case "RIGHT":
          newFacing = "EAST";
          break;
      }
      break;

    case "SOUTH":
      switch (newDirection) {
        case "LEFT":
          newFacing = "EAST";
          break;

        case "RIGHT":
          newFacing = "WEST";
          break;
      }
      break;
    case "EAST":
      switch (newDirection) {
        case "LEFT":
          newFacing = "NORTH";
          break;

        case "RIGHT":
          newFacing = "SOUTH";
          break;
      }
      break;
    case "WEST":
      switch (newDirection) {
        case "LEFT":
          newFacing = "SOUTH";
          break;

        case "RIGHT":
          newFacing = "NORTH";
          break;
      }
      break;
  }
  return setFacing(currentPos, newFacing);
}

// move robot by 1 unit in the direction it is currently facing if it is within the boundary of the grid, returns currentPos object
function moveRobot(currentPos) {
  const currentDirection = currentPos.facing;
  var posX = currentPos.x;
  var posY = currentPos.y;

  switch (currentDirection) {
    case "NORTH":
      if (posY + 1 <= 5) {
        posY = posY + 1;
      }
      break;
    case "SOUTH":
      if (posY - 1 >= 0) {
        posY = posY - 1;
      }
      break;
    case "EAST":
      if (posX + 1 <= 5) {
        posX = posX + 1;
      }
      break;
    case "WEST":
      if (posX - 1 >= 0) {
        posX = posX - 1;
      }
      break;
  }
  return {
    x: posX,
    y: posY,
    facing: currentDirection
  };
}

//export modules to be used in Mocha
module.exports.processRobotCommands = processRobotCommands;
module.exports.processNewPos = processNewPos;
module.exports.setPos = setPos;
module.exports.setFacing = setFacing;
module.exports.turnFacing = turnFacing;
module.exports.moveRobot = moveRobot;
