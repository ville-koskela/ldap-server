import ldap from "ldapjs";

import { logger, database } from "./adapters";
import { env } from "./adapters/env";
import { addAccountRoutes } from "./routes/accounts";
import type { PosixAccount } from "./schemas/posix";

const adminAccount: PosixAccount = {
  cn: env.ldapAdminCn,
  uid: "admin",
  uidNumber: 0,
  gidNumber: 0,
  homeDirectory: "/root",
  loginShell: "/bin/bash",
  userPassword: "admin",
  objectClass: ["inetOrgPerson", "posixAccount", "top"],
};

database.addAccount(`cn=${env.ldapAdminCn},${env.ldapBaseDn}`, adminAccount).catch(() => {
  logger.error("Failed to add admin account");
});

const server = ldap.createServer();

addAccountRoutes({ server, db: database, logger, env });
//server.bind("ou=users,dc=example,dc=com", async (req, res, next) => {
//console.log("REQ: ", req);
//});

server.listen(env.ldapPort, () => {
  logger.info(`LDAP server up at: ${server.url}`);
});
