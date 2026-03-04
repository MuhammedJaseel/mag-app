// queue.service.ts
import { Injectable } from '@nestjs/common';
import { Queue, ConnectionOptions } from 'bullmq';

@Injectable()
export class QueueService {
  private myQueue: Queue;

  constructor() {
    const connectionOptions: ConnectionOptions = {
      host: '127.0.0.1',
      port: 6379,
      // password: '1234',
    };

    this.myQueue = new Queue('requestQueue', { connection: connectionOptions });
  }

  async addRequest(data: any) {
    await this.myQueue.add('processRequest', data);
    console.log('Job added to queue:', data);
  }
}
