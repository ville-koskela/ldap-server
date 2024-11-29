import type { PosixAccount, PosixGroup } from "../schemas/posix";

export interface FindAccountFilter {
  uid?: string;
  cn?: string;
  uidNumber?: number;
}

export interface Database {
  addAccount(dn: string, account: PosixAccount): Promise<void>;
  getAccount(uid: string): Promise<PosixAccount | undefined>;
  getAllAccounts(): Promise<PosixAccount[]>;
  findAccount(filter: FindAccountFilter): Promise<PosixAccount[]>;
  deleteAccount(uid: string): Promise<void>;

  addGroup(group: PosixGroup): Promise<void>;
  getGroup(cn: string): Promise<PosixGroup | undefined>;
  deleteGroup(cn: string): Promise<void>;
}
