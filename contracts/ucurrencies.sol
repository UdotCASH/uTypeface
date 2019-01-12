pragma solidity ^0.5.2;

import "./EIP20Factory.sol";
contract ERC20Basic {
  function totalSupply() public view returns (uint256);
  function balanceOf(address who) public view returns (uint256);
  function transfer(address to, uint256 value) public returns (bool);
  event Transfer(address indexed from, address indexed to, uint256 value);
}

contract ERC20 is ERC20Basic {
  function allowance(address owner, address spender) public view returns (uint256);
  function transferFrom(address from, address to, uint256 value) public returns (bool);
  function approve(address spender, uint256 value) public returns (bool);
}

contract UCURRENCIES is  EIP20Factory{

    address UCASHAddress = 0xbD52C5265B94f727f0616f831b011c17e1f235A2;
    uint ratioD = 10**8; //ratio denominator

    constructor() public {

    }

    mapping(address=>uint) tokenRatios;
    address[] tokenList;

    //allow users to create tokens
    //peg them to UCASH up to a certain limit (allow trades)
    //UCASHRatio is out of 10**8. 10**8 means one UCASH to one token.
    function createToken(uint limit, uint8 _decimals,string memory _name, string memory _symbol,uint UCASHRatio) public{
        address token = createEIP20(limit, _name, _decimals, _symbol);
        tokenRatios[token] = UCASHRatio;
        tokenList.push(token);
    }

    function buyTokens(address token, uint amount) public{
        require(tokenRatios[token]!=0);

        ERC20(UCASHAddress).transferFrom(msg.sender,address(this),amount);
        uint tokensToSend = tokenRatios[token]*amount/ratioD;
        ERC20(token).transfer(msg.sender,tokensToSend);
    }

    function redeemTokens(address token, uint amount) public{
        require(tokenRatios[token]!=0);

        ERC20(token).transferFrom(msg.sender,address(this),amount);
        uint UCASHtoSend = ratioD*amount/tokenRatios[token];
        ERC20(UCASHAddress).transfer(msg.sender,UCASHtoSend);
    }


}
