const { workerData, parentPort } = require('worker_threads');
console.log('WorkerData', workerData);
let start = workerData.start;
let end = workerData.end;
let even = (start % 2 === 0);

console.log('Start', start, 'End', end, 'Even', even, start % 2);
// if the start value is even, and we are processing odd numbers, add 1
if(!even && workerData.type === 'even') start++;
console.log('Start', start, 'End', end, 'Even', even, start % 2);

let results = [];
// we loop every-other value
for(var i = start; i <= end; i += 2) {
    // console.log('Thread ' + Worker.threadId + ': The number is \'' + i + '\'');
    results.push(i);
}

// console.log('postMessage', results);
parentPort.postMessage(results);