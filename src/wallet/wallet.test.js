const {create} = require('./index');


describe("create", ()=>{
  it('returns wallet name and password', async () => {
    const wallet = await create();
    expect(wallet.name).toBeDefined;
    expect(wallet.password).toBeDefined;
  });
});

describe("Wallet", () => {
  let wallet;

  beforeAll(async () => {
    wallet = await create();
    console.log(wallet);
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
});
