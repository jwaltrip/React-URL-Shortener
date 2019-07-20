import React from "react"
import "./App.css"
import FormInput from "./components/FormInput"

class App extends React.Component {
  
  render() {
    return (
      <div className="App">
        <div className="container mt-5">
          <h1>URL Shortener</h1>
          <hr />
          
          <FormInput />
        </div>
      </div>
    );
  }
}

export default App;
