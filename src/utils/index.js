const { exec } = require("child_process");
const RandExp = require("randexp");

const execAsync = cmd => new Promise((resolve, reject) => {
  exec(cmd, (err, stdout, stderr) => {
    if (err) { return reject(err) }
    resolve(stdout);
  });
});

const randomIdentifier = () => new RandExp(/^[a-z1-5]{12}$/).gen();

module.exports = {
  execAsync,
  randomIdentifier
}