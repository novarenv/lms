import React, { useState } from 'react';

function ToggleText() {
  const [isVisible, setIsVisible] = useState(true);
  
  return (
    <div>
      {isVisible && <p>This text is toggleable</p>}
      <button onClick={() => setIsVisible(!isVisible)}>
        Toggle Text
      </button>
    </div>
  );
}

export default ToggleText;