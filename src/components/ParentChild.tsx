import { useState, Dispatch, SetStateAction } from 'react';

// Define props interface for the ChildComponent
type ChildComponentProps = {
  updateParentState: Dispatch<SetStateAction<string>>;
}

function ChildComponent({ updateParentState }: ChildComponentProps) {
  return (
    <button onClick={() => updateParentState('Updated from child')}>
      Update Parent State
    </button>
  );
}

function ParentComponent() {
  const [state, setState] = useState<string>('Initial State');

  return (
    <div>
      <p>Parent State: {state}</p>
      <ChildComponent updateParentState={setState} />
    </div>
  );
}

export default ParentComponent;
