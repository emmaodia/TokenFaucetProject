import { ethers } from "./ethers.js"
import "https://unpkg.com/@metamask/detect-provider/dist/detect-provider.min.js";

const Connect = async () => {
    console.log('It works')
    
    const provider = await detectEthereumProvider();
   
    // Prompt user for account connection
    await provider.send("eth_requestAccounts", []);

    if (provider) {
      
    console.log('Ethereum successfully detected!');
    const web3provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    const signer = web3provider.getSigner();
    console.log(signer)
    
    const address = await signer.getAddress();

    console.log(address)
    document.getElementById("addressInput").defaultValue = address;

    return address
    }
}

const check =  await Connect();
console.log(check)



const amount = document.getElementById("amountInput");
const address = document.getElementById(`addressInput`)
const log = document.getElementById(`address`)

amount.onchange = handleAmount;
address.onchange = handleAmount;

function handleAmount(e, items) {
    items = document.getElementById(`addressInput`).value || check;
    e = document.getElementById("amountInput").value;
    log.textContent = (items == check) ?  `You want to send ${e} tokens, to your wallet: ${items}` : `You want to send ${e} tokens, to ${items}` ;
    console.log(log.textContent)
}

const Transfer = async () => {
    try {
        let amount = document.getElementById(`amountInput`).value;
        amount = ethers.utils.parseEther('0.1');
        console.log(amount)

        const address = document.getElementById(`addressInput`).value;
        console.log(address)

        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner();
        const add = await signer.getAddress();
        console.log(add)
        const faucet = "0xF0c776422D6C09e8094902353A293ECbe9C54fdD"

        const send_account = (add == address) ? faucet : add;
        console.log(send_account)
        
        const currentGasPrice = await provider.getGasPrice();
        const gas_price = ethers.utils.hexlify(parseInt(currentGasPrice.toString()));

        const item = document.getElementById(`addressInput`).value || await address;
        console.log(item)   

        
        
        const transaction = {
            from: send_account,
            to: item,
            value: amount,
            nonce: provider.getTransactionCount(send_account, "latest"),
            gasLimit: ethers.utils.hexlify(100000), // 
            gasPrice: gas_price,
        }
   
        console.log(transaction)
        const hash = await provider.getSigner().sendTransaction(transaction);
        const receipt = await hash.wait()
        console.log(receipt)
    } catch (error) {
        console.log(error)
    }
}


document.getElementById('connectMetamask').onclick = Connect;
document.getElementById('transferTokens').onclick = Transfer;
