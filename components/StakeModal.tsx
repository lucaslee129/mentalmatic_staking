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
    calEndDate();
  }

  const six_month_click = () => {
    setMonths(6);
    setApr(4);
    calEndDate();
  }

  const nine_month_click = () => {
    setMonths(9);
    setApr(5);
    calEndDate();
  }


  const one_year_click = () => {
    setMonths(12);
    setApr(6);
    calEndDate();
  }

  const handleChange = (event: any) => {
    const amount = event.target.value;
    setStakingAmount(amount);
  }

  const handleSubmit = () => {
    if(stakingAmount < 100000) {
      setErrorMessage("Please stake more than 10,000 MMT Token");
    } else if (apr ==0) {
      setErrorMessage("Please select your staking period");
    } else {
      setErrorMessage("");
      StakingFunc(stakingAmount, apr);
    }
  }

  const calEndDate = () => {
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
      className="mx-auto bg-violet-500 mt-20 w-1/3 h-3/4 shadow-2xl border-2 justify-center rounded-md py-8 text-black" 
      isOpen={props.isModalOpen} 
      onRequestClose={props.closeModal}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
      }}
    >
      <div className='text-5xl w-full justify-center text-center text-white mt-8 mb-8'>{apr}% APR</div>
      <div className='box-border flex justify-between w-full px-6 mb-6'>
        <button 
          className="box-border border-[0.5px] text-white hover:border-slate-00 border-white active:bg-blue-500 focus:bg-blue-800 focus:outline-none focus:ring focus:text-yellow-300 hover:text-yellow-100 hover:bg-violet-800 hover:border-1 w-[20%] h-[20%] text-blue font-bold py-2 px-4 rounded"
          onClick={three_month_click}
        >
          3 months
        </button>
        <button 
         className="box-border border-[0.5px] text-white hover:border-slate-00 border-white active:bg-blue-500 focus:bg-blue-800 focus:outline-none focus:ring focus:text-yellow-300 hover:text-yellow-100 hover:bg-violet-800 hover:border-1 w-[20%] h-[20%] text-blue font-bold py-2 px-4 rounded"
          onClick={six_month_click}
        >
          6 months
        </button>
        <button 
          className="box-border border-[0.5px] text-white hover:border-slate-00 border-white active:bg-blue-500 focus:bg-blue-800 focus:outline-none focus:ring focus:text-yellow-300 hover:text-yellow-100 hover:bg-violet-800 hover:border-1 w-[20%] h-[20%] text-blue font-bold py-2 px-4 rounded"
          onClick={nine_month_click}
        >
          9 months
        </button>
        <button 
          className="box-border border-[0.5px] text-white hover:border-slate-00 border-white active:bg-blue-500 focus:bg-blue-800 focus:outline-none focus:ring focus:text-yellow-300 hover:text-yellow-100 hover:bg-violet-800 hover:border-1 w-[20%] h-[20%] text-blue font-bold py-2 px-4 rounded"
          onClick={one_year_click}
        >
          12 months
        </button>
      </div>
      <div className='flex justify-center drop-shadow-none gap-5 items-center w-full h-10 align-center px-6'>
        <label className='text-xl text-yellow-500'>How much would you like to stake:</label>
        <input 
          className='w-1/4 h-full border-2 px-3 bg-inherit text-white rounded' 
          onChange={handleChange}
        />
      </div> 
      <div className='flex justify-center gap-5 w-full px-6 mt-6'>
        <button 
          className="box-border border-[0.5px] text-white hover:border-slate-00 border-white active:bg-violet-400 w-[20%] h-[20%] font-bold py-2 px-4 rounded"
          onClick={props.closeModal}  
        >
          Cancel
        </button>
        <button 
          className="box-border border-[0.5px] bg-violet-800 text-white border-white active:bg-violet-600  w-[20%] h-[20%] font-bold py-2 px-4 rounded"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
      <div className='text-sm w-full justify-center text-red-600 text-center my-4'>{errorMessage}</div>
      <hr className="flex w-[60%] mx-auto my-8" />
      <div className='pr-20 pl-24  w-[100%] text-yellow-500 justify-center'>
        <p className='my-2'>- You selected staking for <span className='text-xl text-white'>{months}</span> Months and <span className='text-xl text-white'>{stakingAmount}</span> MMT Tokens.</p>
        <p className='my-2'>- You will receive <span className='text-xl text-white'>{(apr / 12) / 100 * stakingAmount}</span> per month. <span className='text-xl text-white'>{(apr / 12) / 100 * stakingAmount * 3}</span> in 3 months, and total APR is  <span className='text-xl text-white'>{apr / 100 * stakingAmount}</span> MMT Tokens as rewards. </p>
        <p>- Staking end date: <span className='text-xl text-white'>{endDate.month}/{endDate.date}/{endDate.year} at UTC{endDate.timezone/60}</span></p>
      </div>
    </Modal>
  )
}

export default StakeModal;