import { useState } from 'react';
import Modal from 'react-modal';
import StakingFunc from '../utils/StakingFunc';
import getStakedAmount from '../utils/getStakedAmount';

const StakeModal = (props: any) => {
  const [apr, setApr] = useState(0);
  const [months, setMonths] = useState(0);
  const [stakingAmount, setStakingAmount] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [endDate, setEndDate] = useState({
    year: new Date().getUTCFullYear(),
    month: new Date().getUTCMonth(),
    date: new Date().getUTCDate(),
    time: new Date().getUTCHours(),
    min: new Date().getUTCMinutes(),
  });

  const MonthsOfYear = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const three_month_click = () => {
    setMonths(3);
    setApr(3);
    calEndDate(3);
  };

  const six_month_click = () => {
    setMonths(6);
    setApr(4);
    calEndDate(6);
  };

  const nine_month_click = () => {
    setMonths(9);
    setApr(5);
    calEndDate(9);
  };

  const one_year_click = () => {
    setMonths(12);
    setApr(6);
    calEndDate(12);
  };

  const handleChange = (event: any) => {
    setStakingAmount(event.target.value);
  };

  const handleSubmit = async () => {
    const stakedAmount = await getStakedAmount();
    if (stakingAmount <= 0) {
      setErrorMessage('Please stake more than 0 MMT Token');
    } else if (apr == 0) {
      setErrorMessage('Please select your staking period');
    } else {
      console.log('stakingAmount>>>>>>>>', stakingAmount);
      console.log('props.userBalance>>>>>>>>', props.userBalance);
      if (stakingAmount > Number(props.userBalance) * 10 ** -18) {
        setErrorMessage('Exceeds the amount of staking');
      } else {
        setErrorMessage('');
        StakingFunc(stakedAmount.stakedAmount, stakingAmount, months);
      }
    }
  };

  const handleCancel = async () => {
    setStakingAmount(0);
    setErrorMessage('');
    props.closeModal();
  };

  const handleMax = async () => {
    setStakingAmount(
      Number((Number(props.userBalance) * 10 ** -18).toFixed(2))
    );
  };

  const calEndDate = (months: number) => {
    const today = new Date();
    today.setMonth(today.getMonth() + months);
    const oneMonthFromNow = {
      year: today.getUTCFullYear(),
      month: today.getUTCMonth(),
      date: today.getUTCDate(),
      time: today.getUTCHours(),
      min: today.getUTCMinutes(),
    };
    setEndDate(oneMonthFromNow);
  };

  return (
    <Modal
      className="mx-auto min-w-[500px] max-w-[650px] gap-8 bg-gradient-to-t from-blue-800/40 to-blue-100/40 bg-blur backdrop-blur-[6px] mt-20 w-1/3 h-3/4 shadow-2xl justify-center rounded-3xl py-8 text-black drop-shadow-[0_5px_5px_rgba(0,0,0,0.35)] md:w-1/2 sm:w-3/4 sm:h-3/4 sx:h-full"
      isOpen={props.isModalOpen}
      onRequestClose={props.closeModal}
      style={{
        overlay: {
          backgroundColor: 'rgba(255, 255, 255, 0)',
        },
      }}
    >
      <div className="text-4xl w-full justify-center text-center mt-8 mb-4">
        Select Staking Period
      </div>
      <div className="text-3xl w-full justify-center text-center mb-8">{`${apr}% APR`}</div>
      <div className="box-border flex gap-5 flex-col-2 sm:flex-row justify-between w-full px-6 mb-12 text-white sm:flex-wrap">
        <button
          className="whitespace-wrap sm:whitespace-normal flex-row box-border bg-violet-600 active:bg-violet-500 focus:bg-violet-800 focus:outline-none focus:ring focus:text-yellow-300 hover:text-yellow-100 hover:bg-violet-500 hover:border-1 w-full sm:w-[20%] h-[20%] text-blue font-bold py-3 px-4 rounded mb-2 sm:mb-0"
          onClick={three_month_click}
        >
          3 months
        </button>
        <button
          className="whitespace-wrap sm:whitespace-normal flex-wrap box-border bg-violet-600 active:bg-violet-500 focus:bg-violet-800 focus:outline-none focus:ring focus:text-yellow-300 hover:text-yellow-100 hover:bg-violet-500 hover:border-1 w-full sm:w-[20%] h-[20%] text-blue font-bold py-3 px-4 rounded mb-2 sm:mb-0"
          onClick={six_month_click}
        >
          6 months
        </button>
        <button
          className="whitespace-wrap sm:whitespace-normal flex-wrap box-border bg-violet-600 active:bg-violet-500 focus:bg-violet-800 focus:outline-none focus:ring focus:text-yellow-300 hover:text-yellow-100 hover:bg-violet-500 hover:border-1 w-full sm:w-[20%] h-[20%] text-blue font-bold py-3 px-4 rounded mb-2 sm:mb-0"
          onClick={nine_month_click}
        >
          9 months
        </button>
        <button
          className="whitespace-wrap sm:whitespace-normal flex-wrap box-border bg-violet-600 active:bg-violet-500 focus:bg-violet-800 focus:outline-none focus:ring focus:text-yellow-300 hover:text-yellow-100 hover:bg-violet-500 hover:border-1 w-full sm:w-[20%] h-[20%] text-blue font-bold py-3 px-4 rounded"
          onClick={one_year_click}
        >
          12 months
        </button>
      </div>
      <div className="flex justify-center items-center sm:flex-row gap-5 h-11 w-full px-6">
        <div className="flex flex-col">
          <label className="text-xl">
            My balance is:{' '}
            {Number(
              (Number(props.userBalance) * 10 ** -18).toFixed(2)
            ).toLocaleString()}
          </label>
          <label className="text-xl font-bold">I want to stake:</label>
        </div>
        <input
          id="input1"
          className="w-full sm:w-1/5 h-full px-3 rounded"
          placeholder="0"
          value={stakingAmount}
          onChange={handleChange}
        />
        <button
          className="box-border h-full border border-violet-600 text-black active:bg-violet-500 sm:w-[20%] hover:bg-violet-500 hover:border-1 hover:text-white py-2 px-4 rounded mb-2 sm:mb-0"
          onClick={handleMax}
        >
          MAX
        </button>
      </div>
      <div className="flex justify-center gap-5 w-full px-6 mt-12">
        <button
          className="box-border bg-violet-600 text-white active:bg-violet-500 sm:w-[20%] h-[20%] hover:bg-violet-500 hover:border-1 font-bold py-2 px-4 rounded mb-2 sm:mb-0"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          className="box-border bg-violet-600 text-white active:bg-violet-500 sm:w-[20%] h-[20%] hover:bg-violet-500 hover:border-1 font-bold py-2 px-4 rounded mb-2 sm:mb-0"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
      <div className="text-sm w-full justify-center text-red-600 text-center my-4">
        {errorMessage}
      </div>
      <hr className="flex w-[60%] border-black mx-auto my-8" />
      <div className="pr-12 pl-16 sm:text-md w-full justify-center">
        <p className="my-2">
          - I am staking{' '}
          <span className="text-2xl">
            {Number(stakingAmount).toLocaleString()}
          </span>{' '}
          $MMT for <span className="text-2xl">{months}</span> Months.
        </p>
        <p className="my-2">
          - I will receive{' '}
          <span className="text-2xl">
            {Number(
              ((apr / 12 / 100) * months * stakingAmount).toFixed(2)
            ).toLocaleString()}
          </span>{' '}
          $MMT at the end of the staking period.{' '}
        </p>
        <p>
          - Staking maturity date:{' '}
          <span className="text-2xl">
            {endDate.date} {MonthsOfYear[endDate.month]} {endDate.year} at{' '}
            {endDate.time % 12}:
            {endDate.min < 10 ? '0' + endDate.min : endDate.min}{' '}
            {endDate.time / 12 < 1 ? 'am' : 'pm'} UTC
          </span>
        </p>
      </div>
    </Modal>
  );
};

export default StakeModal;
