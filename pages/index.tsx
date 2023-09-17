import { useEffect, useState } from "react";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import ConnectBtn from "../components/ConnectButton";
import InputForm from "../components/InputForm";
import getSaleAmount from "../utils/getSaleAmount";


const Home: NextPage = () => {

  const [coinAmount, setCoinAmount] = useState(0);
  const [tokenAmount, setTokenAmount] = useState(0);
  const [saledAmount, setSaledAmount] = useState(0);

  useEffect(() => 
    {
      const func = async () => {
        const amount = await getSaleAmount();
        setSaledAmount(amount);

        // @desc Code for posting data to wix site. but don't work due to not published page
        // window.parent.postMessage(saledAmount, 'wix site url');

      }
      func();
      
    }, []);

  const convert = async (value : number, flag : boolean) => {
    // console.log("saledAmount",saledAmount)
    if(saledAmount < 80000000) {
      if(flag == true){
        return value * 250;
      } else {
        return value * 4 / 1000;
      } 
    } else if (saledAmount > 80000000 && saledAmount < 130000000) {
      if(flag == true){
        return value * 1000 / 7;
      } else {
        return value * 7 / 1000;
      } 
    } else if (saledAmount > 130000000 && saledAmount < 210000000) {
      if(flag == true){
        return value * 100;
      } else {
        return value / 100;
      } 
    } else {
      if(flag == true){
        return value * 20;
      } else {
        return value / 50;
      }  
    } 
  }

  const handleCoinChage = async(event: any) => {
    const newCoinAmount = event.target.value;
    const newTokenAmount = await convert(newCoinAmount, true);
    setCoinAmount(newCoinAmount);
    setTokenAmount(newTokenAmount);
  }

  const handleTokenChange = async (event: any) => {
    const newTokenAmount = event.target.value;
    const newCoinAmount = await convert(newTokenAmount, false);
    setTokenAmount(newTokenAmount);
    setCoinAmount(newCoinAmount);
  }
  
  return (
    <div className="justify-center mx-auto w-1/4 mt-[67vh] ">
      <div className="flex justify-between mx-2">
        <InputForm id="usdt" value = {coinAmount} onChange = {handleCoinChage} />
        <InputForm id="dolphin" value= {tokenAmount} onChange = {handleTokenChange} />
      </div>
      <div className="flex justify-center gap-5">
        <ConnectBtn coinAmount={coinAmount} tokenAmount={tokenAmount} />
      </div>
    </div>
  );

};

export default Home;
