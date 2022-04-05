// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract CourseContract {

  uint public price; // Course price in wei
  uint public daysForExpiration; // Number of days to expiration from buying date
  address private owner; // Owner of this course
  mapping(address => ConsumerToken) public tokens; // Mapping of all consumers of this course

  constructor(uint initialPrice, uint initialDaysForExpiration) {
      owner = msg.sender; // 'msg.sender' is sender of current call, contract deployer for a constructor
      price = initialPrice; // Inicial price in wei
      daysForExpiration = initialDaysForExpiration;
  }

  function setPrice (uint newPrice) public {
      require(msg.sender == owner, "Caller is not owner");
      price = newPrice;
  }

  function setDaysForExpiration(uint newDaysForExpiration) public {
      require(msg.sender == owner, "Caller is not owner");
      daysForExpiration = newDaysForExpiration;
  }

  function buyCourse() public payable {
      require(msg.value == price, "Value sent is not equal to course price");
      tokens[msg.sender] = ConsumerToken(msg.sender, price, block.timestamp + (daysForExpiration * 1 days));
  }

  function getDaysToExpiration(address tokenAddress) public view returns (uint timestamp) {
      return ((tokens[tokenAddress].expirationTimestamp - block.timestamp) / 1 days);
  }

/*  function getConsumerTokens() public  view returns (mapping(address => ConsumerToken)) {
      return tokens;
  }*/

  struct ConsumerToken {
      address consumer;
      uint price;
      uint expirationTimestamp;
  }
}
