import { useEffect, useState } from "react";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import ConnectBtn from "../components/ConnectButton";
import WithdrawButton from "../components/WithdrawButton";
import WithdrawModal from '../components/WithdrawModalTemp';

const Home: NextPage = () => {

  const [coinAmount, setCoinAmount] = useState(0);
  const [tokenAmount, setTokenAmount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    setIsModalOpen(true);
  }

  const handleCloseModal = () =>  {
    setIsModalOpen(false);
  }
  
  return (
    <div className="justify-center mx-auto w-1/4 mt-[67vh] ">
      <div className="flex justify-center gap-5">
        <ConnectBtn coinAmount={coinAmount} tokenAmount={tokenAmount} />
      </div>
      <div className="flex justify-center gap-5">
        <WithdrawButton onClick = {handleClick} />
      </div>
      <WithdrawModal isModalOpen = {isModalOpen} closeModal = {handleCloseModal} />
    </div>
  );

};

export default Home;
