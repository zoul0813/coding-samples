const { Worker } = require('worker_threads');

function runService(workerData) {
    return new Promise((resolve, reject) => {
        const worker = new Worker('./service.js', { workerData });
        worker.on('message', (data) => resolve({ thread: worker.threadId, results: data }));
        worker.on('error', reject);
        worker.on('exit', (code) => {
            if(code !== 0) {
                reject(new Error(`Worker stopped with exit code ${code}`));
            }
        });
    })
}

async function run() {
    Promise.all([
        // start and end can be any combination
        runService({ type: 'odd', start: 1, end: 100 }), 
        runService({ type: 'even', start: 1, end: 100 })
    ]).then((data) => {
        let odds = data[0].results;
        let evens = data[1].results;
        let total = Math.max(odds.length, evens.length);
        let results = [];
        for(var i = 0; i < total; i++) {
            // test i, to account for variable number of integers (ie; 1-23, 4-567, etc)
            if(i < odds.length) results.push('Thread ' + data[0].thread + ': The number is \'' + odds[i] + '\'');
            if(i < evens.length) results.push('Thread ' + data[1].thread + ': The number is \'' + evens[i] + '\'');
        }
        return results;
    }).catch((err) => {
        console.error(err);
    }).then((results) => {
        results.forEach((result) => {
            console.log(result);
        });
    });
}

run().catch((err) => console.error(err) );