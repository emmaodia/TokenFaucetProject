// SPDX-License-Identifier: MIT

pragma solidity ^0.8.14;

import "./BreadToken.sol";

contract Faucet {
    address public owner;

    uint256 public constant waitTime = 24 hours;
    mapping(address => uint) lockTime;

    event Transfer(address from, address to, uint256 amount);

    BreadToken public bread;

    constructor(BreadToken _bread) {
        owner = msg.sender;
        bread = _bread;
    }

    function delayFaucet(address _receiver) public view returns (bool) {
        if (lockTime[_receiver] == 0) {
            return true;
        } else if (block.timestamp >= lockTime[_receiver]) {
            return true;
        }
        return false;
    }

    function faucet(address recipient, uint256 _amount) public {
        require(msg.sender != owner, "Not recommended");
        require(
            _amount <= 100,
            "You can only request for 100 Bread Tokens from the Faucet"
        );
        require(recipient == msg.sender, "You can not mint for another EOA");
        require(delayFaucet(recipient), "Wait for 24 hours");

        bread.transfer(msg.sender, _amount);

        emit Transfer(address(this), msg.sender, _amount);
    }

    function getBreadBalance() public view returns (uint) {
        return bread.balanceOf(address(this));
    }
}
