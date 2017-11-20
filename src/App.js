import React, { Component } from 'react';
import "./css_anim/animate.css";
import Header from "./components/Header/Header";
import TodoDiv from "./components/TodoDiv/TodoDiv";

class App extends Component {
  render() {
    return (
      <div className="App">
      <Header name="shahid jamal"/>
      <TodoDiv />
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p> */}
      </div>
    );
  }
}
export default App;
