import { fetchBalance, fetchToken } from "@wagmi/core";
import { parseEther } from 'viem';

const getSaleAmount  = async() => {

  const ownerAddress = process.env.NEXT_PUBLIC_OWNER_ADDRESS; 
  const contractAddress = process.env.NEXT_PUBLIC_MMT_CONTRACT_ADDRESS;

  const balance =await fetchBalance({
    address: `0x${ownerAddress}`,
    token:  `0x${contractAddress}`
  })

  const totalSupply = await fetchToken ({
    address: `0x${contractAddress}`
  });

  const saledAmount = parseFloat(totalSupply.totalSupply.formatted) - parseFloat(balance.formatted);


  return saledAmount;

}

export default getSaleAmount;