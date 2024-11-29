import type { Database, FindAccountFilter } from "../../interfaces/database.interface";
import type { PosixAccount, PosixGroup } from "../../schemas/posix";

const accounts: Map<string, PosixAccount> = new Map<string, PosixAccount>();
//const groups: Map<string, PosixGroup> = new Map<string, PosixGroup>();
let groups: PosixGroup[] = [];

async function addAccount(dn: string, account: PosixAccount): Promise<void> {
  accounts.set(dn, account);
  printAllAccounts();

  await Promise.resolve();
}

async function getAccount(dn: string): Promise<PosixAccount | undefined> {
  const account = accounts.get(dn);

  return Promise.resolve(account);
}

async function getAllAccounts(): Promise<PosixAccount[]> {
  const accountsArray = Array.from(accounts.values());

  return Promise.resolve(accountsArray);
}

async function findAccount(filter: FindAccountFilter): Promise<PosixAccount[]> {
  const accountsArray = Array.from(accounts.values());
  const filteredAccounts = accountsArray.filter((account) => {
    if (filter.uid && account.uid === filter.uid) {
      return false;
    }

    if (filter.cn && account.cn !== filter.cn) {
      return false;
    }

    if (filter.uidNumber && account.uidNumber !== filter.uidNumber) {
      return false;
    }

    return true;
  });

  return Promise.resolve(filteredAccounts);
}

async function deleteAccount(dn: string): Promise<void> {
  accounts.delete(dn);
  await Promise.resolve();
}

async function addGroup(group: PosixGroup): Promise<void> {
  groups.push(group);
  await Promise.resolve();
}

async function getGroup(cn: string): Promise<PosixGroup | undefined> {
  const group = groups.find((group) => group.cn === cn);

  return Promise.resolve(group);
}

async function deleteGroup(cn: string): Promise<void> {
  groups = groups.filter((group) => group.cn !== cn);
  await Promise.resolve();
}

// Apufunktio kaikkien tilien tulostamiseen
function printAllAccounts(): void {
  accounts.forEach((account, dn) => {
    console.log(`DN: ${dn}, Account:`, account);
  });
}

export const memoryDatabase: Database = {
  addAccount,
  getAccount,
  getAllAccounts,
  findAccount,
  deleteAccount,
  addGroup,
  getGroup,
  deleteGroup,
};
