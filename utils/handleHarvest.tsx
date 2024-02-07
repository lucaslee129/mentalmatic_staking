import { 
  writeContract, prepareWriteContract, 
  waitForTransaction, getAccount 
} from '@wagmi/core';
import mmtStakeContractAbi from '../abi/MMTTokenStake.json';
import Notiflix from 'notiflix';
require('dotenv').config();

const mmtStakingContract = process.env.NEXT_PUBLIC_MMT_STAKING_CONTRACT_ADDRESS;

const handleHarvest =  async(rewardAmount: any) => {

  if(rewardAmount == 0) {
    Notiflix.Notify.failure("No reward tokens");
  } else {
    let unStaker: any;
    const { address, isConnected} = getAccount();
    if(isConnected) {
      unStaker = address;
    }

    try{
      //@desc Call Deposit Function
      const coinRequestConfig  = await prepareWriteContract({
        address: `0x${mmtStakingContract}`,
        abi: mmtStakeContractAbi,
        functionName: "harvest",
      })

      console.log("here");
      const coinResponse = await writeContract(coinRequestConfig);

      const recipt = await waitForTransaction({
        hash: coinResponse.hash
      })
      if(recipt) {
        Notiflix.Notify.success("Harvested Successfully");
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

export default handleHarvest;