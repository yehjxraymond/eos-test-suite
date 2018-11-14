const { execAsync } = require("../../utils");

class ContractManager {
  constructor(wallet) {
    this.wallet = wallet;
  }

  async deployContract({
    account,
    contractDir,
  }) {
    await this.wallet.unlock();
    await execAsync(`cleos set contract ${account} ${contractDir}`);
  }
}

module.exports = ContractManager;