async function switchMetamask(provider,web3Provider){
var web3provider;
var isMetaMask;
var _address;
  try{
    isMetaMask  = web3Provider.isMetaMask;
    console.log(true)
  } catch {
    isMetamask = false;
    console.log(false)
  }

    var isLoggedIn

    if(isMetaMask){
      let accounts = await provider.listAccounts()


      if (accounts[0] == undefined){
            isLoggedIn = false;
      } else {
            isLoggedIn = true;
            _address = accounts[0]
      }

        if (isLoggedIn){
          console.log("MetaMask Logged In");
          metamaskLoggedIn(accounts);
        }  else {
            console.log("MetaMask Logged Out");
          metamaskLoggedOut(accounts,_address);
        }
      } else {
          console.log("No MetaMask");
        noMetamask();
      }

  }


  function noMetamask(){
    //reveal
    document.getElementById("noMetamask").hidden = false;

    //hide
    document.getElementById("metamaskLoggedIn").hidden = true;
    document.getElementById("metamaskLoggedOut").hidden = true;



      document.getElementById("TopLeftMetamaskLoggedIn").hidden = true;
      document.getElementById("TopLeftMetamaskLoggedOut").hidden = false;


  }
  function metamaskLoggedIn(accounts){
    console.log("metmaskLoggedIn");

    //SendUCASH
    //ReclaimButton
    //ApproveAndTransfer
    //connectToMetamask

    //reveal
    document.getElementById("metamaskLoggedIn").hidden = false;

    //hide
    document.getElementById("noMetamask").hidden = true;
    document.getElementById("metamaskLoggedOut").hidden = true;

    document.getElementById("TopLeftMetamaskLoggedIn").hidden = false;
    document.getElementById("TopLeftMetamaskLoggedOut").hidden = true;
  }
  function metamaskLoggedOut(accounts,_address){
    console.log("MetaMaskLoggedOut");
    //reveal
    document.getElementById("metamaskLoggedOut").hidden = false;

    //hide
    document.getElementById("metamaskLoggedIn").hidden = true;
    document.getElementById("noMetamask").hidden = true;

    if (_address==undefined){
      document.getElementById("TopLeftMetamaskLoggedIn").hidden = true;
      document.getElementById("TopLeftMetamaskLoggedOut").hidden = false;
    } else{
    document.getElementById("TopLeftMetamaskLoggedIn").hidden = false;
    document.getElementById("TopLeftMetamaskLoggedOut").hidden = true;
    }
  }
