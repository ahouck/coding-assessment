import React from "react";
import "./App.css";
import { NotesLayout } from "./components/notes/notes.layout";
import { Divider } from "antd";

function App() {
  return (
    <div className="App">
      <div className="header">
        Notes Application<Divider style={{margin: '5px 0px 0px 0px'}}/>
      </div>
      <NotesLayout />
    </div>
  );
}

export default App;
