import { 
  writeContract, prepareWriteContract, 
  waitForTransaction, getAccount 
} from '@wagmi/core';
import { parseEther } from "viem";
import mmtContractAbi from '../abi/MMTToken.json';
import mmtStakeContractAbi from '../abi/MMTTokenStake.json';
import Notiflix from 'notiflix';
require('dotenv').config();


const mmtStakingContract = process.env.NEXT_PUBLIC_MMT_STAKING_CONTRACT_ADDRESS;
const mmtContractAddress = process.env.NEXT_PUBLIC_MMT_CONTRACT_ADDRESS;


const StakingFunc =  async(stakedAmount:any, stakingAmount: any, discount: any) => {
  console.log("discount>>>>>", discount);                                                                                                                                                                                                                                                                                         

  if(stakedAmount) {
    Notiflix.Notify.failure("Already Staked");
  } else {

    let staker: any;
    const { address, isConnected} = getAccount();
    if(isConnected) {
      staker = address;
    }

    try{
      //@desc Approve for Deposit
      const approveConfig  = await prepareWriteContract({
        address: `0x${mmtContractAddress}`,
        abi: mmtContractAbi,
        functionName: "approve",
        args:[`0x${mmtStakingContract}`, parseEther(stakingAmount.toString())],
      })

      const approveResponse = await writeContract(approveConfig);

      const receipt = await waitForTransaction({
        hash: approveResponse.hash
      })

      if(receipt) {
        console.log(receipt);
        Notiflix.Notify.success("Staking Aprrove Success");
      }
      

      //@desc Call Deposit Function
      const coinRequestConfig  = await prepareWriteContract({
        address: `0x${mmtStakingContract}`,
        abi: mmtStakeContractAbi,
        functionName: "deposit",
        args:[parseEther(stakingAmount.toString()), discount]
      })

      const coinResponse = await writeContract(coinRequestConfig);

      const txReceipt = await waitForTransaction({
        hash: coinResponse.hash
      })
      
      if(txReceipt) {
        console.log(txReceipt);
        Notiflix.Notify.success("Staking Transfer Success");
      }


    } catch(error: any) {
      const errorMessage = await error.message;
      const rejectError = "User rejected the request.";
      const requireError = "reverted with the following reason";
      if(errorMessage.includes(rejectError)) {
        Notiflix.Notify.failure("User rejected the request.");
      } else if(errorMessage.includes(requireError)) {
        const errMsg = error.message.match(/reverted with the following reason:\n(.*?)\n/)[1];
        Notiflix.Notify.failure(errMsg);
      }
    }
  }
}

export default StakingFunc;