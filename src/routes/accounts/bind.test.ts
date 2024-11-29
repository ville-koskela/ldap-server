import assert from "assert";
import { describe, it } from "node:test";

import type { Database } from "../../interfaces/database.interface";
import type { Logger } from "../../interfaces/logger.interface";

import { getBindFunctions } from "./bind";

export const name = "ldap bind";

const mockLogger: Logger = {
  debug: () => {},
  info: () => {},
  error: () => {},
};

const { bind, bindRoot } = getBindFunctions({ db: mockDb, logger: mockLogger });

void describe("bindRoot", () => {
  void it("should authenticate root with correct credentials", () => {});

  void it("should fail to authenticate root with incorrect credentials", () => {});
});

void describe("bind", () => {
  void it("should authenticate user with correct credentials", async () => {});

  void it("should fail to authenticate user with incorrect credentials", async () => {});

  void it("should fail to authenticate non-existent user", async () => {});
});
