/*
const arr = ['apple', 'oranges', ' ', 'mango', ' ', 'lemon'];
const value = arr.map((fruits) => {
    const trim = fruits.trim()
    if (trim === '') {
        return 'empty string';
    }
    return trim;
})

console.log(value)
*/


// Reason:- because in js arrays and objects are refrence types and when we declared an array or objects with an const then we 
// are creating a constant reference to the memory not a constant value. and 
// hence we can manipulate the data

/*
const arr = [1, 2, 3];
// This is not allowed, and it will throw an error:
// arr = [4, 5, 6];

// This is allowed because it modifies the existing array, not the reference:
arr[3] = 5; // allowed
arr.push(4);

console.log(arr); // Output: [1, 2, 3, 4]
*/





// spread operators
let product = (a, b) => {
    return a * b;
}

let input = [3, 4]
console.log(product(...input));



// rest operators
let print = (...args) => {
    return args;
}

console.log(print(1, 2, 3, 4, 5))