import { useState } from 'react';
import Modal from 'react-modal';

const StakeModal = (props: any) => {
  const [discount, setDiscount] = useState("7% Discount");
  const [active, setActive] = useState({});
  const three_month_click = () => {
    setActive({
      three_month:"bg-blue-500",
      six_month:"border-blue-500",
      nine_month:"border-blue-500",
      one_year:"border-blue-500",
    })

    setDiscount("7% Discount");
  }

  const six_month_click = () => {
    setActive({
      three_month:"border-blue-500",
      six_month:"bg-blue-500",
      nine_month:"border-blue-500",
      one_year:"border-blue-500",
    })

    setDiscount("8% Discount");
  }

  const nine_month_click = () => {
    setActive({
      three_month:"border-blue-500",
      six_month:"border-blue-500",
      nine_month:"bg-blue-500",
      one_year:"border-blue-500",
    })

    setDiscount("9% Discount");
  }


  const one_year_click = () => {
    setActive({
      three_month:"border-blue-500",
      six_month:"border-blue-500",
      nine_month:"border-blue-500",
      one_year:"bg-blue-500",
    })

    setDiscount("10% Discount");
  }

  return(
    <Modal 
      className="mx-auto mt-72 w-1/3 h-1/3 shadow-xl border-2 justify-center rounded-md py-8" 
      isOpen={props.isModalOpen} 
      onRequestClose={props.closeModal}
    >
      <div className='text-3xl mb-3 w-full justify-center text-center mb-8'>{discount}</div>
      <div className='flex justify-between w-full px-6 mb-6'>
        <button 
          className="border-2 border-blue-500 active:bg-blue-500 focus:bg-blue-500 focus:outline-none focus:ring focus:text-white hover:bg-sky-700  hover:text-white w-[20%] h-[20%] text-blue font-bold py-2 px-4 rounded"
          onClick={three_month_click}
        >
          3 months
        </button>
        <button 
          className="border-2 border-blue-500 active:bg-blue-500 focus:bg-blue-500 focus:outline-none focus:ring focus:text-white hover:bg-sky-700  hover:text-white w-[20%] h-[20%] text-blue font-bold py-2 px-4 rounded"
          onClick={six_month_click}
        >
          6 months
        </button>
        <button 
          className="border-2 border-blue-500 active:bg-blue-500 focus:bg-blue-500 focus:outline-none focus:ring focus:text-white hover:bg-sky-700  hover:text-white w-[20%] h-[20%] text-blue font-bold py-2 px-4 rounded"
          onClick={nine_month_click}
        >
          9 months
        </button>
        <button 
          className="border-2 border-blue-500 active:bg-blue-500 focus:bg-blue-500 focus:outline-none focus:ring focus:text-white hover:bg-sky-700  hover:text-white w-[20%] h-[20%] text-blue font-bold py-2 px-4 rounded"
          onClick={one_year_click}
        >
          12 months
        </button>
      </div>
      <div className='flex justify-center drop-shadow-none gap-5 w-full h-10 align-center px-6'>
        <label className='text-xl'>How much would you like to stake:</label>
        <input className='w-1/4 h-full border-2 px-3' />
      </div> 
      <div className='flex justify-center gap-5 w-full px-6 mt-6'>
        <button 
          className="border-2 border-blue-500 hover:bg-sky-700 hover:text-white w-[20%] h-[20%] text-blue font-bold py-2 px-4 rounded"
          onClick={props.closeModal}  
        >
          Cancel
        </button>
        <button className="border-2 border-blue-500 hover:bg-sky-700 hover:text-white w-[20%] h-[20%] text-blue font-bold py-2 px-4 rounded">
          Submit
        </button>
      </div>
    </Modal>
  )
}

export default StakeModal;