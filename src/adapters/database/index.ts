import type { Database } from "../../interfaces/database.interface";
import { env } from "../env";

import { memoryDatabase } from "./memory";

function createDatabase(): Database {
  switch (env.databaseType) {
    case "memory":
      return memoryDatabase;
    // Lisää muita tietokantatyyppejä tarvittaessa
    default:
      env.databaseType satisfies never;
  }

  throw new Error("Unknown database type");
}

export const database = createDatabase();
