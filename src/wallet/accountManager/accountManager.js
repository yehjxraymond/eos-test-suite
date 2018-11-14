const { execAsync } = require("../../utils");

class AccountManager {
  constructor(wallet){
    this.wallet = wallet;
    this.accounts = [];
  }

  async createAccount({
    creator,
    name,
    ownerKey,
    activeKey
  }) {
    await this.wallet.unlock();
    const accountCreator = creator || this.accounts[0] || "eosio";
    const accountOwnerKey = ownerKey || this.wallet.publicKeys[0];
    const accountActiveKey = activeKey || accountOwnerKey;
    const hasAccount = await this.hasAccount(name);
    if(!hasAccount){
      await execAsync(`cleos create account ${accountCreator} ${name} ${accountOwnerKey} ${accountActiveKey}`);
      this.accounts.push(name);
    }
  }

  async hasAccount(name, ownerKey = this.wallet.publicKeys[0]) {
    try{
      const res = await execAsync(`cleos get accounts ${ownerKey} | grep \"${name}\"`);
      if(res.length != 0){
        if(!this.accounts.includes(name)){
          this.accounts.push(name);
        }
        return true;
      }
    }catch(e){
    }
    return false;
  }
}

module.exports = AccountManager;