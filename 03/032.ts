const raw = await Deno.readTextFile("./03.txt");
var result: number = extractNumbers(raw);
console.log("Result: ", result);

function extractNumbers(raw: string): number {
  var mulRegex = /mul\((\d{1,3}),(\d{1,3})\)/g;
  var doRegex = /do\(\)/g;
  var dontRegex = /don't\(\)/g;
  var result: any;
  var matches: string[] = [];
  var indices: string[][] = [];

  while ((result = mulRegex.exec(raw))) {
    let numbers = result[0].slice(4, -1).split(",").map(Number);
    indices.push([result.index, "mul", numbers[0], numbers[1]]); // Push the entire matched string
  }

  while ((result = doRegex.exec(raw))) {
    indices.push([result.index, "do"]);
  }
  //console.log("Indices: ", indices.length);

  while ((result = dontRegex.exec(raw))) {
    indices.push([result.index, "don't"]);
  }
  //console.log("Indices: ", indices.length);
  //console.log(indices);

  indices.sort(function (a, b) {
    return a[0] - b[0]; // Compare the first element (number) of each subarray
  });

  var exe: boolean = true;
  var res: number = 0;
  for (let i = 0; i < indices.length; i++) {
    switch (indices[i][1]) {
      case "do": {
        exe = true;
        break;
      }
      case "don't": {
        exe = false;
        break;
      }
      case "mul": {
        if (exe) {
          res = res + indices[i][2] * indices[i][3];
        }
        break;
      }
    }
  }
  return res;
}
