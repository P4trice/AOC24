const raw = await Deno.readTextFile("./07.txt");
const equations = raw.split("\n");
const results: number[] = [];
const inputs: number[][] = [];
for (let i = 0; i < equations.length - 1; i++) {
  results.push(equations[i].split(":").map(Number)[0]);
  inputs.push(equations[i].split(":")[1].split(" ").map(Number).splice(1));
}

solvePart2();

function solvePart2(): void {
  let finalNumber: number = 0;
  let possibleAns: number[] = [];
  for (let i = 0; i < inputs.length; i++) {
    //iterates through rows
    possibleAns = [];
    possibleAns.push(inputs[i][0]);
    for (let j = 1; j < inputs[i].length; j++) {
      let len: number = possibleAns.length;
      for (let k = 0; k < len; k++) {
        possibleAns.push(possibleAns[k] * inputs[i][j]);
        possibleAns.push(+("" + possibleAns[k] + inputs[i][j]));
        possibleAns[k] = possibleAns[k] + inputs[i][j];
      }
    }
    if (possibleAns.includes(results[i])) {
      console.log("Should be: ", results[i]);
      console.log("My Answers: ", possibleAns);
      finalNumber += results[i];
    }
  }
  console.log("Final number: ", finalNumber);
}

function solvePart1(): void {
  let finalNumber: number = 0;
  let possibleAns: number[] = [];
  for (let i = 0; i < inputs.length; i++) {
    //iterates through rows
    possibleAns = [];
    possibleAns.push(inputs[i][0]);
    for (let j = 1; j < inputs[i].length; j++) {
      let len: number = possibleAns.length;
      for (let k = 0; k < len; k++) {
        possibleAns.push(possibleAns[k] * inputs[i][j]);
        possibleAns[k] = possibleAns[k] + inputs[i][j];
      }
    }
    if (possibleAns.includes(results[i])) {
      finalNumber += results[i];
    }
  }
  console.log("Final number: ", finalNumber);
}
