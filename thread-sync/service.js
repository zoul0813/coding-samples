const { workerData, parentPort } = require('worker_threads');
let start = workerData.start;
let end = workerData.end;
let even = (start % 2 === 0);

// if the start value is even, and we are processing odd numbers, add 1
if(!even && workerData.type === 'even') start++;

let results = [];
// we loop every-other value
for(var i = start; i <= end; i += 2) {
    results.push(i);
}

parentPort.postMessage(results);