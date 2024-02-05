// SPDX-License-Identifier: MIT
// Deployed to 0xC26fBA5C9C30AD5a926745B9E0966e13BBc56CFD

pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract OnChainCow is ERC721URIStorage {
    uint256 private currentTokenId = 0;

    constructor() ERC721("OnChainCow", "COW") {}

    string public tokenURI;

    function mint(address to, string memory tokenURI) public {
        currentTokenId++;
        _mint(to, currentTokenId);
        _setTokenURI(currentTokenId, tokenURI);
    }

    function setTokenURI(string memory _tokenURI) external {
        tokenURI = _tokenURI;
    }
}
