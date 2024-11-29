import { name as ldapBind } from "./routes/accounts/bind.test";
import { name as posixAccounts } from "./schemas/posix.test";
import { name as snakeToCamel } from "./utils/snake-to-camel.test";

const tests: Array<string> = [snakeToCamel, posixAccounts, ldapBind];

process.stdout.write("Loading tests: ");
tests.forEach((test, index) => {
  index > 0 ? process.stdout.write(`, ${test}`) : process.stdout.write(test);
});
process.stdout.write(`\n\nLoaded ${tests.length} test suites.\n\n`);
