const hre = require("hardhat");
const compileHasher = require("./compileHasher");
const path = require('path')

async function main() {
  const hasherPath = path.join(__dirname, '..', 'artifacts', 'contracts', 'Hasher.sol', 'Hasher.json');
  const hasherJSON = require(hasherPath);
  const Hasher = await hre.ethers.getContractFactory(hasherJSON.abi, hasherJSON.bytecode);
  const hasher = await Hasher.deploy();
  await hasher.deployed();
  console.log("Hasher deployed to:", hasher.address);

  const Verifier = await hre.ethers.getContractFactory("Verifier");
  const verifier = await Verifier.deploy();
  await verifier.deployed();
  console.log("Verifier deployed to:", verifier.address);

  const denomination = 10 * 10 ** 6; // [10, 100, 1000]
  const USDC_address = "0x2578C6c1ac883443388edd688ca10E87d088BfA8";  // USDC on Neon Devnet (obtained from https://github.com/neonlabsorg/token-list/blob/main/tokenlist.json)
  const ERC20Mareel = await hre.ethers.getContractFactory("ERC20Mareel");
  const mareel = await ERC20Mareel.deploy(verifier.address, hasher.address, denomination, 20, USDC_address);
  console.log("Mareel deployed to:", mareel.address, "Denomination:", denomination);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
