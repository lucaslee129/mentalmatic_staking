import styles from "../styles/Home.module.css";

const WithdrawButton = (props: any) => {
  return(
    <button 
      className={styles.connect_button}
      onClick = {props.onClick}
    >
      Withdraw MMT Token
    </button>
  )
}

export default WithdrawButton;