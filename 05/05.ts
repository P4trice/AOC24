class Rules {
  before: number[] = [];
  after: number[] = [];
}

class KeyValue {
  private data: Record<number, Rules> = {};

  constructor() {
    return new Proxy(this, {
      get(target, key: string) {
        if (!(key in target.data)) {
          target.data[key] = new Rules(); // Auto-initialize Rules
        }
        return target.data[key];
      },
    });
  }
}

//SKRIPT-MAIN
const raw = await Deno.readTextFile("./05.txt");
const lines = raw.split("\n");
let wasEmptyLine = false;
let part_1: string[] = [];
let part_2: string[] = [];
for (let line of lines) {
  if (line === "") {
    wasEmptyLine = true;
    continue;
  }
  if (!wasEmptyLine) {
    part_1.push(line);
  } else {
    part_2.push(line);
  }
}

let data: number[][] = convert(part_2);

//convert part_2 to number-arrays

const lookup: KeyValue = parseRules(part_1);
console.log(exeRules(lookup, data));

//console.log("part1: ", part_1);
//console.log("part2: ", part_2);

/*
  Function to create the rules per entry
*/
function parseRules(rules: string[]): KeyValue {
  const keyValue: KeyValue = new KeyValue();
  let numPair: number[];
  for (const rule of rules) {
    numPair = rule.split("|").map(Number);
    keyValue[numPair[0]].after.push(numPair[1]);
    keyValue[numPair[1]].before.push(numPair[0]);
  }
  return keyValue;
}
/*
  Make number-array from strings
*/
function convert(part_2: string[]): number[][] {
  let data: number[][] = [];
  for (let i = 0; i < part_2.length; i++) {
    data[i] = part_2[i].split(",").map(Number);
  }
  return data;
}

/*
  Function to check if rules apply for lines
*/
function exeRules(lookup: KeyValue, data: number[][]): number {
  let sum: number = 0;
  for (let k = 0; k < data.length; k++) {
    if (checkRule(lookup, data[k])) {
      sum = sum + data[k][Math.floor(data[k].length / 2)];
    }
  }
  return sum;
}

function checkRule(lookup: KeyValue, data: number[]): boolean {
  let beforeSplice: number[] = [];
  let afterSplice: number[] = [];
  let isRowTrue: boolean = true;
  for (let i = 0; i < data.length; i++) {
    beforeSplice = data.slice(0, i);
    afterSplice = data.slice(i + 1);
    for (let j = 0; j < beforeSplice.length; j++) {
      if (lookup[data[i]].after.includes(beforeSplice[j])) {
        isRowTrue = false;
      }
    }
    for (let j = 0; j < afterSplice.length; j++) {
      if (lookup[data[i]].before.includes(afterSplice[j])) {
        isRowTrue = false;
      }
    }
  }
  return isRowTrue;
}
