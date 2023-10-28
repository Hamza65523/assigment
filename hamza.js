const express = require('express');
const app = express();
const port = 3000;
const Redis = require('ioredis');
const redis = new Redis({
  host: '127.0.0.1',
  port: 6379,
});

app.use(express.json());

app.post('/enqueue-job', async (req, res) => {
    const jobData = req.body;
    const jobId = await enqueueJob(jobData);
    res.json({ jobId });
  });

// Define the name of the job queue
const jobQueueName = 'jobQueue';

// Function to enqueue a job
async function enqueueJob(jobData) {
  const jobId = await redis.lpush(jobQueueName, JSON.stringify(jobData));
  return jobId;
}

// Function to dequeue a job
async function dequeueJob() {
  const jobData = await redis.rpop(jobQueueName);
  if (jobData) {
    return JSON.parse(jobData);
  }
  return null;
}

async function processJobs() {
while (true) {
const job = await dequeueJob();
if (job) {
// Process the job here
console.log('Processing job:', job);
} else {
// No jobs in the queue, so wait for a while before checking again
await new Promise(resolve => setTimeout(resolve, 1000));
}
}
}
  
  processJobs(); // Start the worker
  
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
