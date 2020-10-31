// arr = [{ id: 1, value: 500 }, { id: 2, value: 600 }]

// arr.map((value, index, array) => {
//     if (value.id === 1) return Object.assign
// })
obj = { id: 1, value: 500 }
value = Object.assign({}, { ...obj, id: 5 } )
console.log(value)


console.log("Hello World");
a = null
if (a)
console.log("IN")