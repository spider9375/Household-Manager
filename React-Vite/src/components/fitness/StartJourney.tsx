import { useCallback } from "react";
import styles from "./Fitness.module.css";
export default function StartJourney() {

  const handleStartJourney = useCallback(()=>{

  },[])

  return (
    <>
      <div className={styles.bigButtonContainer}>
        <h1>Embark on a journey of self-discovery and transformation.</h1>
        <h2>
          {" "}
          Click 'Start your journey' to unlock your full potential and embrace a
          healthier, happier you.
        </h2>
        <button onClick={handleStartJourney} className={styles.bigButton}>
          Start your journey
        </button>
      </div>
    </>
  );
}
