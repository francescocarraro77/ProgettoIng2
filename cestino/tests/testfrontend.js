/*
function first() {
  console.log(1)
}

function second() {
  console.log(2)
}

function third() {
  console.log(3)
}


function first() { setTimeout(() => {console.log(1)}, 1)
}

function second() { setTimeout(() => {console.log(2)}, 1)
}

function third() { setTimeout(() => {console.log(3)}, 1)
}



first();
second();
third();



// A function
function fn() {
  console.log('Just a function')
}

// A function that takes another function as an argument
function higherOrderFunction(callback) {
  // When you call a function that is passed as an argument, it is referred to as a callback
  callback()
}

// Passing a function
higherOrderFunction(fn);
*/

// Define three functions
function first() {
  console.log(1)
}

function second(callback) {
  setTimeout(() => {
    console.log(2)

    // Execute the callback function
    callback()
  }, 1000)
}

function third() {
  console.log(3)
}

first();
second(third);