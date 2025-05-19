import React, { useState } from 'react';

const ToggleSwitch = () => {
  const [isOn, setIsOn] = useState(false);

  return (
    <div>
      <p>Current state: {isOn ? 'ON' : 'OFF'}</p>
      <button onClick={() => setIsOn(!isOn)}>
        Toggle {isOn ? 'OFF' : 'ON'}
      </button>
    </div>
  );
};

export default ToggleSwitch;