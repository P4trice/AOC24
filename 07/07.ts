const raw = await Deno.readTextFile("./07.txt");
const equations = raw.split("\n");
const results: number[] = [];
for (let equation of equations) {
  results.push(equation.split(":").map(Number)[0]);
}
console.log(results);
