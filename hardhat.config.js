require("@nomiclabs/hardhat-waffle");

const proxy_url = 'https://proxy.devnet.neonlabs.org/solana';
const network_id = 245022926;
const deployerPrivateKey = 'fb35e6df7be3edbe21a9b72e261f81e789aaa81d3d0b749946d68c766d2524c6';

module.exports = {
  solidity: "0.8.4",
  defaultNetwork: 'neonlabs',
  networks: {
    neonlabs: {
      url: proxy_url,
      accounts: [deployerPrivateKey],
      network_id: network_id,
      chainId: network_id,
      gas: 3000000,
      gasPrice: 1000000000,
      blockGasLimit: 10000000,
      allowUnlimitedContractSize: false,
      timeout: 1000000,
      isFork: true
    }
  }
};
