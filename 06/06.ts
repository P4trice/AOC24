const raw = await Deno.readTextFile("./06demo.txt");
const lines = raw.split("\n");
const playingField: string[][] = [];
const height = lines.length - 1;
for (let i = 0; i < height; i++) {
  playingField[i] = lines[i].split("");
}
const width = playingField[0].length;

const startingPosition = findStartingPos();
mapPath(startingPosition[0], startingPosition[1]);
let result = countVisitedPos();
//console.table(playingField);
console.log(result);

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

function mapPath(x: number, y: number): void {
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

function countVisitedPos() {
  //console.table(playingField);
  let counter = 0;
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (playingField[i][j] != "." && playingField[i][j] != "#") {
        counter++;
      }
    }
  }
  return counter;
}
