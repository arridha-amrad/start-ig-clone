import { env } from "@/env";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: env.dbUrl!,
});

const db = drizzle({
  schema,
  client: pool,
});

export default db;
