import React from "react";
import Sidebar from "./components/Sidebar";
import Canvas from "./components/Canvas";
import useUndoRedo from "./hooks/useUndoRedo";

const App = () => {
  const [state, setState, undo, redo] = useUndoRedo([[], []]); // [nodes, edges]

  return (
    <div className="app">
      <Canvas undo={undo} redo={redo} state={state} setState={setState} />
      <Sidebar />
    </div>
  );
};

export default App;
