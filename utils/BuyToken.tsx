import { 
  sendTransaction, writeContract, prepareWriteContract, 
  waitForTransaction, getAccount, fetchTransaction 
} from '@wagmi/core';
import { useDebounce } from 'use-debounce';
import { parseEther, createWalletClient, createPublicClient, http, custom, parseUnits} from "viem";
import { sepolia } from 'viem/chains';
import { privateKeyToAccount } from 'viem/accounts';
import mmtContractAbi from '../abi/MMTToken.json';
import usdtContractAbi from '../abi/USDTToken.json';
require('dotenv').config();

const ownerAddress = process.env.NEXT_PUBLIC_OWNER_ADDRESS;
const ownerPrivateKey = process.env.NEXT_PUBLIC_OWNER_PRIVATEKEY;
const mmtContractAddress = process.env.NEXT_PUBLIC_MMT_CONTRACT_ADDRESS;
const usdtContractAddress = process.env.NEXT_PUBLIC_USDT_CONTRACT_ADDRESS;


const BuyToken =  async(props: any) => {

  let buyerAddress: unknown;
  const { address, isConnected} = getAccount();
  if(isConnected) {
    buyerAddress = address;
  }

  //  @desc Create Clients
  const publicClient = createPublicClient({
    chain: sepolia,
    transport: http()
  })
  const ownerActionClient = createWalletClient({
    chain: sepolia,
    transport: custom(window.ethereum!)
  })
  const ownerAccount = privateKeyToAccount(`0x${ownerPrivateKey}`);


  // @desc  USDT Trasfer to buy MMT Token
  let coinSuccessFlag = false;
  try{

    // const approveConfig  = await prepareWriteContract({
    //   address: `0x${usdtContractAddress}`,
    //   abi: usdtContractAbi,
    //   functionName: "approve",
    //   args:[buyerAddress, parseUnits(props.coinAmount, 6)]
    // })

    // const approveResponse = await writeContract(approveConfig);

    // await waitForTransaction({
    //   hash: approveResponse.hash
    // })
    // window.alert("USDT Aprrove Success");

    const coinRequestConfig  = await prepareWriteContract({
      address: `0x${usdtContractAddress}`,
      abi: usdtContractAbi,
      functionName: "transferFrom",
      args:[buyerAddress, `0x${ownerAddress}`, parseUnits(props.coinAmount, 6)]
    })

    const coineResponse = await writeContract(coinRequestConfig);

    await waitForTransaction({
      hash: coineResponse.hash
    })

    window.alert("USDT Transfer Success");
    coinSuccessFlag = true;

  } catch {(err: any) => console.log(err);}

  
  // @desc  After Success Transfer USDT, send MMT according to USDT
  if(coinSuccessFlag) {
    try{
      console.log("First try>>", parseEther(props.tokenAmount.toString()));
      const {request} = await publicClient.simulateContract({
        account: ownerAccount,
        address: `0x${mmtContractAddress}`,
        abi: mmtContractAbi,
        functionName: 'approve',
        args: [`0x${ownerAddress}`, parseEther(props.tokenAmount.toString())]
      })

      console.log("After approve Request");

      const approveHash = await ownerActionClient.writeContract(request);
      const data = await waitForTransaction({
        hash: approveHash
      })
      console.log("Aprrove Success Data>>>>", data);

      const currentTx = fetchTransaction({
        hash: approveHash
      })

      const tokenTransferRequest = await publicClient.simulateContract({
        account: ownerAccount,
        address: `0x${mmtContractAddress}`,
        abi: mmtContractAbi,
        functionName: 'transferFrom',
        nonce: (await currentTx).nonce+1,
        args: [`0x${ownerAddress}`, buyerAddress, parseEther(props.tokenAmount.toString())]
      })
      const sendHash =  await ownerActionClient.writeContract(tokenTransferRequest.request);
      const txData = await waitForTransaction({
        hash: sendHash
      })
      window.alert(`Transaction success. Your transaction hash is ${txData.transactionHash}`);   
  
      
    } catch {(err: any) => console.log(err);}
  }
}

export default BuyToken;