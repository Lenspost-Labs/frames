// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract FramesLenspost is ERC721URIStorage {
    uint256 private currentTokenId = 0;

    constructor() ERC721("Frames Lenspost", "FLP") {}

    function mint(address to, string memory tokenURI) public {
        currentTokenId++;
        _mint(to, currentTokenId);
        _setTokenURI(currentTokenId, tokenURI);
    }
}
