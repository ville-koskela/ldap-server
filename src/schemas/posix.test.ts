import assert from "node:assert";
import { describe, it } from "node:test";

import { lowerCasePosixAccountSchema, type PosixAccount } from "./posix";

export const name = "Posix schemas";

void describe("Account", undefined, () => {
  /**
   * @note this is to make sure our two schemas stay in sync
   */
  void it("should parse valid PosixAccount from lowercase attributes", () => {
    const lowerCaseAccount = {
      objectclass: "posixAccount, inetOrgPerson, top",
      givenname: "John",
      sn: "Doe",
      cn: "John Doe",
      uid: "johndoe",
      uidnumber: "1001",
      gidnumber: "1001",
      homedirectory: "/home/johndoe",
      loginshell: "/bin/bash",
      gecos: "John Doe",
      userpassword: "password",
    };

    const expectedResult: PosixAccount = {
      objectClass: ["posixAccount", "inetOrgPerson", "top"],
      cn: "John Doe",
      uid: "johndoe",
      uidNumber: 1001,
      gidNumber: 1001,
      homeDirectory: "/home/johndoe",
      loginShell: "/bin/bash",
      gecos: "John Doe",
      userPassword: "password",
    };

    const result = lowerCasePosixAccountSchema.safeParse(lowerCaseAccount);

    assert.ok(result.success);
    assert.deepStrictEqual(result.data, expectedResult);
  });
});
