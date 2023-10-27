// Import required modules
const { Worker, QueueScheduler } = require('bull');
const Queue = require('bull');


// Define a function similar to count_words_at_url
function countWordsAtUrl(url) {
    // Simulate an HTTP request (in real-world, you'd use a library like 'axios' or 'node-fetch')
    const responseText = "This is the response text from the URL.";
    return responseText.split(' ').length;
}

// Set up a Bull queue
const queue = new Queue('default', 'redis://127.0.0.1:6379');

// Define a job
queue.process(async (job) => {
    const { url } = job.data;
    const wordCount = countWordsAtUrl(url);
    return wordCount;
});

// Start a queue scheduler (optional but can be useful for scheduling jobs)
const queueScheduler = new Queue('default', {
    // Redis connection options if needed
    redis: {
        port: 6379,
        host: '127.0.0.1'
    }
});

// Enqueue a job
const jobData = { url: 'http://nvie.com' };
queue.add(jobData);

// Worker to process jobs
const worker = new Queue('default', async (job) => {
    console.log(`Got job for URL: ${job.data.url}`);
    const result = await countWordsAtUrl(job.data.url);
    return result;
});

worker.on('completed', (job, result) => {
    console.log(`Job ${job.id} completed. Result: ${result}`);
});

worker.on('failed', (job, err) => {
    console.error(`Job ${job.id} failed:`, err);
});

// Run the worker
worker.start();
