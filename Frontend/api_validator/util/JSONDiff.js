import React from 'react';

function JSONDiff(props) {
  const text = props.text;

  const lines = text.split("\n");

  const html = lines.map((line, index) => {
    if (line.startsWith("-")) {
      return <p key={index} className="colored minus">{line.slice(1)}</p>;
    }
    else if (line.startsWith("+")){
      return <p key={index} className="coloredplus">{line.slice(1)}</p>;
    } 
    else {
      return <p key={index}>{line}</p>;
    }
  });

  return (
    <div className="container">
      <div className="content">{html}</div>
    </div>
  );
}


export default JSONDiff;
