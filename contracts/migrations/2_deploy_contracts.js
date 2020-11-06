var Infraction = artifacts.require("./Infraction.sol");

module.exports = function(deployer) {
  deployer.deploy(Infraction);
};
