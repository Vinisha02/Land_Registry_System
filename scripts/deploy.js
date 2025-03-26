const hre = require("hardhat");

async function main() {
  const Land = await hre.ethers.getContractFactory("Land");
  const land = await Land.deploy(); 

  await land.deployed();
  console.log(`Tracking contract deployed to: ${land.address}`);



  // const Mig = await hre.ethers.getContractFactory("Migrations");
  // const mig = await Mig.deploy(); 

  // const address  ="0xdD2FD4581271e230360230F9337D5c0430Bf44C0"
  // const Land = await hre.ethers.getContractFactory("Land");
  // const land = await Tracking.deploy(address); 


}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error deploying contract:", error);
    process.exit(1);
  });
