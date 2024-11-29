import type ldap from "ldapjs";
import type { InvalidCredentialsError, SearchEntry } from "ldapjs";
import * as z from "zod";

import type { Database } from "../../interfaces/database.interface";
import type { Logger } from "../../interfaces/logger.interface";
import type { Env } from "../../schemas/env";

export interface AddAccountRoutesParams {
  server: ldap.Server;
  db: Database;
  logger: Logger;
  env: Env;
}

export const bindRequestSchema = z.object({
  dn: z.string(),
  credentials: z.string(),
});

export const addRequestSchema = z.object({
  dn: z.string(),
  attributes: z.array(z.any()),
});

export type BindRequest = z.infer<typeof bindRequestSchema>;
export type AddRequest = z.infer<typeof addRequestSchema>;

export interface LdapResponse {
  end(res?: unknown): void;
  send(obj: SearchEntry): void;
}

export type NextFunction = <T extends Error>(err?: T | null) => void;

export interface BindFunctions {
  bindRoot: (
    req: BindRequest,
    res: LdapResponse,
    next: (err?: InvalidCredentialsError) => void
  ) => void;
  bind: (req: BindRequest, res: LdapResponse, next: NextFunction) => Promise<void>;
}
