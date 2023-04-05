import React, { useRef, useLayoutEffect, useEffect, createRef } from "react";
import { createRoot } from "react-dom/client";
import styles from "@/styles/Diff.module.css";
import { Typography } from "@mui/material";

function JSONDiff(props) {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const text = props.json;
  const lines = text && typeof text === "string" ? text.split("\n") : [];
  const elementsRef = useRef(lines.map(() => createRef()));
  const barRef = useRef(null);
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const containerRect = containerRef.current.getBoundingClientRect();
    const textRect = textRef.current.getBoundingClientRect();
    const textHeight = textRef.current.scrollHeight - 24;
    let cumHeight = 0;
    const barsegment = elementsRef.current.map((element, index) => {
      if (!element.current) return <div></div>;
      const rect = element.current.getBoundingClientRect();
      const elementStyle = getComputedStyle(element.current);
      const backgroundColor = elementStyle.backgroundColor;
      const height = rect.height;
      const top = rect.top - textRect.top;
      const max =
        textHeight > containerRect.height
          ? containerRect.height - 36
          : textHeight;
      const segment_height = height / (textHeight / max);
      const segment_top = (top / textHeight) * max - cumHeight;
      cumHeight += segment_height;
      const style = {
        position: "relative",
        zIndex: `${index}`,
        top: `${segment_top + 16}` + "px",
        height: `${segment_height}` + "px",
        backgroundColor: `${backgroundColor}`,
      };
      return <div key={index} style={style}></div>;
    });
    if (!rootRef.current) {
      rootRef.current = createRoot(barRef.current);
    }
    rootRef.current.render(barsegment);
  }, [lines]);

  elementsRef.current = lines.map(() => createRef());
  const html = lines.map((line, index) => {
    if (line.startsWith("-")) {
      return (
        <p
          key={index}
          className={styles.minus}
          ref={elementsRef.current[index]}
        >
          {line}
        </p>
      );
    } else if (line.startsWith("+")) {
      return (
        <p key={index} className={styles.plus} ref={elementsRef.current[index]}>
          {line}
        </p>
      );
    } 
    else if(line.startsWith("*")){
      return (
        <p key={index} className={styles.change} ref={elementsRef.current[index]}>
          {line}
        </p>
      );
    }
    else {
      return (
        <Typography variant="body1" key={index}>
          {line}
        </Typography>
      );
    }
  });

  return (
    <div className={styles.bigcontainer}>
      <div className={styles.container} ref={containerRef}>
        <div
          className={styles.text}
          ref={textRef}
          style={{ whiteSpace: "pre-wrap" }}
        >
          {html}
        </div>
      </div>
      <div className={styles.bar} ref={barRef}></div>
    </div>
  );
}

export default JSONDiff;
