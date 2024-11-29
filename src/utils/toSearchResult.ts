import type { SearchEntry } from "ldapjs";

import type { PosixAccount } from "../schemas/posix";

export function posixAccountToSearchResult(account: PosixAccount): SearchEntry {
  return {
    type: "SearchResultEntry",
    attributes: account,
    dn: `uid=${account.uid},dc=example,dc=com`,
  } as unknown as SearchEntry;
}
