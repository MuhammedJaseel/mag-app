import { Worker } from 'bullmq';

const connectionOptions = {
  host: '127.0.0.1',
  port: 6379,
  // password: '', 
};

const worker = new Worker(
  'requestQueue',
  async (job) => {
    console.log('Processing job:', job.id, job.data);

    if (job.data.action === 'sendEmail') {
      console.log(`Sending email to ${job.data.payload.to}`);
    }

    return true;
  },
  { connection: connectionOptions }, // <-- pass options, not Redis instance
);

worker.on('completed', async (job) => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  console.log(`Job ${job.id} completed!`);
});

worker.on('failed', (job, err) => {
  console.log(`Job ${job.id} failed:`, err);
});
