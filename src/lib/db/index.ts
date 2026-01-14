import { env } from "@/env";
import * as schema from "./schema";

import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";

const db = drizzle({
  connection: env.dbUrl!,
  ws: ws,
  schema,
});

export default db;
