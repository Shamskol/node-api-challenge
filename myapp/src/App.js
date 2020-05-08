import React from 'react';
import logo from './logo.svg';
import './App.css';
import ProjectList from "./Projects/ProjectList";
import Project from "./Projects/Project";

function App() {
  return (
    <div className="App">
     <ProjectList/>
     <Project/>
    </div>
  );
}

export default App;
