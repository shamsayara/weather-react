import React from "react";
import ReactDOM from "react-dom";

import "./App.css";
import Weather from "./Weather";
import Footer from "./Footer";

function App() {
  return (
    <div className="App">
      <div className="app-title">Weathered By Yara</div>
      <header className="background">
        <div className="big-image">
          <div className="overlay">
            <Weather />
          </div>
        </div>
        <Footer />
      </header>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
