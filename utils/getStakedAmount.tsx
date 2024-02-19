import { fetchBalance, fetchToken } from "@wagmi/core";
import { parseEther } from 'viem';
import { readContract, getAccount } from '@wagmi/core'
import contractAbi from '../abi/MMTTokenStake.json'; 
import tokenAbi from '../abi/MMTToken.json';

const MIN = 60;
const DAY = 24 * MIN;
const MONTH = 30 * DAY;

const getStakedAmount  = async() => {

  let stakerAddress: unknown;
  const { address, isConnected} = getAccount();
  if(isConnected) {
    stakerAddress = address;
  }
  const tokenAddress = process.env.NEXT_PUBLIC_MMT_CONTRACT_ADDRESS;
  const contractAddress = process.env.NEXT_PUBLIC_MMT_STAKING_CONTRACT_ADDRESS;

  console.log(stakerAddress);

  const stakedAmountFunction: any = await readContract({
    address: `0x${contractAddress}`,
    abi: contractAbi,
    functionName: "stakes",
    args: [stakerAddress]
  })

  const mmtBalance : any = await readContract({
    address: `0x${tokenAddress}`,
    abi: tokenAbi,
    functionName: "balanceOf",
    args: [stakerAddress]
  })

  const stakedAmount = await stakedAmountFunction[1];
  const rewards = await stakedAmountFunction[5];
  const startTime = await stakedAmountFunction[2];
  const endTime = await stakedAmountFunction[3];
  const lastRewardTime = await stakedAmountFunction[4];

  const stakingPeriod = (Number(endTime) - Number(startTime)) / 60;
  console.log("stakingPeriod>>>>>>>>>>>>>>>", stakingPeriod);
  console.log("stakingPeriod: " + rewards);
  
  const realStartTime = new Date(Number(startTime) * 1000).toLocaleDateString();
  const realEndDate = new Date(Number(endTime) * 1000).toLocaleDateString();

  const compoundAmount = stakedAmount + rewards;
  const compoundReward: any = await readContract({
    address: `0x${contractAddress}`,
    abi: contractAbi,
    functionName: "_calculateReward",
    args: [compoundAmount, stakingPeriod * MIN, stakingPeriod]
  })

  const stakingInfo = {
    userBalance: await mmtBalance,
    rewards: await rewards,
    stakedAmount: await stakedAmount,
    startTime: realStartTime,
    endTime: realEndDate,
    lastRewardTime: await lastRewardTime,
    stakingPeriod: stakingPeriod,
    compoundReward: compoundReward
  };

  console.log("stakingInfo>>>>>>>>>>>>>>>>>>>>", stakingInfo)

  return stakingInfo;

}

export default getStakedAmount;