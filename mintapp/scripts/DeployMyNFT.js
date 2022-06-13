
async function main() {
  
  const MYNFT = await hre.ethers.getContractFactory("MyNFT");
  const mynft = await MYNFT.deploy();

  await mynft.deployed();

  console.log("MYNFT deployed to:", mynft.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
