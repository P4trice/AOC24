const raw = await Deno.readTextFile("./04.txt");
let lines = raw.split("\n");
const coords: string[][] = [];
for (let i = 0; i < lines.length; i++) {
  coords[i] = lines[i].split("");
  //console.log("coords-line: ", i, ": ", coords[i]);
}
let xmas: number = findXMAS(coords);
console.log(xmas);

function findXMAS(coords: string[][]): number {
  var counter: number = 0;
  for (let i = 0; i < coords.length; i++) {
    for (let j = 0; j < coords[i].length; j++) {
      if (coords[i][j] === "X") {
        counter = findMAS(coords, i, j, counter);
      }
    }
  }
  return counter;
}

//go in all directions
function findMAS(
  coords: string[][],
  x: number,
  y: number,
  counter: number
): number {
  let width = coords[0].length;
  let height = coords.length;

  //left
  let distanceToGo: number = Math.min(3, x);
  let check: string = "X";
  let i: number = x - 1;
  let j: number = y;
  for (let step = 0; step < distanceToGo; step++) {
    if (!checkInBounds(i, j, width, height)) {
      break;
    }
    check = checkAdd(coords[i][j], check);
    if (check === "XMAS") {
      counter++;
    }
    i--;
  }

  //left-up
  distanceToGo = Math.min(3, x, height - y);
  check = "X";
  i = x - 1;
  j = y + 1;
  for (let step = 0; step < distanceToGo; step++) {
    if (!checkInBounds(i, j, width, height)) {
      break;
    }
    check = checkAdd(coords[i][j], check);
    if (check === "XMAS") {
      counter++;
    }
    i--;
    j++;
  }

  //up
  distanceToGo = Math.min(3, height - y - 1);
  check = "X";
  i = x;
  j = y + 1;
  for (let step = 0; step < distanceToGo; step++) {
    if (!checkInBounds(i, j, width, height)) {
      break;
    }
    check = checkAdd(coords[i][j], check);
    if (check === "XMAS") {
      counter++;
    }
    j++;
  }

  //right-up
  distanceToGo = Math.min(3, width - x - 1, height - y - 1);
  check = "X";
  i = x + 1;
  j = y + 1;
  for (let step = 0; step < distanceToGo; step++) {
    if (!checkInBounds(i, j, width, height)) {
      break;
    }
    check = checkAdd(coords[i][j], check);
    if (check === "XMAS") {
      counter++;
    }
    i++;
    j++;
  }

  //right
  distanceToGo = Math.min(3, width - x - 1);
  check = "X";
  i = x + 1;
  j = y;
  for (let step = 0; step < distanceToGo; step++) {
    if (!checkInBounds(i, j, width, height)) {
      break;
    }
    check = checkAdd(coords[i][j], check);
    if (check === "XMAS") {
      counter++;
    }
    i++;
  }

  //right-down
  distanceToGo = Math.min(3, width - x - 1, y);
  check = "X";
  i = x + 1;
  j = y - 1;
  for (let step = 0; step < distanceToGo; step++) {
    if (!checkInBounds(i, j, width, height)) {
      break;
    }
    check = checkAdd(coords[i][j], check);
    if (check === "XMAS") {
      counter++;
    }
    i++;
    j--;
  }

  //down
  distanceToGo = Math.min(3, y);
  check = "X";
  i = x;
  j = y - 1;
  for (let step = 0; step < distanceToGo; step++) {
    if (!checkInBounds(i, j, width, height)) {
      break;
    }
    check = checkAdd(coords[i][j], check);
    if (check === "XMAS") {
      counter++;
    }
    j--;
  }

  //left-down
  distanceToGo = Math.min(3, x, y);
  check = "X";
  i = x - 1;
  j = y - 1;
  for (let step = 0; step < distanceToGo; step++) {
    if (!checkInBounds(i, j, width, height)) {
      break;
    }
    check = checkAdd(coords[i][j], check);
    if (check === "XMAS") {
      counter++;
    }
    i--;
    j--;
  }

  return counter;
}

// Check whether a char should be added to the string
function checkAdd(char: string, currCheck: string): string {
  //str.slice(-1);
  if (currCheck === "X" && char === "M") {
    return "XM";
  }
  if (currCheck === "XM" && char === "A") {
    return "XMA";
  }
  if (currCheck === "XMA" && char === "S") {
    //console.log("How far: ", currCheck, "Check: ", char);
    //console.log("XMAS");
    return "XMAS";
  }
  return currCheck;
}

function checkInBounds(
  x: number,
  y: number,
  width: number,
  height: number
): boolean {
  /*console.log("x: ", x);
  console.log("y: ", y);
  console.log("width: ", width);
  console.log("height: ", height);*/
  if (x >= 0 && x < width && y >= 0 && y < height) {
    return true;
  }
  return false;
}
