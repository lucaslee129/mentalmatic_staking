import { useState } from 'react';
import Modal from 'react-modal';
import StakingFunc from '../utils/StakingFunc';

const StakeModal = (props: any) => {
  const [apr, setApr] = useState(0)
  const [months, setMonths] = useState(0);
  const [stakingAmount, setStakingAmount] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [endDate, setEndDate] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    date: new Date().getDate(),
    timezone: new Date().getTimezoneOffset()
  });
  const three_month_click = () => {
    setMonths(3);
    setApr(3);
    calEndDate(3);
  }

  const six_month_click = () => {
    setMonths(6);
    setApr(4);
    calEndDate(6);
  }

  const nine_month_click = () => {
    setMonths(9);
    setApr(5);
    calEndDate(9);
  }


  const one_year_click = () => {
    setMonths(12);
    setApr(6);
    calEndDate(12);
  }

  const handleChange = (event: any) => {
    const amount = event.target.value;
    setStakingAmount(amount);
  }

  const handleSubmit = () => {
    if(stakingAmount < 100000) {
      setErrorMessage("Please stake more than 100,000 MMT Token");
    } else if (apr ==0) {
      setErrorMessage("Please select your staking period");
    } else {
      setErrorMessage("");
      StakingFunc(stakingAmount, apr);
    }
  }

  const calEndDate = (months: number) => {
    const today = new Date();
    today.setMonth(today.getMonth() + months);
    const oneMonthFromNow = {
      year: today.getFullYear(),
      month: today.getMonth(),
      date: today.getDate(),
      timezone: today.getTimezoneOffset()
    };
    setEndDate(oneMonthFromNow);
  }
 
  return(
    <Modal 
      className="mx-auto bg-blue-400 bg-opacity-50 bg-blur backdrop-blur-sm mt-20 w-1/3 h-3/4 shadow-2xl justify-center rounded-3xl py-8 text-black drop-shadow-[0_5px_5px_rgba(0,0,0,0.35)]" 
      isOpen={props.isModalOpen} 
      onRequestClose={props.closeModal}
      style={{
        overlay: {
          backgroundColor: 'rgba(255, 255, 255, 0)',
        },
      }}
    >
      <div className='text-5xl w-full justify-center text-center mt-8 mb-8'>{apr}% APR</div>
      <div className='box-border flex justify-between w-full px-6 mb-6 text-white'>
        <button 
          className="box-border bg-violet-600 active:bg-violet-500 focus:bg-violet-800 focus:outline-none focus:ring focus:text-yellow-300 hover:text-yellow-100 hover:bg-violet-500 hover:border-1 w-[20%] h-[20%] text-blue font-bold py-2 px-4 rounded"
          onClick={three_month_click}
        >
          3 months
        </button>
        <button 
          className="box-border bg-violet-600 active:bg-violet-500 focus:bg-violet-800 focus:outline-none focus:ring focus:text-yellow-300 hover:text-yellow-100 hover:bg-violet-500 hover:border-1 w-[20%] h-[20%] text-blue font-bold py-2 px-4 rounded"
          onClick={six_month_click}
        >
          6 months
        </button>
        <button 
          className="box-border bg-violet-600 active:bg-violet-500 focus:bg-violet-800 focus:outline-none focus:ring focus:text-yellow-300 hover:text-yellow-100 hover:bg-violet-500 hover:border-1 w-[20%] h-[20%] text-blue font-bold py-2 px-4 rounded"
          onClick={nine_month_click}
        >
          9 months
        </button>
        <button 
          className="box-border bg-violet-600 active:bg-violet-500 focus:bg-violet-800 focus:outline-none focus:ring focus:text-yellow-300 hover:text-yellow-100 hover:bg-violet-500 hover:border-1 w-[20%] h-[20%] text-blue font-bold py-2 px-4 rounded"
          onClick={one_year_click}
        >
          12 months
        </button>
      </div>
      <div className='flex justify-center drop-shadow-none gap-5 items-center w-full h-11 align-center px-6'>
        <label className='text-xl font-bold'>How much would you like to stake:</label>
        <input 
          className='w-1/4 h-full px-3 rounded' 
          placeholder='0'
          onChange={handleChange}
        />
      </div> 
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
      <div className='text-sm w-full justify-center text-red-600 text-center my-4'>{errorMessage}</div>
      <hr className="flex w-[60%] border-black mx-auto my-8" />
      <div className='pr-12 pl-16 text-xl w-[100%] justify-center'>
        <p className='my-2'>- You selected staking for <span className='text-2xl'>{months}</span> Months and <span className='text-2xl'>{stakingAmount}</span> MMT Tokens.</p>
        <p className='my-2'>- You will receive <span className='text-2xl'>{(apr / 12) / 100 * stakingAmount}</span> per month. <span className='text-2xl'>{(apr / 12) / 100 * stakingAmount * 3}</span> in 3 months, and total APR is  <span className='text-2xl'>{apr / 100 * stakingAmount}</span> MMT Tokens as rewards. </p>
        <p>- Staking end date: <span className='text-2xl'>{endDate.month}/{endDate.date}/{endDate.year} at UTC{endDate.timezone/60}</span></p>
      </div>
    </Modal>
  )
}

export default StakeModal;