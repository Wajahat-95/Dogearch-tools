const {ethers} = require(["ethers"]);

const addresses = {
    WWDOGE: "0xB7ddC6414bf4F5515b52D8BdD69973Ae205ff101",
    router: "0xa4EE06Ce40cb7e8c04E127c1F7D3dFB7F7039C81",
    factory: "0xD27D9d61590874Bf9ee2a19b27E265399929C9C3",
}

const provider = new ethers.providers.JsonRpcProvider("https://rpc01-sg.dogechain.dog");

const DOGESWAP_ABI = [
    'event PairCreated(address indexed token0, address indexed token1, address pair, uint)',
    'function getPair(address tokenA, address tokenB) external view returns (address pair)',
    'function name() view returns (string)',
    'function symbol() view returns (string)'
]

const contract = new ethers.Contract(addresses.factory,DOGESWAP_ABI,provider);

const main = async () => {
await contract.on("PairCreated", async (token0, token1, addressPair) => {
    if(typeof token0 === "undefined" || typeof token1 === "undefined"){
        return;
    }
    var buyToken, sellToken;
    if(token0.toLowerCase() === addresses.WWDOGE.toLowerCase()){
        buyToken = token0;
        sellToken = token1;
    }
    if(token1.toLowerCase() === addresses.WWDOGE.toLowerCase()){
        buyToken = token1;
        sellToken = token0;
    }
    if(typeof buyToken === "undefined" || typeof sellToken === "undefined"){
        return;
    }

    console.log(`
    ~~~~~~~~~~~~~~~~~~
    New pair detected
    ~~~~~~~~~~~~~~~~~~ 
    token0: ${buyToken}
    token1: ${sellToken}
    addressPair: ${addressPair}
    `);
 
    // document.getElementById("result").innerHTML += `<div class="card" style="background: rgba(229,214,255,255)!important; border: 2px solid;">
    //                                                     <div class="card-header" style="border-bottom: 2px solid;">
    //                                                         <h4 class="display-5 text-white" style="font-size: 20px;">RECENTLY DEPLOYED TOKENS!!</h4>
    //                                                     </div>
    //                                                     <div class="card-body">
    //                                                         <a href="https://explorer.dogechain.dog/address/${token0}/transactions"><h3 class="text-info" style="font-size: 15px;">TOKEN0: ${token0}</h3></a>
    //                                                     </div>
    //                                                 </div>
    
    // `
})
}
main()







