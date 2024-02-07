import { fetchBalance, fetchToken } from "@wagmi/core";
import { parseEther } from 'viem';
import { readContract, getAccount } from '@wagmi/core'
import contractAbi from '../abi/MMTTokenStake.json'; 

const getStakedAmount  = async() => {

  let stakerAddress: unknown;
  const { address, isConnected} = getAccount();
  if(isConnected) {
    stakerAddress = address;
  }
  const contractAddress = process.env.NEXT_PUBLIC_MMT_STAKING_CONTRACT_ADDRESS;

  console.log(stakerAddress);

  const stakedAmountFunction: any = await readContract({
    address: `0x${contractAddress}`,
    abi: contractAbi,
    functionName: "stakes",
    args: [stakerAddress]
  })

  console.log("stakedAmountFunction", stakedAmountFunction);

  const stakedAmount = await stakedAmountFunction[1];
  const rewards = await stakedAmountFunction[5];
  const startTime = await stakedAmountFunction[2];
  const endTime = await stakedAmountFunction[3];
  const lastRewardTime = await stakedAmountFunction[4];

  const stakingPeriod = (Number(endTime) - Number(startTime)) / 60;
  
  const realStartTime = new Date(Number(startTime) * 1000).toLocaleDateString();
  const realEndDate = new Date(Number(endTime) * 1000).toLocaleDateString();

  const stakingInfo = {
    rewards: await rewards,
    stakedAmount: await stakedAmount,
    startTime: realStartTime,
    endTime: realEndDate,
    lastRewardTime: await lastRewardTime,
    stakingPeriod: stakingPeriod
  };

  return stakingInfo;

}

export default getStakedAmount;