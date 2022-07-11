// SPDX-License-Identifier: GPL-3

pragma solidity ^0.8.14;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BreadToken is ERC20, Ownable {
    address public minter;

    constructor(uint256 _initialsupply) ERC20("Bread Token", "BREAD") {
        minter = msg.sender;
        _mint(minter, _initialsupply);
    }

    function transfer(address recipient, uint256 amount)
        public
        virtual
        override
        returns (bool)
    {
        _transfer(_msgSender(), recipient, amount);
        return true;
    }
}
