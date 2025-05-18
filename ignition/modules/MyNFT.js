// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("MyNFTModule", (m) => {
  const deployer = m.getAccount(0);

  const nft = m.contract("MyNFT", [deployer]);

  return{ nft }
});
