const raw = await Deno.readTextFile("./02.txt");
const reports = raw.split("\n").map((line) => line.split(/\s+/).map(Number));

var direction: string;
var counter = 0;
for (const report of reports) {
  var temp = true;
  var damp = 0;
  direction = determineDirection(report[0], report[1]);
  if (report.length < 2) {
    continue;
  }
  for (var i = 0; i < report.length - 1; i++) {
    temp = temp && isSafe(report[i], report[i + 1], direction);
  }
  if (!temp) {
    if (!checkDamp(report)) {
      continue;
    } else {
      counter++;
    }
  } else {
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

function checkDamp(report: number[]): boolean {
  var copy: number[];
  var direction: string;
  var outer: boolean;
  var inner: boolean;
  for (let i = 0; i < report.length; i++) {
    copy = report.slice();
    if (copy.length < 2) {
      return true;
    }
    console.log("Before: ", copy);
    copy.splice(i, 1);
    console.log("After: ", copy);
    if (copy[1] > copy[0]) {
      direction = "inc";
    } else {
      direction = "dec";
    }
    for (let j = 0; j < copy.length - 1; j++) {
      temp = isSafe(copy[j], copy[j + 1], direction);
      if (!temp) {
        break;
      }
    }
    if (temp) {
      console.log("True");
      return true;
    }
  }
  if (!temp) {
    return false;
  }
}
