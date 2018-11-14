const fs = require("fs");
const crypto = require("crypto");
const { exec } = require("child_process");

const execAsync = cmd => new Promise((resolve, reject) => {
  exec(cmd, (err, stdout) => {
    if (err) { return reject(err) }
    resolve(stdout);
  });
});

class Wallet {
  constructor({name, password}){
    this.name = name;
    this.password = password;
  }

  async unlock(){
    const res = await execAsync(`cleos wallet list | grep ${this.name}`);
    if(!res.includes('*')){
      await execAsync(`cleos wallet unlock -n ${this.name} --password ${this.password}`);
    }
  }

  async lock(){
    await execAsync(`cleos wallet lock -n ${this.name}`);
  }

  async lockAll(){
    await execAsync(`cleos wallet lock_all`);
  }

  async isLocked(){
    const res = await execAsync(`cleos wallet list | grep ${this.name}`);
    return !res.includes('*');
  }

  async hasPublicKey(publicKey){
    await this.unlock();
    try{
      const res = await execAsync(`cleos wallet keys | grep ${publicKey}`);
      return res.includes(publicKey);
    }catch(e){
      return false;
    }
  }

  async importPrivateKey(privateKey) {
    await this.unlock();
    await execAsync(`cleos wallet import -n ${this.name} --private-key ${privateKey}`);
  }
}

// Factory to create a new wallet
const create = async () => {
  const suffix = crypto.randomBytes(10).toString('hex');
  const name = `wallet-${suffix}`;
  await execAsync(`cleos wallet create -n ${name} --file /tmp/${name}`);
  const password = fs.readFileSync(`/tmp/${name}`).toString();
  return new Wallet({
    name,
    password
  });
}

module.exports = {
  create
}
