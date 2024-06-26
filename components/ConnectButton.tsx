import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import StakeModal from "./StakeModal";
import Modal from 'react-modal';
import { useEffect, useState } from "react";
import getStakedAmount from "../utils/getStakedAmount";

const ConnectBtn = (props: any) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stakerBalance, setStakerBalance] = useState(0);

  const handleCloseModal = () =>{
    setIsModalOpen(false);
  }  

  const handleStakingToken = async () => {
    const tempBal: number = (await getStakedAmount()).userBalance;

    setStakerBalance(tempBal);
    console.log("typeof stakerBalance>>>>>>", stakerBalance);
    setIsModalOpen(true);
  }

  return (
      <ConnectButton.Custom>
        {({
          account,
          chain,
          openAccountModal,
          openChainModal,
          openConnectModal,
          authenticationStatus,
          mounted,
        }) => {
          // Note: If your app doesn't use authentication, you
          // can remove all 'authenticationStatus' checks
          const ready = mounted && authenticationStatus !== "loading";
          const connected =
            ready &&
            account &&
            chain &&
            (!authenticationStatus || authenticationStatus === "authenticated");

          return (
            <div
              {...(!ready && {
                "aria-hidden": true,
                style: {
                  opacity: 0,
                  pointerEvents: "none",
                  userSelect: "none",
                },
              })}
              className={styles.globals}
            >
              {(() => {
                if (!connected) {
                  return (
                    <button
                      onClick={openConnectModal}
                      type="button"
                      className={styles.connect_button}
                    >
                      Connect Wallet to Stake MMT Token
                    </button>
                  );
                }

                if (chain.unsupported) {
                  return (
                    <button
                      onClick={openChainModal}
                      type="button"
                      className={styles.error_button}
                    >
                      Wrong network
                    </button>
                  );
                }

                return (
                  <div>
                    <div style={{ display: "flex", gap: 12 }}>
                      <button
                        onClick={openChainModal}
                        type="button"
                        className={styles.chain_button}
                      >
                        {chain.hasIcon && (
                          <div
                            style={{
                              background: chain.iconBackground,
                              width: 30,
                              height: 30,
                              borderRadius: 999,
                              overflow: "hidden",
                              marginRight: 4,
                            }}
                          >
                            {chain.iconUrl && (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                alt={chain.name ?? "Chain icon"}
                                src={chain.iconUrl}
                                style={{ width: 30, height: 30 }}
                              />
                            )}
                          </div>
                        )}
                        {chain.name}
                      </button>

                      <button
                        onClick={openAccountModal}
                        type="button"
                        className={styles.account_button}
                      >
                        <span>
                          {account.displayBalance && account.displayBalance}
                        </span>
                        <div className={styles.account}>
                          {account.ensAvatar ? (
                            account.ensAvatar
                          ) : (
                            <div
                              style={{
                                backgroundColor: "rgb(236, 102, 255)",
                                padding: "5px",
                                borderRadius: "9999px",
                              }}
                            >
                              🦄
                            </div>
                          )}
                          {account.displayName}
                        </div>
                      </button>
                    </div>
                    <div className="flex justify-center item-center w-full ">
                      <button
                          onClick={handleStakingToken}
                          type="button"
                          className={styles.buy_button}
                        >
                          Stake MMT Token
                      </button>
                    </div>
                  </div>
                );
              })()}
              <StakeModal isModalOpen = {isModalOpen} closeModal = {handleCloseModal} userBalance = {stakerBalance}/>
            </div>
          );
        }}
      </ConnectButton.Custom>
  );

  // return <ConnectButton />;
};

export default ConnectBtn;
