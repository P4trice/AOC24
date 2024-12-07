const raw = await Deno.readTextFile("./04.txt");
let lines = raw.split("\n");
const coords: string[][] = [];
for (let i = 0; i < lines.length; i++) {
  coords[i] = lines[i].split("");
  //console.log("coords-line: ", i, ": ", coords[i]);
}
let xmas: number = findxMAS(coords);
console.log(xmas);

function findxMAS(coords: string[][]): number {
  var counter: number = 0;
  for (let i = 1; i < coords.length - 1; i++) {
    for (let j = 1; j < coords[i].length - 1; j++) {
      if (coords[i][j] === "A") {
        counter = findMAS(coords, i, j, counter);
      }
    }
  }
  return counter;
}

//go in all directions
function findMAS(coords: string[][], x: number, y: number, counter: number) {
  if (
    (coords[x - 1][y - 1] === "M" && coords[x + 1][y + 1] === "S") ||
    (coords[x - 1][y - 1] === "S" && coords[x + 1][y + 1] === "M")
  ) {
    if (
      (coords[x - 1][y + 1] === "M" && coords[x + 1][y - 1] === "S") ||
      (coords[x - 1][y + 1] === "S" && coords[x + 1][y - 1] === "M")
    ) {
      counter++;
    }
  }
  return counter;
}
