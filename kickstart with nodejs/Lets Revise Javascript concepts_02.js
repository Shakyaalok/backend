/*
let name = 'Alok Shakya';
let age = 24;
let address = 'GZB, Uttar Pradesh'


var display = (name, age, address) => {
    return (
        `My name is ${name} and my age is ${age}, i live in ${address}`
    )
}

console.log(display(name, age, address))

*/

/*
var product = (a, b) => {
    return a * b;
}

console.log(product(2, 3))
*/


/*
let product = (a, b) => a * b;
console.log(product(2, 3));


let AddOne = (a) => a + 1;
console.log(AddOne(4))
*/

const student = {
    name: 'Alok Shakya',
    age: 24,

    display() {
        console.log(`my name is ${this.name} and my age is ${this.age}`)
    }
}

student.display();