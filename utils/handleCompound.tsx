import { 
  writeContract, prepareWriteContract, 
  waitForTransaction, getAccount 
} from '@wagmi/core';
import mmtStakeContractAbi from '../abi/MMTTokenStake.json';
import Notiflix from 'notiflix';

require('dotenv').config();

const mmtStakingContract = process.env.NEXT_PUBLIC_MMT_STAKING_CONTRACT_ADDRESS;
// const mmtContractAddress = process.env.NEXT_PUBLIC_MMT_CONTRACT_ADDRESS;


const handleCompound =  async(rewardAmount: any) => {

  if(rewardAmount == 0) {
    Notiflix.Notify.failure("No staking tokens");
  } else {  
    let unStaker: any;
    const { address, isConnected} = getAccount();
    if(isConnected) {
      unStaker = address;
    }

    let coinSuccessFlag = false;
    try{
      //@desc Call Deposit Function
      const coinRequestConfig  = await prepareWriteContract({
        address: `0x${mmtStakingContract}`,
        abi: mmtStakeContractAbi,
        functionName: "compound",
        args:[3]  
      })

      const coinResponse = await writeContract(coinRequestConfig);

      const receipt = await waitForTransaction({
        hash: coinResponse.hash
      })
      if(receipt) {
        Notiflix.Notify.success("Compounded Successfully");
      }

    } catch(error: any) {
      // const errorMessage = error.message.match(/reverted with the following reason:\n(.*?)\n/)[1];
      // Notiflix.Notify.failure(errorMessage);
      
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

export default handleCompound;