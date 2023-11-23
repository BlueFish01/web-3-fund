// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract RentingContract {

    uint public numberOfListing = 0;
    address public owner;

    contract(){
        owner = msg.sender;
    }

    struct User {
        uint256 reviews;
        address[] reviewers;
        uint256[] scores;
        uint256 balance;
        uint256 hold;
    }

    struct Listing { 
        address owner;
        address borrower;
        uint256 price;
        uint256 deposit;
        uint256 duration;
        uint256 startDate;
        uint256 endDate;
        bool isRented;
        bool isReturning;
        bool isActive;
        address[] history;
    } 

    mapping(address => User) public users;
    mapping(uint256 => Listing) public listings;

    receive() external payable {
        users[msg.sender].balance += msg.value;
    }

    function getUserBalance() public view returns(uint256){
        return users[msg.sender].balance;
    }

    function createListing(uint256 _price, uint256 _deposit, uint256 _duration) public returns(uint256) {
        require(users[msg.sender].balance>_deposit/2,"Insufficient funds");
        Listing storage listing = listings[numberOfListing];

        listing.owner = msg.sender;
        listing.price = _price;
        listing.deposit = _deposit;
        listing.duration = _duration;
        listing.startDate = block.timestamp;
        listing.endDate = block.timestamp;
        listing.isActive = true;
        listing.isRented = false;
        listing.isReturning = false;
        listing.isActive = true;

        numberOfListing++;
        users[msg.sender].balance -= _deposit/2;
        users[msg.sender].hold += _deposit/2;

        return numberOfListing - 1;
    }

    function getAllListings() public view returns(Listing[] memory){
        Listing[] memory allListing = new Listing[](numberOfListing);
        for(uint i = 0; i < numberOfListing; i++){
            Listing storage item = listings[i];
            allListing[i] = item;
        }
        return allListing;
    }

    function rent(uint256 _listingId) public {
        require(msg.sender != listings[_listingId].owner, "You can't rent your own item");
        require(users[msg.sender].balance >= (listings[_listingId].price + listings[_listingId].deposit), "Insufficient funds");
        require(!listings[_listingId].isRented, "The contract is already rented");
        require(listings[_listingId].isActive, "The contract is not active");
        listings[_listingId].borrower = msg.sender;
        listings[_listingId].history.push(msg.sender);
        listings[_listingId].isRented = true;
        listings[_listingId].startDate = block.timestamp;
        listings[_listingId].endDate = listings[_listingId].startDate + listings[_listingId].duration;
        users[msg.sender].balance -= (listings[_listingId].price + listings[_listingId].deposit);
    }

    function deleteListing(uint256 _listingId) public {
        require(msg.sender == listings[_listingId].owner, "Only the owner can delete the listing");
        require(!listings[_listingId].isRented, "The Item is already rented");
        require(listings[_listingId].endDate >= block.timestamp - 604800, "The Item must be inactivate for more than 1 week");
        listings[_listingId].isActive = false;
        users[msg.sender].balance += listings[_listingId].deposit/2;
        users[msg.sender].hold -= listings[_listingId].deposit/2;
    }

    function deactivateListing(uint256 _listingId) public {
        require(msg.sender == listings[_listingId].owner, "Only the owner can deactivate the listing");
        require(!listings[_listingId].isRented, "The Item is already rented");
        listings[_listingId].isActive = false;
    }

    function returnItem(uint256 _listingId) public {
        require(msg.sender == listings[_listingId].borrower, "Only borrower can return");
        require(listings[_listingId].isRented == false, "Only rented Item can be retuned");
        listings[_listingId].isReturning = true;
    }

    function receivedItem(uint256 _listingId) public {
        require(msg.sender == listings[_listingId].owner, "Only the owner can reciveItem");
        require(listings[_listingId].isReturning = true, "Item cant be recived");
        users[msg.sender].balance += listings[_listingId].price;
        users[listings[_listingId].borrower].balance += listings[_listingId].deposit;
        
        listings[_listingId].startDate = block.timestamp;
        listings[_listingId].endDate = block.timestamp;
        listings[_listingId].isRented = false;
        listings[_listingId].isReturning = false;
    }

    //not finished
    function withdraw(uint256 _amount) public payable returns(uint256){
        require(users[msg.sender].balance >= _amount, "Insufficient funds");
        (bool success,) = payable(msg.sender).call{value: _amount}("");
        require(success, "Transfer failed.");
        users[msg.sender].balance -= _amount;
        return users[msg.sender].balance;
    }

    function reportNotReturnItem(uint256 _listingId) public{
        require(msg.sender == listings[_listingId].owner, "Only the owner can report");
        require(listings[_listingId].isRented == true, "Only rented items can be reported");
        require(listings[_listingId].endDate < block.timestamp, "Only expired renting contract can be reported")
        require(listing[_listingId].isReturning == false), "Only non-returned item can be reported");
        //called by listing owner
        
    }

    function reportNotRecivedItem() public{
        //called by Borrower when return item but no respone from listing owner
    }

    function reportNotGetRentedItem() public{
        //called by Borrower
    }
    
    function challenge() public{}

    function resolveTicket() public{
    }

    function openTicket() private{}

    struct Ticket {
        uint256 listing_id;
        address reporter;
        address litigant;
        string reporter_evidence;
        string litigant_evidence;
        bool isChallenge;
        uint256 reported_date;
        address winner;
        address loser;
        uint256 price;
        uint256 challenge_price;
    }

    mapping(uint256 => Ticket) public tickets

}

