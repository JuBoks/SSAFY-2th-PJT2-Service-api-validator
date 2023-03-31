import React from 'react';
import styles from '@/styles/Diff.module.css'

function JSONDiff(props) {
  const text = props.diff;

  console.log(text);
  if(!text) return;
  const lines = text.split("\n");

  const html = lines.map((line, index) => {
    if (line.startsWith("-")) {
      return <p key={index} className={styles.colored}>{line}</p>;
    }
    else if (line.startsWith("+")){
      return <p key={index} className={styles.colored}>{line}</p>;
    } 
    else {
      return <p key={index}>{line}</p>;
    }
  });

  return (
    <div className={styles.container}>
      <div className="content">{html}</div>
    </div>
  );
}


export default JSONDiff;
