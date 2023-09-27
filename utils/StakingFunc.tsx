import { 
  writeContract, prepareWriteContract, 
  waitForTransaction, getAccount 
} from '@wagmi/core';
import { parseEther } from "viem";
import mmtContractAbi from '../abi/MMTToken.json';
import mmtStakeContractAbi from '../abi/MMTTokenStake.json';
require('dotenv').config();


const mmtStakingContract = process.env.NEXT_PUBLIC_MMT_STAKING_CONTRACT_ADDRESS;
const mmtContractAddress = process.env.NEXT_PUBLIC_MMT_CONTRACT_ADDRESS;


const StakingFunc =  async(stakingAmount: any, discount: any) => {

  let staker: any;
  const { address, isConnected} = getAccount();
  if(isConnected) {
    staker = address;
  }

  let coinSuccessFlag = false;
  try{
    //@desc Approve for Deposit
    const approveConfig  = await prepareWriteContract({
      address: `0x${mmtContractAddress}`,
      abi: mmtContractAbi,
      functionName: "approve",
      args:[`0x${mmtStakingContract}`, parseEther(stakingAmount.toString())],
    })

    const approveResponse = await writeContract(approveConfig);

    await waitForTransaction({
      hash: approveResponse.hash
    })
    window.alert("Staking Aprrove Success");

    //@desc Call Deposit Function
    const coinRequestConfig  = await prepareWriteContract({
      address: `0x${mmtStakingContract}`,
      abi: mmtStakeContractAbi,
      functionName: "deposit",
      args:[parseEther(stakingAmount.toString()), discount]
    })

    console.log("here");
    const coinResponse = await writeContract(coinRequestConfig);

    await waitForTransaction({
      hash: coinResponse.hash
    })

    window.alert("Staking Transfer Success");

  } catch(error: any) {
    console.log(error.message);
  }
}

export default StakingFunc;