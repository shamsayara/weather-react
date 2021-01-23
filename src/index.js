import React from "react";
import ReactDOM from "react-dom";

import "./App.css";
import Apps from "./Apps.js";
import Footer from "./Footer";

function App() {
  return (
    <div className="App">
      <div className="app-title">Weathered By Yara</div>
      <header className="background">
        <div className="big-image">
          <div className="overlay">
            <Apps defaultcity="London" />
          </div>
        </div>
        <Footer />
      </header>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
