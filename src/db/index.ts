import { env } from "@/env";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
import * as schema from "./schema";

const db = drizzle({
  connection: env.dbUrl!,
  ws: ws,
  schema,
});

export default db;
