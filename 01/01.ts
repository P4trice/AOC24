const raw = await Deno.readTextFile("./01.txt")
const list = raw.split("\n")

var list1: number[] = [];
var list2: number[] = [];

var temp = [];

for(let i = 0; i < list.length-1; i++) {
  temp = list[i].split("   ");
  list1[i] = parseInt(temp[0]);
  list2[i] = parseInt(temp[1]);
}
// so good so far
list1 = list1.sort();
list2 = list2.sort();

var result = 0;
for(let i = 0; i < list1.length; i++) {
  result = result + Math.abs((list1[i] - list2[i]));
}

console.log("Diff: " + result)

result = 0;
for(let i = 0; i < list1.length; i++) {
  for(let j = 0; j < list2.length; j++) {
    if(list1[i] == list2[j]){
      result = result + list1[i]
    } else if(list1[i] < list2[j]) {
      break;
    }
  }
}
console.log("Similarity Score: " + result)
