let x = [2, 5, 8, 3];

x.push(10);
console.log(x);

x.unshift(7);
console.log(x);

x.pop();
console.log(x);

x.shift();
console.log(x);

delete x[2];
console.log(x);
console.log(x[2]);

x.splice(-2, 1);
console.log(x);
let replacedElements = x.splice(1, 2, "replaced2", "replaced3", "replaced4");
console.log("replaced elements: ", replacedElements, ", current array: " + x);

x = [2, 5, 3, 8];
x.splice(2, 0, "inserted1", "inserted2");
console.log("after inserting elements: ", x);

x.splice(2, 2);
console.log("after removing inserted elements: ", x);

x = [2, 5, 3, 8];
let slicedpart = x.slice(1, 3);
console.log(
  "sliced part: ",
  slicedpart,
  ", current reversed array: " + x.reverse()
);

console.log("sorted array: ", x.sort());

array1 = [1, 2, 3];
array2 = ["semon", "john"];
array3 = array2.concat(" ", array1); //as it used with strings
console.log(array3);

nestedArray = [
  [1, 2, [7, 3]],
  [["badr", "amir", ["abear", "aya"]], 3, 4],
  ["ahmed", "ali"],
];
flattedArray = nestedArray.flat(); // Flatten the nested array of the first level
console.log(flattedArray);
flattedArrayDeep = nestedArray.flat(2); // Flatten the nested array to a depth of 2(second level)
console.log(flattedArrayDeep);

let students = [
  "semon",
  "john",
  "badr",
  "amir",
  "abear",
  "aya",
  "ahmed",
  "badr",
  "ali",
];
console.log("first registered badr is in: ", students.indexOf("badr"));
console.log("last registered badr is in: ", students.lastIndexOf("badr"));
console.log("alphabetically sorted students array: ", students.sort());
console.log("including aya: ", students.includes("aya"));
console.log(
  "'semon' including 'mon': ",
  students[students.length - 1].includes("mon")
); //acts with the string as an array of all possible substrings

let usersData = {
  semon: {
    age: 25,
    email: "semonhany848@gmail.com",
    phones: ["01012345678", "01123456789"],
    address: {
      city: "Cairo",
      street: "El-Mohandseen",
      building: "123",
    },
  },
};
console.log("semon's age: ", usersData["semon"]["age"]);
console.log("semon's email: ", usersData.semon.email);
console.log("semon's first phone: ", usersData["semon"].phones[0]);
usersData.ali = {
  age: 30,
  email: "alimamdouh974@gmail.com",
  phones: ["01234567890", "01567890123"],
  address: {
    city: "Alexandria",
    street: "El-Montazah",
    building: "456",
  },
};
console.log("ali's age: ", usersData.ali.age);
let usersDataKeys = Object.keys(usersData);
let usersDataValues = Object.values(usersData);
console.log("usersData keys: ", usersDataKeys);
console.log("usersData values: ", usersDataValues);
console.log(usersData[usersDataKeys[1]].address.city);
console.log(usersDataValues[1].address.city);

usersData.safaa = Object.create({
  age: 28,
  email: "safaaabdo532@gmail.com",
  phones: ["01098765432", "01187654321"],
  address: {
    city: "Giza",
    street: "El-Haram",
    building: "789",
  },
}); //like an inheritance from a prototype
console.log("safaa's data after creation: ", usersData.safaa);
//it's empty because it hasn't own properties yet صفات متنحية

usersData.safaa = Object.assign(
  {},
  {
    age: 28,
    email: "safaaabdo532@gmail.com",
    phones: ["01098765432", "01187654321"],
    address: {
      city: "Giza",
      street: "El-Haram",
      building: "789",
    },
  }
); //assign the target object properties to the source object properties and create if not exist, but doesn't remove existing properties (that are not existing in source).
console.log("safaa's data after assignment: ", usersData.safaa);
