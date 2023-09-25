import { useState } from 'react';
import Modal from 'react-modal';
import StakingFunc from '../utils/StakingFunc';
import HandleUnstake from '../utils/handleUnstake';
import handleHarvest from '../utils/handleHarvest';
import handleCompound from '../utils/handleCompound';

const StakeModal = (props: any) => {
  const [selectedItem, setSelectedItem] = useState(0);
  const [headerText, setHeaderText] = useState("SELECT YOUR OPTION");
  const [stakingAmount, setStakingAmount] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const unstakeClick = () => {
    setSelectedItem(1);
    setHeaderText("UNSTAKE");
  }

  const harvestClick = () => {
    setSelectedItem(2);
    setHeaderText("HARVEST");
  }

  const compoundClick = () => {
    setSelectedItem(3);
    setHeaderText("COMPOUND");
  }

  const handleSubmit = () => {
    if(selectedItem == 0) {
      setErrorMessage("Please select your staking option");
    } else if (selectedItem == 1) {
      HandleUnstake();
    } else if (selectedItem == 2) {
      handleHarvest();
    } else if (selectedItem == 3) {
      handleCompound();
    }
  }

  return(
    <Modal 
      className="mx-auto bg-blue-800 bg-opacity-50 bg-blur backdrop-blur-sm mt-20 w-1/3 h-3/4 shadow-2xl justify-center rounded-3xl py-8 text-black"
      isOpen={props.isModalOpen} 
      onRequestClose={props.closeModal}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0)',
        },
      }}
    >
      <div className='text-5xl w-full justify-center text-center mt-8 mb-8'>{headerText}</div>
      <div className='box-border flex justify-between w-full px-6 mb-6 text-white'>
        <button 
          className="box-border bg-violet-600 active:bg-violet-500 focus:bg-violet-800 focus:outline-none focus:ring focus:text-yellow-300 hover:text-yellow-100 hover:bg-violet-500 hover:border-1 w-[20%] h-[20%] text-blue font-bold py-2 px-4 rounded"
          onClick={unstakeClick}
        >
          Unstake
        </button>
        <button 
          className="box-border bg-violet-600 active:bg-violet-500 focus:bg-violet-800 focus:outline-none focus:ring focus:text-yellow-300 hover:text-yellow-100 hover:bg-violet-500 hover:border-1 w-[20%] h-[20%] text-blue font-bold py-2 px-4 rounded"
          onClick={harvestClick}
        >
          Harvest
        </button>
        <button 
          className="box-border bg-violet-600 active:bg-violet-500 focus:bg-violet-800 focus:outline-none focus:ring focus:text-yellow-300 hover:text-yellow-100 hover:bg-violet-500 hover:border-1 w-[20%] h-[20%] text-blue font-bold py-2 px-4 rounded"
          onClick={compoundClick}
        >
          Compound
        </button>
      </div>
      <div className='text-sm w-full justify-center text-red-300 text-center my-4'>{errorMessage}</div>
      <hr className="flex w-[60%] border-black mx-auto my-8" />
      <div className='pr-20 pl-24  w-[100%] justify-centerr'>
        <p className='my-2'>- You selected staking for <span className='text-xl'>1</span> Months and <span className='text-xl'>{stakingAmount}</span> MMT Tokens.</p>
        <p className='my-2'>- You will receive <span className='text-xl'>{(12 / 12) / 100 * stakingAmount}</span> per month. <span className='text-xl'>{(12 / 12) / 100 * stakingAmount * 3}</span> in 3 months, and total APR is  <span className='text-xl'>{12 / 100 * stakingAmount}</span> MMT Tokens as rewards. </p>
        <p>- Staking end date: <span className='text-xl'>123</span></p>
      </div>
      <hr className="flex w-[60%] mx-auto my-8" />
      <div className='flex justify-center gap-5 w-full px-6 mt-6'>
        <button 
          className="box-border bg-violet-600 text-white active:bg-violet-500 w-[20%] h-[20%] font-bold py-2 px-4 rounded"
          onClick={props.closeModal}  
        >
          Cancel
        </button>
        <button 
          className="box-border bg-violet-600 bg-violet-500 active:bg-violet-500 text-white w-[20%] h-[20%] font-bold py-2 px-4 rounded"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </Modal>
  )
}

export default StakeModal;