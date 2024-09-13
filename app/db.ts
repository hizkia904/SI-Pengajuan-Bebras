import pg from "pg";
import type { PoolClient, PoolConfig } from "pg";

const configPool = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
} satisfies PoolConfig;

export const pool = new pg.Pool(configPool);

export async function getClient(): Promise<PoolClient> {
  const client = await pool.connect();
  return client;
}

export async function runQuery(
  query: string,
  arrQuery: (
    | string
    | number
    | boolean
    | null
    | FormDataEntryValue
    | Uint8Array
    | Blob
  )[]
): Promise<pg.QueryResult<any>> {
  let client;
  try {
    client = await getClient();
    const result = await client.query(query, arrQuery);
    client.release();
    return result;
  } catch (er) {
    client?.release();
    throw er;
  }
}
