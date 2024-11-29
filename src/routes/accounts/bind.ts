import type { InvalidCredentialsError } from "ldapjs";
import ldap from "ldapjs";

import type {
  AddAccountRoutesParams,
  BindFunctions,
  BindRequest,
  LdapResponse,
  NextFunction,
} from "./interfaces";
import { bindRequestSchema } from "./interfaces";

export function getBindFunctions({ db, logger }: AddAccountRoutesParams): BindFunctions {
  return {
    bindRoot: (
      req: BindRequest,
      res: LdapResponse,
      next: (err?: InvalidCredentialsError) => void
    ): void => {
      if (req.dn.toString() !== "cn=root" || req.credentials !== "secret")
        return next(new ldap.InvalidCredentialsError());

      res.end();

      return next();
    },

    bind: async (req: BindRequest, res: LdapResponse, next: NextFunction): Promise<void> => {
      const { dn, credentials } = bindRequestSchema.parse(req);

      if (!dn) {
        logger.debug(`Invalid DN: ${dn}`);

        return next(new Error("InvalidCredentialsError"));
      }

      try {
        const account = await db.getAccount(dn);

        if (account && account.userPassword === credentials) {
          res.end();
        } else {
          logger.debug("Invalid credentials");

          return next(new Error("InvalidCredentialsError"));
        }
      } catch (err) {
        logger.debug(`Error authenticating user: ${(err as Error).message}`);

        return next(new Error(`OperationsError: ${(err as Error).message}`));
      }

      return next();
    },
  };
}
