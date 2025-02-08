function delaySync(ms) {
    const start = Date.now();
    while (Date.now() - start < ms) {
        // Blocking loop - does nothing but waits
    }
}

console.log("Step 1: Go to shower!");

delaySync(15000); // Blocks execution for 3 seconds

console.log("Step 2: Dress up! (after 3 seconds)");

console.log("Step 3: Come to school!");


console.log("Putting water to boil!");
console.log("The water is boiling!");
setTimeout(()=>{
    console.log("The water is ready!");
}, 5000)
console.log("Doing other things...");