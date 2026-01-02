import { env } from "@/env";
import * as schema from "./schema";
// import { drizzle } from "drizzle-orm/neon-serverless";
// const db = drizzle(env.dbUrl!, { schema });

import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
const pool = new Pool({
  connectionString: env.dbUrl!,
});

const db = drizzle({ client: pool, schema });

export default db;
