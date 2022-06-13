// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/token/ERC721/ERC721.sol';

contract MyNFT is ERC721,Ownable{
    uint public mintPrice;
    uint public totalSupply;
    uint public maxSupply;
    uint public maxPerWallets;
    bool public isPublicMintEnabled;
    string internal baseTokenUri;
    address payable public withdrawWallet;
    mapping(address=>uint256) public walletMints;
      
    constructor() payable ERC721('MYNFT','MN'){
        mintPrice=0.02 ether;
        totalSupply=0;
        maxSupply=1000;
        maxPerWallets=3;
        //set withdraw wallet address   
    }

    function setIsPublicMintEnabled(bool isPublicMintEnabled_) external onlyOwner{
        isPublicMintEnabled=isPublicMintEnabled_;
    }
    function setBaseTokenUri(string calldata baseTokenUri_)external onlyOwner{
        baseTokenUri=baseTokenUri_;
    }
    function tokenURI(uint256 tokenid_) public view override returns (string memory){
        require(_exists(tokenid_),'Token does not exist'); 
        return string(abi.encodePacked(baseTokenUri,Strings.toString(tokenid_),'.json')); 
    }
    function withdraw(uint quantity_) public payable{
        (bool success,)= withdrawWallet.call{ value: address(this).balance}('');
        require(success,'withdraw failed'); 
    }
    function mint(uint256 quantity_) public payable{
        require(isPublicMintEnabled,"minting is not enabled");
        require(msg.value == quantity_*mintPrice,'Wrong mint Value');
        require(totalSupply+quantity_<=maxSupply,'sold out');
        require(walletMints[msg.sender]+quantity_<=maxPerWallets, 'exceeds the maxWallets');

      for(uint256 i=0;i<quantity_;i++){
          uint256 newTokenid=totalSupply+1;
          totalSupply++;
          _safeMint(msg.sender,newTokenid);
      }
    }
}