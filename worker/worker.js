// import { Worker } from "bullmq";
const { Worker } = require("bullmq");
const { Client } = require("pg");
const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });

const client = new Client({
  host: process.env.DB_HOST || "localhost",
  port: +process.env.DB_PORT || 5432,
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "",
});

async function connectDB() {
  try {
    await client.connect();
    console.log("Connected to PostgreSQL!");
  } catch (err) {
    console.error("Error:", err.stack);
  }
}

connectDB();

const connectionOptions = {
  host: process.env.REDIS_HOST || "redis",
  port: +process.env.REDIS_PORT || 6379,
  // password: '',
};

const worker = new Worker(
  "requestQueue",
  async (job) => {
    const text = "SELECT * FROM tenants WHERE unique_name = $1";
    const values = [job.data.tenantId];
    const res = await client.query(text, values);
    const tenent = res.rows[0];
    if (!tenent) return;

    const text1 = "SELECT * FROM campaigns WHERE slug = $1";
    const values1 = [job.data.campain];
    const res1 = await client.query(text1, values1);
    const campaign = res1.rows[0];
    if (!campaign) return;

    const text2 = `UPDATE events SET count = count + 1, updated_at = NOW() 
      WHERE tenant_id = $1 AND campaign_id = $2 AND ip_address = $3 AND user_agent = $4 AND event_type = $5
      AND created_at >= NOW() - INTERVAL '10 seconds';
    `;
    const values2 = [
      tenent.id,
      campaign.id,
      job.data.ip_address,
      job.data.user_agent,
      job.data.event_type,
    ];
    const res2 = await client.query(text2, values2);

    if (res2.rowCount === 0) {
      const text3 = `INSERT INTO events(tenant_id, campaign_id, ip_address, user_agent, event_type, count)
        VALUES($1, $2, $3, $4, $5, $6) RETURNING *;
      `;
      const values3 = [
        tenent.id,
        campaign.id,
        job.data.ip_address,
        job.data.user_agent,
        job.data.event_type,
        1,
      ];
      const res3 = await client.query(text3, values3);
      console.log("Inserted row:", res3.rows[0]);
    } else console.log("Updated row:");
    return true;
  },
  { connection: connectionOptions },
);

worker.on("completed", async (job) => {
  console.log(`Job ${job.id} completed!`);
});

worker.on("failed", (job, err) => {
  console.log(`Job ${job.id} failed:`, err);
});
