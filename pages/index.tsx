import { useEffect, useState } from "react";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import ConnectBtn from "../components/ConnectButton";
import InputForm from "../components/InputForm";
import getSaleAmount from "../utils/getSaleAmount";


const Home: NextPage = () => {

  const [coinAmount, setCoinAmount] = useState(0);
  const [tokenAmount, setTokenAmount] = useState(0);
  
  return (
    <div className="justify-center mx-auto w-1/4 mt-[67vh] ">
      <div className="flex justify-center gap-5">
        <ConnectBtn coinAmount={coinAmount} tokenAmount={tokenAmount} />
      </div>
    </div>
  );

};

export default Home;
