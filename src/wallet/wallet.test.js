const {create, bootstrap} = require('./wallet');

const EOSIO_PRIVATE_KEY = "5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3";
const EOSIO_PUBLIC_KEY = "EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV";

describe("create", ()=>{
  it('returns wallet name and password', async () => {
    const wallet = await create();
    expect(wallet.name).toBeDefined;
    expect(wallet.password).toBeDefined;
  });
});

describe("boostrap", () => {
  it('returns wallet with 10 accounts', async () => {
    const wallet = await bootstrap(EOSIO_PRIVATE_KEY);
    expect(wallet.name).toBeDefined;
    expect(wallet.password).toBeDefined;
    expect(wallet.privateKeys).toEqual([EOSIO_PRIVATE_KEY]);
    expect(wallet.accountMgr.accounts).toHaveLength(10);
  });
})

describe("Wallet", () => {
  let wallet;

  beforeAll(async () => {
    wallet = await create();
  });

  describe("lock", ()=>{
    it('locks the wallet when unlocked', async () => {
      await wallet.lock();
      const locked = await wallet.isLocked();
      expect(locked).toBe.true;
    });

    it('does not throw then wallet is locked', async () => {
      await wallet.lock();
      await wallet.lock();
      const locked = await wallet.isLocked();
      expect(locked).toBe.true;
    });
  });

  describe("unlock", ()=>{
    it('unlock the wallet when locked', async () => {
      await wallet.lock();
      await wallet.unlock();
      const locked = await wallet.isLocked();
      expect(locked).toBe.false;
    });

    it('does not throw then wallet is already unlocked', async () => {
      await wallet.unlock();
      await wallet.unlock();
      const locked = await wallet.isLocked();
      expect(locked).toBe.false;
    });
  });

  describe("hasPublicKey", () => {
    it('returns true if key exist', async () => {
      const privateKey = "5J6ayCRNcJ8WdPY9xAtCfCq9MXo4oVCByH5tAxBKiSa5iKZetX9";
      const publicKey = "EOS61SGadVjWvr886ATvYkkvBmwyw5Xis8gyKgnVnvZUjiRz5sD29";
      await wallet.lockAll();
      await wallet.import(privateKey);
      const hasKey = await wallet.hasPublicKey(publicKey);
      expect(hasKey).toBe.true;
    });

    it('returns false if key does not exist', async () => {
      const publicKey = "EOS79MccUaLJg4gciPXJxC6p3m1iJHV1SH4zw5J5Um3dE4MvVYsVU";
      const hasKey = await wallet.hasPublicKey(publicKey);
      expect(hasKey).toBe.false;
    });
  })

  describe("import" ,() => {
    it('imports private key into the wallet', async () => {
      await wallet.lockAll();
      await wallet.import(EOSIO_PRIVATE_KEY);
      const hasKey = await wallet.hasPublicKey(EOSIO_PUBLIC_KEY);
      expect(hasKey).toBe.true;
      expect(wallet.publicKeys).toContain(EOSIO_PUBLIC_KEY);
      expect(wallet.privateKeys).toContain(EOSIO_PRIVATE_KEY);
    });
  });
});
