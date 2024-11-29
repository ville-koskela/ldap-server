import { envSchema, type Env } from "../../schemas/env";
import { snakeObjToCamel } from "../../utils";

// Convert environment variables from snake_case to camelCase
const camelCasedEnv = snakeObjToCamel(process.env);

// Validate the environment variables against the schema
const parsedEnv = envSchema.parse(camelCasedEnv);

// Freeze the object to make it immutable
export const env: Env = Object.freeze(parsedEnv);
