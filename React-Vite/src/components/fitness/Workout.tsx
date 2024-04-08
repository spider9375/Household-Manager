import { IWorkoutData } from "./workout.model";
import styles from './Workout.module.css'
import Checkbox from '@mui/material/Checkbox';
import CheckIcon from '@mui/icons-material/Check';
import { useState } from "react";

export default function Workout() {

const workoutData: IWorkoutData[] = [
    { set: 'W', kg: 20, reps: 10, previous: '20x9' },
    { set: 2, kg: 25, reps: 8, previous: '25x8' },
    { set: 3, kg: 30, reps: 6, previous: '25x6' },
    { set: 'F', kg: 30, reps: 8, previous: '25x8' },

  ];

  const [checkedRows, setCheckedRows] = useState<number[]>([]);

  function handleChange(index: number) {
    if (checkedRows.includes(index)) {
      // Remove the index if already checked
      setCheckedRows(checkedRows.filter((checkedIndex) => checkedIndex !== index));
    } else {
      // Add the index if not checked
      setCheckedRows([...checkedRows, index]);
    }
  }


  return (
    <div className={styles.workoutContainer}>
      <h1>Workout Information</h1>
      <div className={styles.workoutSet}>
        <div className={styles.setCol}>Set</div>
        <div className={styles.kgCol}>Weight (kg)</div>
        <div className={styles.repsCol}>Reps</div>
        <div className={styles.prevCol}>Previous</div>
        <CheckIcon />
      </div>
      {workoutData.map((item, index) => (
        <div className={`${styles.workoutSet} ${checkedRows.includes(index) ? styles.highlightRow : ''}`} key={index}>
        <div className={`${styles.workoutData} ${item.set === 'W' ? styles.specialW : item.set === 'F' ? styles.specialF : ''}`}>{item.set}</div>
          <div className={styles.workoutData}>{item.kg}</div>
          <div className={`${styles.workoutData} ${styles.reps}`}>{item.reps}</div>
          <div className={`${styles.workoutData} ${styles.prevs}`}>{item.previous}</div>
          <Checkbox checked={checkedRows.includes(index)} onChange={() => handleChange(index)} />
        </div>
      ))}
    </div>
  );
}
