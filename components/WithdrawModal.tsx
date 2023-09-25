import { useState } from 'react';
import Modal from 'react-modal';
import HandleUnstake from '../utils/handleUnstake';
import HandleCompound from '../utils/handleCompound';
import HandleHarvest from '../utils/handleHarvest';

const WithdrawModal = (props: any) => {
  const handleUnstake = ()=> {
    HandleUnstake();
  }

  const handleHarvest = ()=> {
    HandleHarvest();
  }

  const handleCompound = () =>{
    HandleCompound();
  }

  return(
    <Modal 
      className="mx-auto bg-slate-700 mt-72 w-1/3 h-1/2 shadow-xl border-2 justify-center rounded-md py-16 text-white" 
      isOpen={props.isModalOpen} 
      onRequestClose={props.closeModal}
    >
      <div className='text-4xl w-full justify-center text-center font-bold mb-2'>CHOSSE YOUR OPTION</div>
      <div className='text-xl w-full justify-center text-center font-bold mb-8'>
        Here you can choose your option after <br />finishing staking period
      </div>
      <div className='box-border flex justify-between w-full px-12 mb-6'>
        <button 
          className="box-border border-2 border-blue-500 active:bg-blue-500 focus:bg-blue-500 focus:outline-none focus:ring focus:text-white hover:bg-sky-700  hover:text-white w-[25%] h-[20%] text-blue font-bold py-2 px-4 rounded"
          onClick={handleUnstake}
        >
          Unstake
        </button>
        <button 
          className="box-border border-2 border-blue-500 active:bg-blue-500 focus:bg-blue-500 focus:outline-none focus:ring focus:text-white hover:bg-sky-700  hover:text-white w-[25%] h-[20%] text-blue font-bold py-2 px-4 rounded"
          onClick={handleHarvest}
        >
          Harvest
        </button>
        <button 
          className="box-border border-2 border-blue-500 active:bg-blue-500 focus:bg-blue-500 focus:outline-none focus:ring focus:text-white hover:bg-sky-700  hover:text-white w-[25%] h-[20%] text-blue font-bold py-2 px-4 rounded"
          onClick={handleCompound}
        >
          Compound
        </button>
      </div>
    </Modal>
  )
}

export default WithdrawModal;