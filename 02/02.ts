const raw = await Deno.readTextFile("./02.txt");
const reports = raw.split("\n").map((line) => line.split(/\s+/).map(Number));

var direction: string;
var counter = 0;
for (const report of reports) {
  var temp = true;
  direction = determineDirection(report[0], report[1]);
  if (report.length < 2) {
    continue;
  }
  for (var i = 0; i < report.length - 1; i++) {
    temp = isSafe(report[i], report[i + 1], direction);
    if (!temp) {
      break;
    }
  }
  if (temp) {
    counter++;
  }
}
console.log(counter);

function determineDirection(a: number, b: number): string {
  if (b > a) {
    return "inc";
  } else {
    return "dec";
  }
}

function isSafe(a: number, b: number, direction: string): boolean {
  const diff = b - a;
  if (
    diff === 0 ||
    Math.abs(diff) > 3 ||
    (direction === "dec" && diff > 0) ||
    (direction === "inc" && diff < 0)
  ) {
    return false;
  } else {
    return true;
  }
}
