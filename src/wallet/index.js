const fs = require("fs");
const crypto = require("crypto");
const { exec } = require("child_process");

const execAsync = cmd => new Promise((resolve, reject) => {
  exec(cmd, (err, stdout, stderr) => {
    if (err) { return reject(err) }
    resolve(stdout, stderr);
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

  async isLocked(){
    const res = await execAsync(`cleos wallet list | grep ${this.name}`);
    return !res.includes('*');
  }

  async importKey(key) {
    await unlock();
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
