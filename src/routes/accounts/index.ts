import ldap from "ldapjs";

import { lowerCasePosixAccountSchema, posixAccountSchema } from "../../schemas/posix";
import { posixAccountToSearchResult } from "../../utils/toSearchResult";

import { getBindFunctions } from "./bind";
import type { AddAccountRoutesParams, AddRequest, LdapResponse, NextFunction } from "./interfaces";

function authorize(req: any, res, next: (err?: unknown) => void): void {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  if (!req.connection.ldap.bindDN.equals("cn=root")) {
    //if (!req.connection.ldap.bindDN.equals("cn=admin,dc=example,dc=com") && !isSearch) {
    return next(new ldap.InsufficientAccessRightsError());
  }

  return next();
}

export function addAccountRoutes({ server, db, logger, env }: AddAccountRoutesParams): void {
  const { bindRoot, bind } = getBindFunctions({ server, db, logger, env });

  async function addAccount(req: AddRequest, res: LdapResponse, next: NextFunction): Promise<void> {
    // req.dn is typed as string, but in reality it's an object and needs to be stringified first
    const dn = req.dn.toString();

    req.attributes.forEach((attr: ldap.Attribute) => {
      logger.debug(
        `Attribute: ${attr.type} -> ${typeof attr.values === "string" ? attr.values : attr.values.join(", ")}`
      );
    });

    // Convert attributes array to object
    // For some reason attributes are in lower case,
    // so we need to convert them to camelCase
    const attributesObj = lowerCasePosixAccountSchema.parse(
      req.attributes.reduce((acc: Record<string, string>, attr: ldap.Attribute) => {
        acc[attr.type] = (attr.values as string[]).join(", ");

        return acc;
      }, {})
    );

    try {
      const posixAccount = posixAccountSchema.parse(attributesObj);

      await db.addAccount(dn, posixAccount);
      res.end();
    } catch (err) {
      logger.debug(`Error adding user: ${(err as Error).message}`);

      return next(new Error(`OperationsError: ${(err as Error).message}`));
    }

    return next();
  }

  async function search(
    req: ldap.SearchRequest,
    res: LdapResponse,
    next: NextFunction
  ): Promise<void> {
    const { baseObject, scope } = req;

    logger.debug(`Search request: baseObject=${baseObject}, scope=${scope}, filter=${req.filter}`);

    try {
      //const foo = await db.findAccount({ uidNumber: 0 });

      //foo.forEach((f) => res.send(posixAccountToSearchResult(f)));

      //const bar = await db.findAccount({ uidNumber: 1001 });

      //bar.forEach((b) => res.send(posixAccountToSearchResult(b)));

      const accounts = await db.getAllAccounts();

      accounts.forEach((account) => {
        const entry = posixAccountToSearchResult(account);

        if (req.filter.matches(entry.attributes)) {
          logger.debug(`Sending entry: ${JSON.stringify(entry)}`);

          res.send(entry);
        }
      });
      res.end();
    } catch (err) {
      logger.debug(`Error searching: ${(err as Error).message}`);

      return next(new Error(`OperationsError: ${(err as Error).message}`));
    }

    return next();
  }

  function compare(req: unknown, res: LdapResponse, next: NextFunction): void {
    logger.error("Not yet impelmented");

    next();
  }

  server.bind(env.ldapBaseDn, bind);
  // this could be just: cn=root
  //server.bind(`cn=${env.ldapAdminCn},${env.ldapBaseDn}`, bindRoot);
  server.bind("cn=root", bindRoot);
  server.add(env.ldapBaseDn, authorize, addAccount);
  // everyone can search
  server.search(env.ldapBaseDn, search);
  server.compare(env.ldapBaseDn, authorize, compare);
}
