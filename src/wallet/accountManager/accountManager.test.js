const {randomIdentifier} = require("../../utils");
const {create} = require('../wallet');

const EOSIO_PRIVATE_KEY = "5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3";

describe("AccountManager", () => {
  let wallet;
  let accountMgr;

  beforeAll(async () => {
    wallet = await create();
    accountMgr = wallet.accountMgr;
    await wallet.import(EOSIO_PRIVATE_KEY);
  });

  describe("createAccount", () => {
    it("creates a new account", async () => {
      const name = randomIdentifier();
      await accountMgr.createAccount({name});

      const created = await accountMgr.hasAccount(name);
      expect(created).toBe.true;
      expect(accountMgr.accounts).toContain(name);
    });

    it("does not throw if account is added again", async () => {
      const name = randomIdentifier();
      await accountMgr.createAccount({name});
      await accountMgr.createAccount({name});

      const created = await accountMgr.hasAccount(name);
      expect(created).toBe.true;
      expect(accountMgr.accounts).toContain(name);
    });
  });
});
