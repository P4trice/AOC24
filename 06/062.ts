const raw = await Deno.readTextFile("./06.txt");
const lines = raw.split("\n");
var playingField: string[][] = [];
const originalPlayingField: string[][] = [];
const height = lines.length - 1;
for (let i = 0; i < height; i++) {
  playingField[i] = lines[i].split("");
  originalPlayingField[i] = lines[i].split("");
}
const width = playingField[0].length;

const startingPosition = findStartingPos();
mapOriginalPath(startingPosition[0], startingPosition[1]);
var playingFieldCopy: string[][] = [];
//console.table(playingField);
var playingFieldCopy = structuredClone(playingField);
//console.table(playingFieldCopy);

console.log(solveObstacleProblem() - 1);

function mapPathCopy(): boolean {
  let x: number = startingPosition[0];
  let y: number = startingPosition[1];
  let moves: number = 0;
  while (true) {
    moves++;
    if (moves > 25000) {
      return true;
    }
    let currentField = playingFieldCopy[y][x];
    switch (currentField) {
      case "^": {
        if (isOutOfBounds(x, y - 1, currentField)) {
          return false;
        }
        if (isRepeatingCopy(x, y - 1, currentField)) {
          return true;
        }
        if (isObstacleCopy(x, y - 1)) {
          playingFieldCopy[y][x] = ">";
        } else {
          y = y - 1;
          playingFieldCopy[y][x] = "^";
        }
        break;
      }

      case "<": {
        if (isOutOfBounds(x - 1, y, currentField)) {
          return false;
        }
        if (isRepeatingCopy(x - 1, y, currentField)) {
          return true;
        }
        if (isObstacleCopy(x - 1, y)) {
          playingFieldCopy[y][x] = "^";
        } else {
          x = x - 1;
          playingFieldCopy[y][x] = "<";
        }
        break;
      }

      case ">": {
        if (isOutOfBounds(x + 1, y, currentField)) {
          return false;
        }
        if (isRepeatingCopy(x + 1, y, currentField)) {
          return true;
        }
        if (isObstacleCopy(x + 1, y)) {
          playingFieldCopy[y][x] = "v";
        } else {
          x = x + 1;
          playingFieldCopy[y][x] = ">";
        }
        break;
      }

      case "v": {
        if (isOutOfBounds(x, y + 1, currentField)) {
          return false;
        }
        if (isRepeatingCopy(x, y + 1, currentField)) {
          return true;
        }
        if (isObstacleCopy(x, y + 1)) {
          playingFieldCopy[y][x] = "<";
        } else {
          y = y + 1;
          playingFieldCopy[y][x] = "v";
        }
        break;
      }
    }
  }
}

function isObstacleCopy(x: number, y: number): boolean {
  if (playingFieldCopy[y][x] === "#" || playingFieldCopy[y][x] === "O") {
    return true;
  } else {
    return false;
  }
}

function isOutOfBounds(x: number, y: number, dir: string): boolean {
  if (0 <= x && x < width && 0 <= y && y < height) {
    return false;
  } else {
    return true;
  }
}

function isRepeatingCopy(x: number, y: number, dir: string): boolean {
  if (playingFieldCopy[y][x] === dir) {
    return true;
  } else {
    return false;
  }
}

function solveObstacleProblem(): number {
  let counter: number = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (x === startingPosition[0] && y === startingPosition[1]) {
        continue;
      }
      if (playingField[y][x] != "." && playingField[y][x] != "#") {
        playingFieldCopy[y][x] = "O";
        if (mapPathCopy()) {
          counter++;
          //console.log("counter: ", counter);
        }
        //playingFieldCopy = playingField.slice();
        //console.table(playingFieldCopy);
        playingFieldCopy = structuredClone(originalPlayingField);
      }
    }
  }
  return counter;
}

function mapOriginalPath(x: number, y: number): void {
  while (true) {
    let currentField = playingField[y][x];
    switch (currentField) {
      case "^": {
        if (isRepeating(x, y - 1, currentField)) {
          return;
        }
        if (isObstacle(x, y - 1)) {
          playingField[y][x] = ">";
        } else {
          y = y - 1;
          playingField[y][x] = "^";
        }
        break;
      }

      case "<": {
        if (isRepeating(x - 1, y, currentField)) {
          return;
        }
        if (isObstacle(x - 1, y)) {
          playingField[y][x] = "^";
        } else {
          x = x - 1;
          playingField[y][x] = "<";
        }
        break;
      }

      case ">": {
        if (isRepeating(x + 1, y, currentField)) {
          return;
        }
        if (isObstacle(x + 1, y)) {
          playingField[y][x] = "v";
        } else {
          x = x + 1;
          playingField[y][x] = ">";
        }
        break;
      }

      case "v": {
        if (isRepeating(x, y + 1, currentField)) {
          return;
        }
        if (isObstacle(x, y + 1)) {
          playingField[y][x] = "<";
        } else {
          y = y + 1;
          playingField[y][x] = "v";
        }
        break;
      }
    }
  }
}

function isObstacle(x: number, y: number): boolean {
  if (0 <= x && x < width && 0 <= y && y < height) {
    if (playingField[y][x] === "#") return true;
    else return false;
  } else return false;
}

function isRepeating(x: number, y: number, dir: string): boolean {
  try {
    if (0 <= x && x < width && 0 <= y && y < height) {
      if (playingField[y][x] === dir) return true;
      else return false;
    } else return true;
  } catch {
    //console.log(x);
    //console.log(y);
  }
  return false;
}

function findStartingPos(): number[] {
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (playingField[y][x] === "^") {
        return [x, y];
      }
    }
  }
  return [0, 0];
}
