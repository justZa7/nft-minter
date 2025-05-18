
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyNFT", function () {
  let myNFT, owner, addr1;

  beforeEach(async () => {
    [owner, addr1] = await ethers.getSigners();
    const MyNFT = await ethers.getContractFactory("MyNFT");
    myNFT = await MyNFT.deploy(owner.address);
    await myNFT.waitForDeployment();
  });

  it("Should mint NFT and assign correct URI", async function () {
    const uri = "ipfs://sample-uri";
    const tx = await myNFT.mint(addr1.address, uri);
    await tx.wait();

    const tokenId = 0;
    expect(await myNFT.tokenURI(tokenId)).to.equal(uri);
    expect(await myNFT.ownerOf(tokenId)).to.equal(addr1.address);
  });

  it("Should only allow owner to mint", async function () {
    await expect(
      myNFT.connect(addr1).mint(addr1.address, "uri")
    ).to.be.revertedWithCustomError(myNFT, "OwnableUnauthorizedAccount").withArgs(addr1.address);
  });
});
