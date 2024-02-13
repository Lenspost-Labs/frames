const minters = [
  {
    minterAddress: "0x1",
    txHash: "0xHash1",
  },
  {
    minterAddress: "0x2",
    txHash: "0xHash2",
  },
  {
    minterAddress: "0x3",
    txHash: "0xHash3",
  },
  {
    minterAddress: "0x4",
    txHash: "0xHash4",
  },
  {
    minterAddress: "0x5",
    txHash: "0xHash5",
  },
  {
    minterAddress: "0x6",
    txHash: "0xHash6",
  },
];

const allowedMint = 6;

// check if the minter is in the list
const minter = minters.find((minter) => minter.minterAddress === "0x1");
if (minter) {
  console.log("Already a minter");
} else {
  console.log("Not a minter");
}

console.log(minters.length, allowedMint);

if (minters.length === allowedMint) {
  return console.log("Minting limit reached");
}

console.log("Minted!");
