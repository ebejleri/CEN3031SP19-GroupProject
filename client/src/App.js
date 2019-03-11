import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PredictionForm from './Components/PredictionForm';

class App extends Component {
  render() {
    return (
      <div className="App">
        <PredictionForm></PredictionForm>
      </div>
    );
  }
}

export default App;
