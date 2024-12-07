const raw = await Deno.readTextFile("./03.txt");
var nums: number[][] = extractNumbers(raw);
var result: number = calc(nums);
console.log("Result: ", result);

function extractNumbers(raw: string): number[][] {
  var regex = /mul\((\d{1,3}),(\d{1,3})\)/g;
  var result: any;
  var matches: string[] = [];
  var regex = /mul\((\d{1,3}),(\d{1,3})\)/g;
  while ((result = regex.exec(raw))) {
    matches.push(result[0]); // Push the entire matched string
  }
  var output: number[][] = [];
  for (var i = 0; i < matches.length; i++) {
    matches[i] = matches[i].slice(4, -1);
    output[i] = matches[i].split(",").map(Number);
  }
  console.log(output); // Outputs the matched strings

  return output;
}

function calc(summands: number[][]): number {
  var res: number = 0;
  for (let i = 0; i < summands.length; i++) {
    res = res + summands[i][0] * summands[i][1];
  }
  return res;
}

/*
Adjusting for the next thing -> find index as well, put it into the same
array-line. Then we also gather do() and don't() as [index, instruction].
We then interate through everything and only conditionally add.
  */
