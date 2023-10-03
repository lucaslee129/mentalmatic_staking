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

  const stakedAmount = await readContract({
    address: `0x${contractAddress}`,
    abi: contractAbi,
    functionName: "getStakedAmount",
    args: [stakerAddress]
  })

  const rewards =await readContract({
    address: `0x${contractAddress}`,
    abi: contractAbi,
    functionName: "getRewards",
    args: [stakerAddress]
  })

  const startTime = await readContract({
    address: `0x${contractAddress}`,
    abi: contractAbi,
    functionName: "getStakedTimes",
    args: [stakerAddress]
  })

  const endTime =await readContract({
    address: `0x${contractAddress}`,
    abi: contractAbi,
    functionName: "getExpectedEndTimes",
    args: [stakerAddress]
  })

  const lastRewardTime =await readContract({
    address: `0x${contractAddress}`,
    abi: contractAbi,
    functionName: "getLastReward",
    args: [stakerAddress]
  })

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