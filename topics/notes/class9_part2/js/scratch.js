// const numbers = [1, 2, 3, 4, 5];
// const squaredNumbers = numbers.map(
//     function (num) {
//         return (
//             num * num * num
//         )
//     }
// );
const numbers_filter = [1, 28, 355, 44, 51, 78];
const evenNumbers = numbers_filter.filter(
    function (num) {
        return (num % 2 === 0)
    })
console.log(evenNumbers);

const strings_filter = ["banana", "oranges", "peppers", "tamatoes", "peas", "pears", "kiwi"];
const startsWithP = strings_filter.filter(
    function (str) {
        return (str.startsWith("p"))
    })
console.log(startsWithP);

/** REDUCE */
const numbers_n = [11, 2, 32, 4, 5, 70];

const sum = numbers_n.reduce(
    function (accum, initval) {
        return (accum + initval)
    }, 0)

console.log(sum);

const donuts = [
    { name: 'mondays_donut', type: 'sparkly' },
    { name: 'tuesdays_donut', type: 'shiny' },
    { name: 'wednesdays_donut', type: 'squashy' }
];

const newObjectFromArray = donuts.reduce((accum, item) => {
    /* accumulator is the array building */
    console.log(accum)
    // add object key to our object i.e. mondays_donut: { type: 'sparkly' }
    accum[item.name] = { type: item.type };
    return accum;
}, {});
console.log(newObjectFromArray)

const numbers_toFind = [24, 67, 45, 95];
const multipleOfFive = numbers_toFind.find(
    function (num) {
        return (num % 5 === 0)
    });
console.log(multipleOfFive);

const strings_toFind = ["hell", "hello", "today", "is", "wednesday", "hello"];
const foundString = strings_toFind.find(
    function (str) {
        return (str.startsWith("h"))
        // return(str.endsWith("ay"))

    });
console.log(foundString)

let testArray = [2, 89, 78, 89, 3, 45]
console.log(testArray.sort())
console.log(testArray) // IS NOW CHANGED

let stringSortArray = ["ABS", "giraffe", "Giraffe", "apple", "orange", "tortoise", "peanut", "penguin", "hare"]
console.log(stringSortArray.sort())
console.log(stringSortArray);

//sorting objects
console.log(arrayOfShapes_Two);
console.log(arrayOfShapes_Two.sort())

const fruits = ["apples", "grapes", "pears"];
const colors = ["blues", "reds", "oranges", "purples", "yellows"]
const food = [...fruits, ...colors];
console.log(food)