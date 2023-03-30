import React, { useState } from 'react';

function JSONDiff({ json1, json2 }) {
  const [diff, setDiff] = useState(null);

  const compareJSON = () => {
    const jsondiffpatch = require('jsondiffpatch').create();
    const diffObject = jsondiffpatch.diff(json1, json2);
    const diffHTML = require('jsondiffpatch').formatters.annotated.format(diffObject, json1);
    setDiff(diffHTML);
  };

  return (
    <div>
      <button onClick={compareJSON}>Compare JSON</button>
      {diff && <div dangerouslySetInnerHTML={{ __html: diff }}></div>}
    </div>
  );
}

export default JSONDiff;
