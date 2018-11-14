const { join } = require("path");
const { randomIdentifier } = require("../../utils");
const { create } = require("../wallet");

const EOSIO_PRIVATE_KEY = "5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3";

describe("ContractManager", () => {
  let wallet;
  let account;
  let contractMgr;

  beforeAll(async () => {
    wallet = await create();
    contractMgr = wallet.contractMgr;
    await wallet.import(EOSIO_PRIVATE_KEY);
    account = await wallet.accountMgr.createAccount();
  });

  describe("deployContract", () => {
    it("deploys code from directory", async () => {
      const contractDir = join(__dirname, "../../test/fixtures/contract/hello");
      await contractMgr.deployContract({
        account,
        contractDir
      });
    });
  });
});
