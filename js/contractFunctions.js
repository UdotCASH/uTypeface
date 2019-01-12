
//allow users to create tokens
//peg them to UCASH up to a certain limit (allow trades)
//UCASHRatio is out of 10**8. 10**8 means one UCASH to one token.
async function createToken() {
  let  UCASHRatio= document.getElementById("currencyPeg").value;
  let _decimals = document.getElementById("currencyDecimal").value;
  let _name = document.getElementById("currencyName").value;
  let _symbol = document.getElementById("currencyTicker").value;
  let _limit = document.getElementById("currencyMax").value;
  if(_limit==undefined){
    _limit = parseInt(21000000000*UCASHRatio);
  }
  _limit = _limit*10**_decimals;
  await uCurrenciesContract.createToken(_limit, _decimals, _name, _symbol, parseInt(UCASHRatio*10**8));
}

async function buyTokens(token, amount) {
    await uCurrenciesContract.buyTokenss(token, amount);
}

async function redeemTokens(token, amount) {
    await uCurrenciesContract.redeemTokens(token,amount);
}

function getOwnedUCASHSimple(_address){
  var getUCASHPromise = ucashContract.balanceOf(_address);
  getUCASHPromise.then(function(value){
    value = value/(10**8);
    document.getElementById("OwnedUCASH").innerHTML = "<b>Owns: </b> " + value.toLocaleString('en', { maximumFractionDigits: 8 }) + " UCASH";
  })

}
