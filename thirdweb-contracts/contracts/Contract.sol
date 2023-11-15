// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract RentingContract {

    struct User {
        uint256 reviews;
        address[] reviewers;
        uint256[] scores;
        uint256 wallet;
    }

    struct Listing { 
        address owner;
        uint256 itemId;
        uint256 price;
        uint256 deposit;
        uint256 duration;
        uint256 startDate;
        uint256 endDate;
        bool isRented;
        bool isActive;
        address[] history;
    } 

    mapping(address => User) public users;
    mapping(uint256 => Listing) public listings;

    function createListing(uint256 _itemId, uint256 _price, uint256 _deposit, uint256 _duration) public {
        listings[_itemId].owner = msg.sender;
        listings[_itemId].itemId = _itemId;
        listings[_itemId].price = _price;
        listings[_itemId].deposit = _deposit;
        listings[_itemId].duration = _duration;
        listings[_itemId].isActive = true;
    }

    function rent(uint256 _itemId) public payable{
        require(msg.sender != listings[_itemId].owner, "You can't rent your own item");
        require(users[msg.sender].wallet >= (listings[_itemId].price + listings[_itemId].deposit), "Insufficient funds");
        require(!listings[_itemId].isRented, "The contract is already rented");
        listings[_itemId].history.push(msg.sender);
        listings[_itemId].isRented = true;
        listings[_itemId].startDate = block.timestamp;
        listings[_itemId].endDate = listings[_itemId].startDate + listings[_itemId].duration;
        users[msg.sender].wallet -= (listings[_itemId].price + listings[_itemId].deposit);
    }

    function deleteListing(uint256 _itemId) public {
        require(msg.sender == listings[_itemId].owner, "Only the owner can delete the listing");
        require(!listings[_itemId].isRented, "The contract is already rented");
        listings[_itemId].isActive = false;
    }

    function terminate(uint256 _itemId) public {
        require(msg.sender == listings[_itemId].owner, "Only the owner can terminate the contract");
        require(listings[_itemId].isRented, "The contract is not rented");
        require(block.timestamp >= listings[_itemId].endDate, "The contract is not finished yet");
        users[msg.sender].wallet += (listings[_itemId].price + listings[_itemId].deposit);
        listings[_itemId].isActive = false;
    }
    
    function deposit() public payable returns (uint){
        uint balanceBefore = users[msg.sender].wallet;
        users[msg.sender].wallet += msg.value;
        require(users[msg.sender].wallet == balanceBefore + msg.value, "Deposit failed");
        return users[msg.sender].wallet;
    }

    function withdraw(uint256 _amount) public payable {
        require(users[msg.sender].wallet >= _amount, "Insufficient funds");
        uint256 balanceBeforeTransfer = address(this).balance;
        (bool success,) = payable(msg.sender).call{value: _amount}("");
        require(success, "Transfer failed.");
        uint256 balanceAfterTransfer = address(this).balance;
        require(balanceAfterTransfer == balanceBeforeTransfer - _amount, "Transfer amount mismatch.");
        users[msg.sender].wallet -= _amount;
    }


    
    
    // function rent() public payable {
    //     require(msg.value == price + deposit, "You need to pay the price + deposit");
    //     require(!isRented, "The contract is already rented");
    //     renter = msg.sender;
    //     isRented = true;
    //     startDate = block.timestamp;
    //     endDate = startDate + duration;
    // }
    
    // function terminate() public {
    //     require(msg.sender == owner, "Only the owner can terminate the contract");
    //     require(isRented, "The contract is not rented");
    //     require(block.timestamp >= endDate, "The contract is not finished yet");
    //     payable(owner).transfer(price + deposit);
    //     isRented = false;
    // }
    
    // function withdraw() public {
    //     require(msg.sender == renter, "Only the renter can withdraw the deposit");
    //     require(isRented, "The contract is not rented");
    //     require(block.timestamp >= endDate, "The contract is not finished yet");
    //     payable(renter).transfer(deposit);
    //     isRented = false;
    // }
}